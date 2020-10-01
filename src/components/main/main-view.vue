<script>
    import mapTests from "./map/map";
    import searchRegions from "./regions/search/search-regions";
    import credits from "./credits";
    import headerMenu from "./header-menu";
    import trends from "./trends/trends";
    import regionDetails from "./regions/region-details/region-details";
    import embedPopup from "./embed/embed-popup";
    import regionTypePicker from "./regions/region-type/region-type-picker";
    import View from "@/classes/View";
    import query from '@/components/elements/query'
    import dateTools from '@/tools/date';

    export default {
        name: 'main-view',
        components: {
            regionTypePicker,
            embedPopup,
            trends,
            headerMenu,
            credits,
            searchRegions,
            mapTests,
            regionDetails
        },
        props: {},
        mixins: [query],
        data() {
            return {
                view: new View({id: 1})
            }
        },
        computed: {
            width() {
                return this.$store.state.settings.canvasWidth + 20;
            },
            showCredits() {
                return this.$store.state.ui.credits;
            },
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
            openCredits() {
                this.$store.commit('ui/updateProperty', {key: 'credits', value: true});
            },
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
                    :style="{'width': width + 'px'}"
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

        <credits v-if="showCredits"/>

        <embed-popup v-if="showEmbedPopup"/>

        <div
            @click="openCredits()"
            class="open-credits">
            Credits
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .main-view {
        height: 100%;

        .header-menu {
            height: 48px;
        }

        .content {
            display: flex;
            height: calc(100% - 48px);

            .map-container {

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
                // 7 * 70 + 32 + scrollbar
                width: 540px;
            }

            .region-details--mobile {
                padding: 20px;
                display: none;
            }
        }

        .open-credits {
            position: fixed;
            right: 10px;
            bottom: 6px;
            cursor: pointer;
            text-decoration: underline;
            text-align: right;
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