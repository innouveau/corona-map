<script>
    import * as d3 from 'd3';
    import $ from 'jquery';
    import credits from "@/components/credits";
    import languageSwitch from "@/components/elements/language/language-switch";
    import dateTool from "@/tools/date";

    // data
    import languages from '@/data/languages';
    import maps from '@/data/maps';
    import stories from '@/data/stories';
    import ggds from '@/data/ggds';
    import safetyRegions from '@/data/safety-regions';
    import provinces from '@/data/provinces';
    import countries from '@/data/countries';
    import ageGroups from '@/data/age-groups';
    import signalingSystems from '@/data/signaling-systems';
    import HamburgerMenu from "./components/hamburger/hamburger-menu";


    export default {
        name: 'app',
        components: {
            HamburgerMenu,
            languageSwitch,
            credits
        },
        props: {},
        data() {
            return {
                dateKeys: null
            }
        },
        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            showCredits() {
                return this.$store.state.ui.creditsPopup;
            },
            videoMode() {
                return this.$store.state.ui.videoMode;
            }
        },
        methods: {
            init() {
                this.initLanguages();
                this.pickMap();
            },
            pickMap() {
                let map;
                this.$store.commit('maps/init', maps);
                if (this.$route.query.map) {
                    map = this.$store.getters['maps/getItemByProperty']('title', this.$route.query.map, true);
                }
                if (map) {
                    this.$store.commit('maps/setCurrent', map);
                } else {
                    this.$store.commit('maps/setCurrent', this.$store.state.maps.all[0]);
                }
                this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.currentMap.settings.regionTypes[0]});
                this.loadData();
            },
            initLanguages() {
                let language;
                this.$store.commit('languages/init', languages);
                if (this.$route.query.language) {
                    language = this.$store.getters['languages/getItemByProperty']('iso_code', this.$route.query.language, true);
                }
                if (!language) {
                    language = this.$store.state.languages.all[0];
                }
                this.$store.commit('languages/setCurrent', language);
            },
            loadData() {
                this.$store.commit('stories/init', stories);
                this.$store.commit('signalingSystems/init', signalingSystems);
                this.$store.commit('signalingSystems/setCurrent', this.$store.state.signalingSystems.all[0]);
                this.$store.commit('countries/init', countries);
                this.$store.commit('ggds/init', ggds);
                this.$store.commit('safetyRegions/init', safetyRegions);
                this.$store.commit('provinces/init', provinces);
                this.$store.commit('ageGroups/init', ageGroups);
                this.loadRegions();
            },
            loadRegions() {
                $.getJSON(this.currentMap.url.regions, (regions) => {
                    let promises = [];
                    this.$store.commit(this.currentMap.module + '/init', regions);
                    if (this.currentMap.settings.hasTests) {
                        promises.push(this.loadTests);
                    }
                    if (this.currentMap.settings.hasAgeGroups) {
                        promises.push(this.loadAgeGroupsForCities);
                    }
                    if (promises.length === 0) {
                        this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                    } else {
                        Promise.all(promises.map(p => p()))
                            .then((result) => {
                                // always do sewage after the tests, otherwise
                                // date offset can come too late
                                if (this.currentMap.settings.hasSewageTreatmentPlants) {
                                    this.loadSewageTreatmentPlants().then(() => {
                                        this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                                    });
                                } else {
                                    this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                                }
                            })
                            .catch(error => {
                                console.error(error)
                            });
                    }
                });
            },
            loadSewageTreatmentPlants() {
                return new Promise((resolve, reject) => {
                    $.getJSON(this.currentMap.url.sewageTreatmentPlants + dateTool.getTimestamp(), (sewageTreatmentPlants) => {
                        this.$store.commit('sewageTreatmentPlants/init', sewageTreatmentPlants);
                        resolve();
                    });
                })
            },
            loadTests() {
                const addTestsForRegions = (item) => {
                    if (this.currentMap.settings.excludeRegions) {
                        let identifier = item[this.currentMap.settings.testAdapter.titleKey];
                        return this.currentMap.settings.excludeRegions.indexOf(identifier) === -1;
                    } else {
                        return true;
                    }
                };

                return new Promise((resolve, reject) => {
                    d3.csv(this.currentMap.url.tests + dateTool.getTimestamp())
                        .then((data) => {
                            let adapter;
                            if (this.currentMap.settings.testAdapter) {
                                adapter = this.currentMap.settings.testAdapter;
                            } else {
                                adapter = {
                                    titleKey: 'Municipality_code',
                                    positiveTestsKey: 'Total_reported.',
                                    administeredTestsKey: 'Total_administered.',
                                    findColumn: function(column) {
                                        return column.indexOf('Total_reported.') > -1;
                                    }
                                }
                            }

                            this.getDate(data.columns, adapter);
                            for (let item of data) {
                                if (addTestsForRegions(item)) {
                                    this.addTests(item, adapter);
                                }
                            }

                            resolve();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
            },
            loadAgeGroupsForCities() {
                return new Promise((resolve, reject) => {
                    d3.csv(this.currentMap.url.ageGroups + dateTool.getTimestamp())
                        .then((result) => {
                            for (let item of result) {
                                let city = this.$store.getters['cities/getItemByProperty']('identifier', item.Gemeentecode, true);
                                if (city) {
                                    let cityAgeGroups = ageGroups.map(ageGroup => {
                                        let key = ageGroup.title;
                                        if (key === '10-19') {
                                            key = 'okt-19';
                                        }
                                        return {
                                            title: ageGroup.title,
                                            population: Number(item[key])
                                        }
                                    });
                                    this.$store.commit('cities/updatePropertyOfItem', {
                                        item: city,
                                        property: 'ageGroups',
                                        value: cityAgeGroups
                                    });
                                }
                            }
                            resolve();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
            },
            getDate(columns, adapter) {
                let dates, today, first, last, totalLengthOfTestHistory;
                dates = [];
                for (let column of columns) {
                    if (adapter.findColumn(column)) {
                        let dateString, date;
                        if (adapter.positiveTestsKey.length > 0) {
                            dateString = column.split(adapter.positiveTestsKey)[1];
                        } else {
                            dateString = column;
                        }
                        dates.push({
                            positiveTestsKey: column,
                            administeredTestsKey: (adapter.administeredTestsKey + dateString),
                            dateString,
                            ms: new Date(dateString).getTime()
                        });
                    }
                }
                dates = dates.sort((a,b) => (a.ms > b.ms) ? 1 : ((b.ms > a.ms) ? -1 : 0));
                for (let date of dates) {
                    date.offset = dates.length - dates.indexOf(date) - 1;
                }
                first = dates[0];
                last = dates[dates.length - 1];
                today = new Date(last.dateString);
                totalLengthOfTestHistory = first.offset;
                // when cumulative the first day has to be ignored, because we
                // dont know the value of the day before that to calculate the absolute value
                if (this.currentMap.settings.testDataCumulative) {
                    totalLengthOfTestHistory--;
                }
                // need extra buffer to calculate the first week
                if (this.currentMap.settings.testDataInterval === 1) {
                    totalLengthOfTestHistory -= 7;
                }

                this.$store.commit('ui/updateProperty', {key: 'todayInMs', value: today.getTime()});
                this.$store.commit('ui/updateProperty', {key: 'today', value: today});
                this.$store.commit('settings/updateProperty', {key: 'historyLength', value: totalLengthOfTestHistory});
                this.dateKeys = dates;
            },
            addTests(data, adapter) {
                let key, region, report, incidents;
                incidents = [];
                const convertToNumber = function(value) {
                    let numb = Number(value);
                    if (!isNaN(numb)) {
                        return numb;
                    } else {
                        return null;
                    }
                };

                report = {
                    history: []
                };

                for (let dateKey of this.dateKeys) {
                    let positiveTests, administeredTests, day;
                    day = {
                        // ms: new Date(dateKey.dateString).getTime(),
                        // date: dateKey.dateString,
                        offset: dateKey.offset,
                        positiveTests: null,
                        administeredTests: null
                    };
                    if (data[dateKey.positiveTestsKey]) {
                        positiveTests = Number(data[dateKey.positiveTestsKey]);
                        day.positiveTests = positiveTests;
                        if (this.currentMap.settings.hasAdministeredTests) {
                            administeredTests = Number(data[dateKey.administeredTestsKey]);
                            day.administeredTests = administeredTests;
                        }
                    }
                    incidents.push(day);
                }
                if (this.currentMap.settings.testDataCumulative) {
                    for (let i = 0, l = incidents.length; i < l; i++) {
                        if (i > 0) {
                            let positiveTests = incidents[i].positiveTests - incidents[i - 1].positiveTests;
                            report.history.push({
                                // ms: incidents[i].ms,
                                // date: incidents[i].date,
                                offset: incidents[i].offset,
                                positiveTests
                            });
                        }
                    }
                } else {
                    report.history = incidents;
                }

                key = data[adapter.titleKey];
                if (this.$store.state[this.currentMap.module].dict[key]) {
                    region = this.$store.state[this.currentMap.module].dict[key];
                    this.$store.commit(this.currentMap.module + '/updatePropertyOfItem', {item: region, property: 'report', value: report});
                    if (!this.currentMap.settings.generalInfoHasPopulation) {
                        this.$store.commit(this.currentMap.module + '/updatePropertyOfItem', {item: region, property: 'population', value: convertToNumber(data.population)});
                    }
                } else {
                    //console.log('not found ' + key);
                }
            },
            openHamburgerMenu() {
                this.$store.commit('ui/updateProperty', {key: 'hamburgerMenu', value: true});
            }
        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div class="app">
        <router-view v-if="dataLoaded"/>

        <div
            @click="openHamburgerMenu()"
            class="icon-button icon-button--without-border hamburger">
            <img src="assets/img/tools/hamburger.svg">
        </div>

        <div class="author">
            <a href="https://twitter.com/innouveau" target="_blank">
                @innouveau
            </a>
        </div>

        <hamburger-menu/>
        <credits v-if="showCredits"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/index.scss';
    @import '@/styles/variables.scss';

    .app {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .author {
            position: fixed;
            right: 8px;
            bottom: 12px;
            z-index: 10;

            a {
                color: #000;
            }
        }

        .hamburger {
            position: fixed;
            right: 8px;
            top: 12px;
            z-index: 10;
        }
    }
</style>