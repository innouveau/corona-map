<script>
    import headerMenu from "./header-menu";
    import trends from "./trends/trends";
    import regionDetails from "./regions/region-details/region-details";
    import embedPopup from "./embed/embed-popup";
    import View from "@/classes/View";
    import query from '@/components/elements/query'
    import dateTools from '@/tools/date';
    import mainViewMap from "./main-view-map";
    import * as d3 from "d3";
    import dateTool from "@/tools/date";

    export default {
        name: 'standard-view',
        components: {
            mainViewMap,
            embedPopup,
            trends,
            headerMenu,
            regionDetails
        },
        props: {},
        mixins: [query],
        data() {
            return {
                view: new View({
                    id: 1,
                    currentSource: this.$store.state.sources.all[0]
                })
            }
        },
        computed: {
            showEmbedPopup() {
                return this.$store.state.ui.embedPopup;
            },
            currentRegion() {
                return this.view.currentRegion;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            currentSource() {
                return this.view.currentSource;
            },
            isLoaded(){
                return this.currentSource.loaded;
            }
        },
        methods: {
            readQuery() {
                let region, string, offset, source;
                if (this.$route.query.region) {
                    string = decodeURI(this.$route.query.region);
                    region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', string, true);
                    if (region) {
                        this.view.currentRegion = region;
                    }
                }
                if (this.$route.query.date) {
                    offset = dateTools.getOffsetByDate(this.$route.query.date);
                    this.view.offset = offset;
                }
                if (this.$route.query.admin) {
                    this.$store.commit('ui/updateProperty', {key: 'admin', value: true});
                }
                if (this.$route.query.source) {
                    source = this.$store.getters['sources/getItemByProperty']('title', this.$route.query.source, true);
                    this.view.currentSource = source;
                }
            },
            checkSource() {
                if (!this.currentSource.loaded) {
                    this.loadSource(this.currentSource.title).then(() => {
                        this.$store.commit('sources/updatePropertyOfItem', {item: this.currentSource, property: 'loaded', value: true});
                    });
                }
            },
            loadSource(subjectKey) {
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
            }
        },
        mounted() {
            this.readQuery();
        },
        watch: {
            currentSource: function () {
                this.checkSource();
            }
        }
    }
</script>


<template>
    <div class="standard-view">
        <header-menu
            :view="view"
            :editable="true"/>

        <div class="content">

            <main-view-map
                v-if="isLoaded"
                :view="view"/>

            <div
                v-else
                class="standard-view-map standard-view-map__placeholder">
                Loading {{translate(currentSource.title)}}...
            </div>

            <region-details
                v-if="currentRegion"
                :view="view"
                :region="currentRegion"/>

            <div
                v-else
                class="region-details region-details--mobile">
                Kies eerst een gemeente op de kaart.
            </div>

            <trends :view="view"/>
        </div>

        <embed-popup v-if="showEmbedPopup"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .standard-view {
        height: 100%;

        .content {
            display: flex;
            height: calc(100% - 48px);

            .standard-view-map {
                width: calc(100% - 750px);
            }

            .standard-view-map__placeholder {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .trends {
                width: 300px;
            }

            .region-details {
                // 5 * 70 + 32 + scrollbar + 50
                width: 450px;
            }

            .region-details--mobile {
                padding: 20px;
                display: none;
            }
        }

        @include mobile() {

            .header-menu {
                height: 80px;
            }

            .content {
                display: block;
                position: relative;
                height: calc(100% - 80px);

                .region-details--mobile {
                    display: block;
                }
            }
        }
    }
</style>