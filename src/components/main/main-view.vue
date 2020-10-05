<script>
    import mapTests from "@/components/map/map";
    import searchRegions from "./regions/search/search-regions";
    import headerMenu from "./header-menu";
    import trends from "./trends/trends";
    import regionDetails from "./regions/region-details/region-details";
    import embedPopup from "./embed/embed-popup";
    import regionTypePicker from "./regions/region-type/region-type-picker";
    import View from "@/classes/View";
    import query from '@/components/elements/query'
    import dateTools from '@/tools/date';
    import timeSlider from "@/components/map/time-slider";


    export default {
        name: 'main-view',
        components: {
            regionTypePicker,
            embedPopup,
            trends,
            headerMenu,
            searchRegions,
            mapTests,
            regionDetails,
            timeSlider
        },
        props: {},
        mixins: [query],
        data() {
            return {
                view: new View({id: 1})
            }
        },
        computed: {
            showEmbedPopup() {
                return this.$store.state.ui.embedPopup;
            },
            showMap() {
                return this.$store.state.ui.menu === 'map';
            },
            showTrends() {
                return this.currentMap.settings.hasTests;
            },
            currentRegion() {
                return this.view.currentRegion;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            offset() {
                return this.$store.state.settings.currentDateOffset;
            }
        },
        methods: {
            readQuery() {
                let region, string, date, offset;
                if (this.$route.query.region) {
                    string = decodeURI(this.$route.query.region);
                    region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', string, true);
                    if (region) {
                        this.view.currentRegion = region;
                    }
                }
                if (this.$route.query.date) {
                    date = new Date(this.$route.query.date);
                    offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, date.getTime());
                    this.view.offset = offset;
                }
                if (this.$route.query.admin) {
                    this.$store.commit('ui/updateProperty', {key: 'admin', value: true});
                }
            }
        },
        mounted() {
            this.readQuery();
        }
    }
</script>


<template>
    <div class="main-view">
        <header-menu
            :view="view"
            :editable="true"/>

        <div class="content">

            <div
                :class="{'panel--active': showMap}"
                class="map-container panel">
                <search-regions
                    :view="view"/>
                <region-type-picker
                    :view="view"/>
                <map-tests
                    :view="view"
                    :show-tools="true"
                    :show-legend="true"
                    :offset="offset"/>

                <time-slider
                        v-if="true"
                        :view="view"/>
            </div>

            <trends
                v-if="showTrends"
                :view="view"/>

            <region-details
                v-if="currentRegion"
                :view="view"
                :region="currentRegion"/>
            <div
                v-else
                class="region-details region-details--mobile">
                Kies eerst een gemeente op de kaart.
            </div>
        </div>

        <embed-popup v-if="showEmbedPopup"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .main-view {
        height: 100%;

        .content {
            display: flex;
            height: calc(100% - 48px);

            .map-container {
                width: calc(100% - 750px);

                .cities-panel {
                    height: 40px;
                }

                .region-type-picker-2 {
                    margin-bottom: 6px;
                }

                .map {
                    height: calc(100% - 76px);
                }
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