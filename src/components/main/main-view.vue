<script>
    import mapTests from "./map/map";
    import searchRegions from "./regions/search/search-regions";
    import credits from "./credits";
    import headerMenu from "./header-menu";
    import trends from "./trends/trends";
    import regionDetails from "./regions/region-details";
    import embedPopup from "./embed/embed-popup";
    import regionTypePicker from "./regions/region-type/region-type-picker";

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
            showRegion() {
                return this.currentRegion;
            },
            currentRegion() {
                return this.currentMap && this.$store.state[this.currentMap.module].current;
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
            }
        }
    }
</script>


<template>
    <div class="main-view">
        <header-menu
            :offset="offset"
            :editable="true"/>

        <div class="content">

            <div
                    :style="{'width': width + 'px'}"
                    :class="{'panel--active': showMap}"
                    class="map-container panel">
                <search-regions/>
                <region-type-picker/>
                <map-tests
                    :show-tools="true"
                    :show-legend="true"
                    :offset="offset"/>
            </div>

<!--            <trends v-if="showTrends"/>-->
            <region-details
                    v-if="showRegion"
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
                height: 64px;
            }

            .content {
                display: block;
                position: relative;
                height: calc(100% - 64px);

                .region-details--mobile {
                    display: block;
                }
            }
        }
    }
</style>