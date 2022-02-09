<script>
import dateTools from '@/tools/date';
import View from '@/classes/View';
import headerMenu from "@/components/pages/header/header-menu";
import Map from "@/components/map/Map";
import RegionDetails from "@/components/pages/main/details/region-details";
import RegionDetailsNumbers from "@/components/pages/main/details/region-details-numbers";
import RegionContainer from "@/components/region/region-container";
import Region from "../../region/Region";

export default {
    name: 'compare',
    components: {
        Region,
        Map,
        headerMenu,
        RegionContainer,
        RegionDetailsNumbers,
        RegionDetails,
    },
    props: {},
    data(){
        return {
            views: []
        }
    },
    computed: {
        routePath() {
            return window.location.href.split('#')[0];
        },
        currentMap() {
            return this.$store.state.maps.current;
        }
    },
    methods: {
        getDates() {
            let date1, date2, offset1, offset2, today, fourWeeksBack;
            today = this.$store.state.ui.today;
            fourWeeksBack = dateTools.getDateByOffset(28);
            if (this.$route.query.date1) {
                date1 = this.$route.query.date1;
            } else {
                date1 = fourWeeksBack;
            }
            if (this.$route.query.date2) {
                date2 = this.$route.query.date2;
            } else {
                date2 = dateTools.formatDate(today);
            }
            offset1 = dateTools.getOffsetByDate(date1) / this.$store.state.maps.current.data.positivePcrTests.interval;
            offset2 = dateTools.getOffsetByDate(date2) / this.$store.state.maps.current.data.positivePcrTests.interval;
            this.views.push(new View ({
                id: 1,
                offset: offset1
            }));
            this.views.push(new View ({
                id: 1,
                offset: offset2
            }));
        },
        updateQuery() {
            let url, date1, date2;
            date1 = dateTools.getDateByOffset(this.views[0].offset * this.currentMap.data.sources.positiveTests.interval);
            date2 = dateTools.getDateByOffset(this.views[1].offset * this.currentMap.data.sources.positiveTests.interval);
            url = this.routePath + '#/compare?map=' + encodeURI(this.currentMap.title) + '&date1=' + date1 + '&date2=' + date2;
            history.pushState(
                {},
                null,
                url
            );
        }
    },
    mounted() {
        this.getDates();
    }
}
</script>


<template>
    <div class="compare">
        <div class="view__items">
            <div v-for="(view, index) in views" class="view-item-container">
                <div class="header-menu-container">
                    <header-menu
                        :view="view"/>
                </div>
                <div class="map-container">
                    <Map
                        :view="view"
                        :map-type="'signaling'"
                        :show-download="false"/>
                    <region-container :view="view">
                        <Region :view="view">
                            <region-details-numbers
                                :view="view"
                                :region="view.currentRegion"
                                :compact="true"/>
                        </Region>
                    </region-container>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .compare {
        height: 100%;

        .view__items {
            height: 100%;
            display: flex;

            .view-item-container {
                width: 50%;
                height: 100%;
                border-right: 1px solid rgba(0,0,0,0.2);
                overflow: hidden;

                &:last-child {
                    border-right: 0;
                }

                .header-menu-container {
                    height: 48px;
                }

                .map-container {
                    height: calc(100% - 48px);
                    position: relative;

                    .region-details__container {
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        width: 200px;
                        z-index: 10;

                        .region-card {
                            padding: 12px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            margin-bottom: 20px;
                            border-radius: 6px;
                            background: #FDFCF8;

                            .region-details__section {
                                padding: 6px 0;

                                .region-details__row {

                                    .region-details__label {
                                        width: 60%;
                                        font-size: 11px;
                                    }

                                    .region-details__value {
                                        width: 40%;
                                        font-size: 13px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .download-image {
            position: absolute;
            left: 10px;
            bottom: 10px;
            z-index: 1;
        }

        @include mobile() {

            .view__items {
                display: block;

                .view-item-container {
                    width: 100%;
                    height: 50%;
                    border-right: 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

                    &:last-child {
                        border-bottom: 0;
                    }
                }
            }
        }
    }
</style>
