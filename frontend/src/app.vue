<script>
    import * as d3 from 'd3';
    import $ from 'jquery';
    import credits from "@/components/elements/credits";
    import dateTool from "@/tools/date";
    import { loadSources } from "@/tools/timeline";

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
    import HamburgerMenu from "@/components/elements/hamburger/hamburger-menu";


    export default {
        name: 'app',
        components: {
            HamburgerMenu,
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
            },
            block() {
                return this.currentMap && this.currentMap.block && !this.$store.state.ui.admin;
            },
            showHamburger() {
                return this.$store.state.ui.presets !== 'radio1';
            }
        },
        methods: {
            init() {
                this.initLanguages();
                this.pickMap();
                this.loadStaticData();
                this.loadDynamicData();
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
            loadStaticData() {
                this.$store.commit('stories/init', stories);
                this.$store.commit('signalingSystems/init', signalingSystems);
                this.$store.commit('signalingSystems/setCurrent', this.$store.state.signalingSystems.all[0]);
                this.$store.commit('countries/init', countries);
                this.$store.commit('ggds/init', ggds);
                this.$store.commit('safetyRegions/init', safetyRegions);
                this.$store.commit('provinces/init', provinces);
                this.$store.commit('regios/init', regios);
                this.$store.commit('ageGroups/init', ageGroups);
            },
            async loadDynamicData() {
                await this.loadGeoData();
                await loadSources(this.currentMap);
                this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                console.log(this.$store.state);

                // $.getJSON(this.currentMap.data.geo.source, (regions) => {
                //     this.$store.commit(this.currentMap.module + '/init', regions);
                //     if (this.currentMap.data.positivePcrTests.status) {
                //         this.loadPcrTests().then(() => {
                //             const regionsWithNoData = [];
                //             this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                //             for (const region of this.$store.state[this.currentMap.module].all) {
                //                 if (region.report.history.length === 0) {
                //                     regionsWithNoData.push(region);
                //                 }
                //             }
                //             for (const region of regionsWithNoData) {
                //                 this.$store.commit(this.currentMap.module + '/noData', region);
                //             }
                //         })
                //     } else {
                //         this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                //     }
                // });
            },
            loadGeoData() {
                return new Promise((resolve, reject) => {
                    $.getJSON(this.currentMap.data.geo.source, (regions) => {
                        this.$store.commit(this.currentMap.module + '/init', regions);
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    })
                })
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
    <div
        :class="{'map--blocked': block}"
        class="app">
        <router-view v-if="dataLoaded"/>
        <div
            class="loading"
            v-else>
            Loading data...
        </div>

        <div
            v-if="showHamburger"
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

        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

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
