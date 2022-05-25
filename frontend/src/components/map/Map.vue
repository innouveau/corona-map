<script>
import pointerCanvas from "./pointer-canvas";
import mapToolsPopup from "./tools/map-tools-popup";
import View from "@/classes/View";
import MapLabels from "./labels/map-labels";
import regionTypePicker from "@/components/elements/region-type/region-type-picker";
import mapSourcePicker from "@/components/map/source/map-source-picker";
import searchRegions from "./search/search-regions";
import MapLegend from "./legend/map-legend";
import MapLegendChange from "./legend/map-legend-change";
import ViewTools from "@/components/time/view-tools";
import TimeSliderRange from "@/components/time/time-slider/time-slider-range";
import Loader from "../elements/loader";
import MapLegendCumulative from "./legend/map-legend-cumulative";
import mapNavigation from "./navigation/map-navigation";
import MapCanvas from "./map-canvas";
import MapNavigationPositionDrag from "./navigation/map-navigation-position-drag";
import dateTools from "@/tools/date";

export default {
    name: "Map",
    components: {
        MapNavigationPositionDrag,
        MapCanvas,
        MapLegendCumulative,
        Loader,
        TimeSliderRange,
        ViewTools,
        MapLegendChange,
        MapLegend,
        searchRegions,
        MapLabels,
        mapToolsPopup,
        pointerCanvas,
        regionTypePicker,
        mapSourcePicker,
        mapNavigation,
    },
    props: {
        showTools: {
            type: Boolean,
            required: false,
            default: true,
        },
        view: {
            type: View,
            required: true,
        },
        mapType: {
            type: String,
            required: true,
        },
        showDownload: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            readQueryDone: false,
        };
    },
    computed: {
        showMapToolsPopup() {
            return this.$store.state.ui.mapToolsPopup;
        },
        videoMode() {
            return this.$store.state.ui.videoMode;
        },
        currentMap() {
            return this.$store.state.maps.current;
        },
        hasRegionTypePicker() {
            return (
                this.currentMap.settings.regionTypes &&
                this.currentMap.settings.regionTypes.length > 1
            );
        },
        hasSourcePicker() {
            return this.$store.state.sources.all.length > 1;
        },
        isLoaded() {
            return this.view.currentSource && this.view.currentSource.loaded;
        },
        isLoading() {
            return this.view.currentSource && !this.view.currentSource.loaded;
        },
        currentSource() {
            return this.view.currentSource;
        },
        panModus() {
            return this.$store.state.settings.panModus;
        },
    },
    methods: {
        readQuery() {
            let region, offset, source, start;
            if (this.$route.query.region) {
                const regionString = decodeURI(this.$route.query.region);
                region = this.$store.getters["regions/getItemByProperty"](
                    "title",
                    regionString,
                    true
                );
                if (region) {
                    this.view.currentRegion = region;
                }
            }
            if (this.$route.query.date) {
                offset = dateTools.getOffsetByDate(this.$route.query.date);
                this.view.offset = offset;
            }
            if (this.$route.query.start) {
                start = dateTools.getOffsetByDate(this.$route.query.start);
                this.view.offsetStart = start;
            }
            if (this.$route.query.admin) {
                this.$store.commit("ui/updateProperty", {
                    key: "admin",
                    value: true,
                });
            }
            if (this.$route.query.source) {
                source = this.$store.getters["sources/getItemByProperty"](
                    "title",
                    this.$route.query.source,
                    true
                );
                this.view.currentSource = source;
            }
            if (this.$route.query.signaling) {
                const signalingId = Number(this.$route.query.signaling);
                const signalingSystem =
                    this.$store.getters["signalingSystems/getItemById"](
                        signalingId
                    );
                if (signalingSystem) {
                    this.view.currentSource.signalingSystem_id =
                        signalingSystem.id;
                }
            }
            if (this.$route.query.gradient) {
                if (this.$route.query.gradient === "false") {
                    this.$store.commit("settings/updateProperty", {
                        key: "gradient",
                        value: false,
                    });
                }
            }
            if (this.$route.query.regiontype) {
                this.$store.commit("ui/updateProperty", {
                    key: "currentRegionType",
                    value: this.$route.query.regiontype,
                });
            }
            this.readQueryDone = true;
        },
        openMapTools() {
            this.$store.commit("ui/updateProperty", {
                key: "mapToolsPopup",
                value: true,
            });
        },
        download() {
            this.$emit("download");
        },
    },
    mounted() {
        this.readQuery();
    },
};
</script>

<template>
    <div class="Map">
        <search-regions :view="view" />

        <map-navigation />

        <div class="Map__main" ref="main">
            <map-canvas :view="view" :map-type="mapType" />

            <pointer-canvas :view="view" />

            <map-navigation-position-drag v-show="panModus" />

            <div v-if="currentSource" class="Map__side-bar">
                <region-type-picker v-if="hasRegionTypePicker" :view="view" />

                <map-source-picker v-if="hasSourcePicker" :view="view" />

                <map-legend v-if="mapType === 'signaling'" :view="view" />
                <map-legend-change v-if="mapType === 'change'" :view="view" />
                <map-legend-cumulative
                    v-if="mapType === 'cumulative'"
                    :view="view"
                />
            </div>

            <div
                v-if="showDownload && !videoMode"
                @click="download"
                class="download-image icon-button"
            >
                <img src="assets/img/tools/download.svg" alt="" />
            </div>

            <div
                v-if="mapType === 'signaling' && !videoMode"
                @click="openMapTools()"
                class="icon-button icon-button--without-border button-open-map-tools"
            >
                <img src="assets/img/tools/dots.svg" alt="" />
            </div>

            <map-tools-popup
                v-if="showMapToolsPopup && mapType === 'signaling'"
                :view="view"
            />
        </div>

        <div class="Map__tools" v-if="readQueryDone">
            <view-tools
                v-if="currentSource && mapType !== 'cumulative'"
                :view="view"
            />
            <time-slider-range v-if="mapType === 'cumulative'" :view="view" />
        </div>

        <Loader
            v-if="isLoading"
            :text="'Loading ' + translate(currentSource.title) + '...'"
        />
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.Map {
    height: 100%;
    padding: 16px;
    background: $map-color;
    position: relative;

    .search-regions {
        height: 36px;
        margin-bottom: 6px;
    }

    &__loading {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    &__side-bar {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        z-index: 2;

        > div:not(.map-legend) {
            pointer-events: all;
        }

        .region-type-picker {
            border-left: 2px solid $map-color-dark;
            padding-left: 8px;
            margin-left: 1px;
            display: flex;
            align-items: center;
            color: $map-color-super-dark;
            margin-bottom: 8px;
        }

        .map-source-picker {
            height: 20px;
            border-left: 2px solid $map-color-dark;
            padding-left: 8px;
            margin-left: 1px;
            display: flex;
            align-items: center;
            color: $map-color-super-dark;
            margin-bottom: 8px;
        }

        .map-legend {
            margin-top: 16px;
        }
    }

    &__tools {
        height: 40px;
        margin-top: 20px;
        display: flex;
        align-items: center;

        .time-slider,
        .time-slider-range {
            width: calc(100% - 34px);
        }

        .embed-button {
            margin-left: 8px;
        }
    }

    .map-navigation {
        height: 40px;
    }

    &__main {
        height: calc(100% - 142px);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        #main-canvas {
            z-index: 0;
        }

        #pointer-canvas {
            z-index: 1;
        }

        .download-image {
            position: absolute;
            left: 0;
            bottom: 10px;
            z-index: 1;
        }

        .button-open-map-tools {
            position: absolute;
            right: 0;
            top: 10px;
            z-index: 1;
        }

        .map-tools-popup {
            position: absolute;
            right: 0;
            top: 10px;
            z-index: 6;
        }
    }
}
</style>
