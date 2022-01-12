<script>
    import canvasTools from '@/tools/canvas';
    import pointerCanvas from "./pointer-canvas";
    import mapToolsPopup from "./tools/map-tools-popup";
    import View from "@/classes/View";
    import $ from 'jquery';
    import MapLabels from "./labels/map-labels";
    import regionTypePicker from "@/components/_map/region-type/region-type-picker";
    import mapSourcePicker from "@/components/_map/source/map-source-picker";
    import searchRegions from "./search/search-regions";
    import MapLegend from "./legend/map-legend";
    import MapLegendChange from "./legend/map-legend-change";
    import ViewTools from "@/components/time/view-tools";
    import TimeSliderRange from "@/components/time/time-slider/time-slider-range";
    import sourceTools from "@/tools/source";
    import Loader from "../elements/loader";
    import dateTools from '@/tools/date';

    export default {
        name: 'Map',
        components: {
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
            mapSourcePicker
        },
        props: {
            showTools: {
                type: Boolean,
                required: false,
                default: true
            },
            view: {
                type: View,
                required: true
            },
            mapType: {
                type: String,
                required: true
            },
            showDownload: {
                type: Boolean,
                required: false,
                default: true
            },
            labels: {
                type: Array,
                required: false,
                default: () => {
                    return [];
                }
            },
        },
        data() {
            let id = Math.round(Math.random() * 1000000);
            return {
                id,
                readQueryDone: false
            }
        },
        computed: {
            width() {
                return this.$store.state.settings.canvasWidth;
            },
            height() {
                return this.$store.state.settings.canvasHeight;
            },
            containerRegions() {
                return this.$store.getters['ui/regions'];
            },
            regions() {
                return this.$store.state[this.currentMap.module].all;
            },
            canvas() {
                return document.getElementById('canvas-' + this.id);
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            currentRegionType() {
                return this.$store.state.ui.currentRegionType;
            },
            color() {
                return this.$store.state.ui.color;
            },
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            gradient() {
                return this.$store.state.settings.gradient;
            },
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
                return this.currentMap.settings.regionTypes && this.currentMap.settings.regionTypes.length > 1;
            },
            hasSourcePicker() {
                return this.currentMap.data.hospitalisations.status || this.currentMap.data.deceased.status;
            },
            currentSource(){
                return this.view.currentSource;
            },
            isLoaded(){
                return this.view.currentSource.loaded;
            }
        },
        methods: {
            init() {
                this.readQuery();
                this.measure();
                setTimeout(() => {
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                    this.draw();
                    this.addEvents();
                    this.checkSource();
                });

                $(window).resize(() => {
                    this.resize();
                });
            },
            readQuery() {
                let region, offset, source, start;
                if (this.$route.query.region) {
                    const regionString = decodeURI(this.$route.query.region);
                    region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', regionString, true);
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
                    this.$store.commit('ui/updateProperty', {key: 'admin', value: true});
                }
                if (this.$route.query.source) {
                    source = this.$store.getters['sources/getItemByProperty']('title', this.$route.query.source, true);
                    this.view.currentSource = source;
                }
                if (this.$route.query.signaling) {
                    const signalingId = Number(this.$route.query.signaling);
                    const signalingSystem = this.$store.getters['signalingSystems/getItemById'](signalingId);
                    if (signalingSystem) {
                        this.view.currentSource.signalingSystem_id = signalingSystem.id;
                    }
                }
                if (this.$route.query.gradient) {
                    if (this.$route.query.gradient === 'false') {
                        this.$store.commit('settings/updateProperty', {key: 'gradient', value: false});
                    }
                }
                if (this.$route.query.regiontype) {
                    this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.$route.query.regiontype});
                }
                this.readQueryDone = true;
            },
            resize() {
                this.measure();
                setTimeout(() => {
                    this.clearCache();
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                    this.draw();
                });
            },
            clearCache() {
                for (let region of this.$store.state[this.currentMap.module].all) {
                    for (let path of region.paths) {
                        path.storedPaths = {};
                    }
                }
            },
            measure() {
                let elementWidth, elementHeight, canvasWidth, canvasHeight, mapRatio, elementRatio, windowWidth;
                elementWidth = this.$refs.main.clientWidth;
                elementHeight = this.$refs.main.clientHeight;
                elementRatio = elementWidth / elementHeight;
                mapRatio = this.currentMap.settings.map.ratio;

                if (mapRatio > elementRatio) {
                    canvasWidth = elementWidth;
                    canvasHeight = canvasWidth / mapRatio;
                } else {
                    canvasHeight = elementHeight;
                    canvasWidth = canvasHeight * mapRatio;
                }


                this.$store.commit('settings/updateProperty', {key: 'canvasWidth', value: Math.round(canvasWidth)});
                this.$store.commit('settings/updateProperty', {key: 'canvasHeight', value: Math.round(canvasHeight)});
                this.$store.commit('settings/updateProperty', {key: 'zoom', value: (canvasHeight * this.currentMap.settings.map.zoom)});

            },
            addEvents() {
                this.addClickEvent();
                this.addHoverEvent();
            },
            addClickEvent() {
                this.canvas.addEventListener('click', (event) => {
                    let x, y, region;
                    x = event.offsetX;
                    y = event.offsetY;
                    region = this.getRegionForPoint(x, y);
                    if (region) {
                        this.view.currentRegion = region;
                        this.$store.commit('ui/updateProperty', {key: 'menu', value: 'city'});
                        this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                    } else {
                        this.view.currentRegion = region;
                    }
                }, false);
            },
            addHoverEvent() {
                this.canvas.addEventListener('mousemove', (event) => {
                    let x, y, region;
                    x = event.offsetX;
                    y = event.offsetY;
                    region = this.getRegionForPoint(x, y);
                    if (region) {
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: region.title});
                    } else {
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                    }
                }, false);
            },
            getRegionForPoint(x, y) {
                let reversed = this.regions.slice().reverse();
                for (let region of reversed) {
                    for (let path of region.paths) {
                        if (this.ctx.isPointInPath(path.storedPaths['map-' + this.$store.state.settings.canvasWidth], x, y)) {
                            return region;
                        }
                    }
                }
                return null;
            },
            draw() {
                if (this.view.currentSource.loaded) {
                    this.clear();
                    let settings = {
                        key: 'map-' + this.$store.state.settings.canvasWidth,
                        width: this.$store.state.settings.canvasWidth,
                        height: this.$store.state.settings.canvasHeight,
                        shiftX: 0,
                        shiftY: 0,
                        zoom: this.$store.state.settings.zoom,
                        fill: true
                    };
                    canvasTools.draw(this.ctx, this.view.currentSource, this.containerRegions, settings, this.view, this.mapType);
                }
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
            openMapTools() {
                this.$store.commit('ui/updateProperty', {key: 'mapToolsPopup', value: true});
            },
            download() {
                this.$emit("download");
            },
            checkSource() {
                if (!this.view.currentSource.loaded) {
                    sourceTools.load(this.view.currentSource).then(() => {

                        this.$nextTick(() => {
                            this.draw();
                        });
                    })
                }
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            view: {
                handler: function() {
                    this.draw();
                },
                deep: true
            },
            currentRegionType: {
                handler: function() {
                    this.draw();
                }
            },
            color: {
                handler: function() {
                    this.draw();
                }
            },
            signalingSystem: {
                handler: function() {
                    this.draw();
                }
            },
            gradient: {
                handler: function() {
                    this.draw();
                }
            },
            currentSource: function () {
                this.checkSource();
            }
        }
    }
</script>


<template>
    <div class="Map">

        <search-regions
            :view="view"/>

        <div class="Map__main" ref="main">
            <canvas :id="'canvas-' + id"></canvas>

            <pointer-canvas
                :view="view"
                :width="width"
                :height="height"/>

            <div class="Map__side-bar">
                <region-type-picker
                    v-if="hasRegionTypePicker"
                    :view="view"/>

                <map-source-picker
                    v-if="hasSourcePicker"
                    :view="view"/>

                <map-legend v-if="mapType === 'signaling'" :view="view"/>
                <map-legend-change v-if="mapType === 'change'" :view="view"/>
            </div>

            <div
                v-if="showDownload && !videoMode"
                @click="download"
                class="download-image icon-button">
                <img src="assets/img/tools/download.svg" alt="">
            </div>

            <div
                v-if="mapType === 'signaling' && !videoMode"
                @click="openMapTools()"
                class="icon-button icon-button--without-border button-open-map-tools">
                <img src="assets/img/tools/dots.svg" alt="">
            </div>

            <map-labels
                v-if="labels"
                :style="{'width': width + 'px', 'height': height + 'px'}"
                :labels="labels"/>

            <map-tools-popup
                v-if="showMapToolsPopup && mapType === 'signaling'"
                :view="view"/>
        </div>

        <div class="Map__tools" v-if="readQueryDone">
            <view-tools v-if="mapType !== 'cumulative'" :view="view" />
            <time-slider-range v-if="mapType === 'cumulative'" :view="view" />
        </div>

        <Loader v-if="!isLoaded" :text="'Loading ' + translate(currentSource.title) + '...'"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Map {
        height: 100%;
        padding: 16px;
        background: $map-color;

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

            > div {
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
        }

        &__tools {
            height: 40px;
            display: flex;
            align-items: center;

            .time-slider, .time-slider-range {
                width: calc(100% - 34px);
            }

            .embed-button {
                margin-left: 8px;
            }
        }

        &__main {
            height: calc(100% - 82px);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            canvas {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                //border: 1px solid #000;
            }

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
