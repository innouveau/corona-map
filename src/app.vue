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
    import regios from '@/data/regios';
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
                this.readQuery();
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
            readQuery() {
                let string, signalingSystem;
                if (this.$route.query.signaling) {
                    string = decodeURI(this.$route.query.signaling);
                    signalingSystem = this.$store.getters['signalingSystems/getItemByProperty']('title', string, true);
                    if (signalingSystem) {
                        this.$store.commit('signalingSystems/setCurrent', signalingSystem);
                    }
                }
                if (this.$route.query.video) {
                    this.$store.commit('ui/updateProperty', {key: 'videoMode', value: true});
                }
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
                this.$store.commit('regios/init', regios);
                this.$store.commit('ageGroups/init', ageGroups);
                this.loadRegions();
            },
            loadRegions() {
                $.getJSON(this.currentMap.data.geo.source, (regions) => {
                    let promises = [];
                    this.$store.commit(this.currentMap.module + '/init', regions);
                    // check all sources
                    this.loadPcrTests().then(() => {
                        if (this.currentMap.data.ageGroups.status) {
                            promises.push(this.loadAgeGroupsForCities);
                        }
                        if (promises.length === 0) {
                            this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                        } else {
                            Promise.all(promises.map(p => p()))
                                .then((result) => {
                                    // always do sewage after the tests, otherwise
                                    // date offset can come too late
                                    if (this.currentMap.data.sewageMeasurements.status) {
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
                    })
                });
            },
            loadSewageTreatmentPlants() {
                return new Promise((resolve, reject) => {
                    $.getJSON(this.currentMap.data.sewageMeasurements.source + dateTool.getTimestamp(), (sewageTreatmentPlants) => {
                        this.$store.commit('sewageTreatmentPlants/init', sewageTreatmentPlants);
                        resolve();
                    });
                })
            },
            loadAntigenTests() {
                return new Promise((resolve, reject) => {
                    d3.csv(this.currentMap.data.positiveAntigenTests.source + dateTool.getTimestamp())
                        .then((result) => {
                            let adapter, positiveAntigenTestsKeys;
                            adapter = this.currentMap.data.positiveAntigenTests.adapter;
                            positiveAntigenTestsKeys = result.columns.filter(column => adapter.getPositiveKeys(column));
                            for (let row of result) {
                                let title, region;
                                title = row.region;
                                region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', title, true);
                                if (region) {
                                    for (let positiveAntigenTestsKey of positiveAntigenTestsKeys) {
                                        let frame, date, positiveAntigenTestsValue,
                                            totalAntigenTestsKey, totalAntigenTestsValue;
                                        positiveAntigenTestsValue = Number(row[positiveAntigenTestsKey]);
                                        date = adapter.getDateFromKey(positiveAntigenTestsKey);
                                        frame = region.report.history.find(f => f.date === date);
                                        if (frame) {
                                            totalAntigenTestsKey = adapter.getTotalKeyFromDate(date);
                                            totalAntigenTestsValue = Number(row[totalAntigenTestsKey]);
                                            frame.positiveAntigenTests = positiveAntigenTestsValue;
                                            frame.totalAntigenTests = totalAntigenTestsValue;
                                        } else {
                                            console.error('frame with date ' + date + ' not found for antigen data');
                                        }
                                    }
                                } else {
                                    console.error('Region ' + title + ' not found for antigen data');
                                }

                            }
                            resolve();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
            },
            loadPcrTests() {
                const addTestsForRegions = (item) => {
                    if (this.currentMap.settings.excludeRegions) {
                        let identifier = item[this.currentMap.data.positivePcrTests.adapter.titleKey];
                        return this.currentMap.settings.excludeRegions.indexOf(identifier) === -1;
                    } else {
                        return true;
                    }
                };

                return new Promise((resolve, reject) => {
                    d3.csv(this.currentMap.data.positivePcrTests.source + dateTool.getTimestamp())
                        .then((data) => {
                            let adapter, promises;
                            promises = [];
                            if (this.currentMap.data.positivePcrTests.adapter) {
                                adapter = this.currentMap.data.positivePcrTests.adapter;
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
                            this.addSource('positiveTests', 0);

                            const loadHospitalisations = () => {
                                this.loadStandard('hospitalisations');
                                this.addSource('hospitalisations', 1);
                            };

                            const loadDeceased = () => {
                                this.loadStandard('deceased');
                                this.addSource('deceased', 2);
                            };


                            if (this.currentMap.data.positiveAntigenTests.status) {
                                promises.push(this.loadAntigenTests);
                            }
                            if (this.currentMap.data.hospitalisations.status) {
                                promises.push(loadHospitalisations);
                            }
                            if (this.currentMap.data.deceased.status) {
                                promises.push(loadDeceased);
                            }

                            if (promises.length > 0) {
                                Promise.all(promises.map(p => p()))
                                    .then((result) => {
                                        resolve();
                                    })
                            } else {
                                resolve();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
            },
            loadStandard(subjectKey) {
                return new Promise((resolve, reject) => {
                    d3.csv(this.currentMap.data[subjectKey].source + dateTool.getTimestamp())
                        .then((result) => {
                            let adapter, keys, lastValue;
                            adapter = this.currentMap.data[subjectKey].adapter;
                            keys = adapter.getKeys(result.columns);
                            for (let row of result) {
                                let title, region;
                                title = row[adapter.regionKey];
                                region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', title, true);
                                if (region) {
                                    lastValue = 0;
                                    for (let key of keys) {
                                        let frame, date, value;
                                        value = Number(row[key]);
                                        date = adapter.getDateFromKey(key);
                                        frame = region.report.history.find(f => f.date === date);
                                        if (frame) {
                                            frame[subjectKey] = value - lastValue;
                                        } else {
                                            //console.error('frame with date ' + date + ' not found for hospitalisations data');
                                        }
                                        lastValue = value;
                                    }
                                } else {
                                    //console.error('Region ' + title + ' not found for hospitalisations data');
                                }
                            }
                            resolve();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
            },
            addSource(subjectKey, order) {
                let signalingSystem, source;
                signalingSystem = this.$store.state.signalingSystems.all.find(s => s.source === subjectKey);
                source = {
                    key: subjectKey,
                    title: subjectKey,
                    signalingSystem_id: signalingSystem.id,
                    order
                };
                this.$store.commit('sources/create', source);
            },
            loadAgeGroupsForCities() {
                return new Promise((resolve, reject) => {
                    d3.csv(this.currentMap.data.ageGroups.source + dateTool.getTimestamp())
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
                    let offset = dates.length - dates.indexOf(date) - 1;
                    date.offset = offset;
                    dateTool.addDateOffset(date.dateString, offset)
                }
                first = dates[0];
                last = dates[dates.length - 1];
                today = new Date(last.dateString);
                totalLengthOfTestHistory = first.offset;
                // when cumulative the first day has to be ignored, because we
                // dont know the value of the day before that to calculate the absolute value
                if (this.currentMap.data.positivePcrTests.cumulative) {
                    totalLengthOfTestHistory--;
                }
                // need extra buffer to calculate the first week
                if (this.currentMap.data.positivePcrTests.interval === 1) {
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
                        date: dateKey.dateString,
                        offset: dateKey.offset,
                        positiveTests: null,
                        positiveAntigenTests: 0,
                        administeredTests: null
                    };
                    if (data[dateKey.positiveTestsKey]) {
                        positiveTests = Number(data[dateKey.positiveTestsKey]);
                        day.positiveTests = positiveTests;
                        if (this.currentMap.data.administeredPcrTests.status) {
                            administeredTests = Number(data[dateKey.administeredTestsKey]);
                            day.administeredTests = administeredTests;
                        }
                    }
                    incidents.push(day);
                }
                if (this.currentMap.data.positivePcrTests.cumulative) {
                    for (let i = 0, l = incidents.length; i < l; i++) {
                        if (i > 0) {
                            let positiveTests = incidents[i].positiveTests - incidents[i - 1].positiveTests;
                            report.history.push({
                                // ms: incidents[i].ms,
                                date: incidents[i].date,
                                offset: incidents[i].offset,
                                positiveAntigenTests: incidents[i].positiveAntigenTests,
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