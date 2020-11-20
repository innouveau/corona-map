<script>
    import downloadImageSignaling from "./download/download-image-signaling";
    import canvasTools from '@/tools/canvas';
    import pointerCanvas from "./pointer-canvas";
    import mapToolsPopup from "./map-tools-popup";
    import mapLegend from "./map-legend/map-legend";
    import View from "@/classes/View";
    import $ from 'jquery';
    import MapLabels from "./map-labels/map-labels";

    export default {
        name: 'map-signaling',
        components: {
            MapLabels,
            mapLegend,
            mapToolsPopup,
            pointerCanvas,
            downloadImageSignaling
        },
        props: {
            showTools: {
                type: Boolean,
                required: true
            },
            showLegend: {
                type: Boolean,
                required: true
            },
            view: {
                type: View,
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
            }
        },
        data() {
            let id = Math.round(Math.random() * 1000000);
            return {
                id
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
            currentMap() {
                return this.$store.state.maps.current;
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
                return this.$store.state.ui.currentRegionType
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
            }
        },
        methods: {
            init() {
                this.measure();
                setTimeout(() => {
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                    this.draw();
                    this.addEvents();
                });

                $(window).resize(() => {
                    this.resize();
                });
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
                elementWidth = this.$el.clientWidth;
                elementHeight = this.$el.clientHeight;
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
                canvasTools.draw(this.ctx, this.containerRegions, settings, this.view.offset);
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
            openMapTools() {
                this.$store.commit('ui/updateProperty', {key: 'mapToolsPopup', value: true});
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
            }
        }
    }
</script>


<template>
    <div class="map">
        <canvas :id="'canvas-' + id"></canvas>

        <pointer-canvas
            :view="view"
            :width="width"
            :height="height"/>

        <map-legend
            v-if="showLegend"/>

        <download-image-signaling
            v-if="showDownload && !videoMode"
            :view="view"/>

        <div
            v-if="showTools && !videoMode"
            @click="openMapTools()"
            class="icon-button icon-button--without-border button-open-map-tools">
            <img src="assets/img/tools/dots.svg">
        </div>

        <map-labels
            v-if="labels"
            :style="{'width': width + 'px', 'height': height + 'px'}"
            :labels="labels"/>

        <map-tools-popup
            v-if="showMapToolsPopup && showTools"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map {
        display: flex;
        align-items: center;
        position: relative;
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

        .map-legend {
            position: absolute;
            left: 0;
            top: 10px;
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
</style>