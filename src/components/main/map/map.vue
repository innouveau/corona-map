<script>
    import mapTools from "./map-tools";
    import TimeSlider from "./time-slider";
    import downloadImage from "./download-image";
    import canvasTools from '@/tools/canvas';
    import PointerCanvas from "./pointer-canvas";
    import embedButton from "./embed-button";
    import $ from 'jquery';
    import View from "@/classes/View";

    export default {
        name: 'map-tests',
        components: {
            embedButton,
            PointerCanvas,
            downloadImage,
            TimeSlider,
            mapTools
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
                this.clearCache();
                setTimeout(() => {
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
                        if (this.ctx.isPointInPath(path.storedPaths['map'], x, y)) {
                            return region;
                        }
                    }
                }
                return null;
            },
            draw() {
                this.clear();
                let settings = {
                    key: 'map',
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
        <map-tools
            :show-tools="showTools"
            :show-legend="showLegend"/>

        <time-slider
            v-if="showTools"
            :view="view"/>

        <embed-button v-if="showTools"/>
        <download-image
            v-if="showTools"
            :view="view"/>
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
            border: 1px solid #000;
        }

        #main-canvas {
            z-index: 0;
        }

        #pointer-canvas {
            z-index: 1;
        }

        .map-tools {
            position: absolute;
            left: 0;
            top: 10px;
            z-index: 1;
        }

        .time-slider {
            position: absolute;
            left: 10px;
            bottom: 20px;
            z-index: 1;
        }

        .download-image {
            position: absolute;
            right: 10px;
            bottom: 20px;
            z-index: 1;
        }

        .embed-button {
            position: absolute;
            right: 44px;
            bottom: 20px;
            z-index: 1;
        }
    }
</style>