<script>
import $ from "jquery";
import { childRegionToParent } from "../../tools/region";
import canvasTools from '@/tools/canvas';
import View from "@/classes/View";
import mapNavigationZoomScroll from "@/components/map/navigation/map-navigation-zoom.scroll.js"
import MapNavigationPositionDrag from "./navigation/map-navigation-position-drag";
import { loadSource } from "@/tools/timeline";

export default {
    name: 'map-canvas',
    components: {MapNavigationPositionDrag},
    mixins: [mapNavigationZoomScroll],
    props: {
        view: {
            type: View,
            required: true
        },
        mapType: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            id: Math.round(Math.random() * 1000000)
        }
    },
    computed: {
        sizes() {
            return this.$store.state.settings.sizes;
        },
        canvas() {
            return document.getElementById('canvas-' + this.id);
        },
        ctx() {
            return this.canvas.getContext('2d');
        },
        //
        color() {
            return this.$store.state.ui.color;
        },
        signalingSystem() {
            return this.$store.state.signalingSystems.current;
        },
        gradient() {
            return this.$store.state.settings.gradient;
        },
        currentMap() {
            return this.$store.state.maps.current;
        },
        currentRegionType() {
            return this.$store.state.ui.currentRegionType;
        },
        currentSource(){
            return this.view.currentSource;
        },
        navigation() {
            return this.$store.state.settings.navigation;
        },
        regions() {
            return this.$store.getters['ui/regions'];
        },
        mapRenderKey() {
            return 'map-' + this.sizes.canvas.width + '-' + this.navigation.zoom + this.navigation.position.x + '-' + this.navigation.position.y;
        }
    },
    methods: {
        init() {
            this.measure();
            setTimeout(() => {
                this.canvas.width = this.sizes.container.width;
                this.canvas.height = this.sizes.container.height;
                this.draw();
                this.addEvents();
                this.checkSource();
            });

            $(window).resize(() => {
                this.resize();
            });
        },
        measure() {
            const canvas = {};
            const container = {};
            container.width = this.$el.clientWidth;
            container.height = this.$el.clientHeight;
            const containerRatio = container.width / container.height;
            const mapRatio = this.currentMap.settings.map.ratio;

            if (mapRatio > containerRatio) {
                canvas.width = container.width;
                canvas.height = Math.round(container.width / mapRatio);
            } else {
                canvas.height = container.height;
                canvas.width = Math.round(container.height * mapRatio);
            }
            const scale = canvas.height * this.currentMap.settings.map.zoom;
            this.$store.commit('settings/setSizeCanvas', canvas);
            this.$store.commit('settings/setSizeContainer', container);
            this.$store.commit('settings/setScale', scale);
        },
        resize() {
            this.measure();
            setTimeout(() => {
                this.canvas.width = this.sizes.container.width;
                this.canvas.height = this.sizes.container.height;
                this.draw();
            });
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
                    this.$store.commit('ui/updateProperty', {key: 'menu', value: 'details'});
                    this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                    this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                } else {
                    this.view.currentRegion = region;
                }
            }, false);
        },
        addHoverEvent() {
            this.canvas.addEventListener('mousemove', (event) => {
                const x = event.offsetX;
                const y = event.offsetY;
                const region = this.getRegionForPoint(x, y);
                if (region) {
                    const levelRegion = childRegionToParent(region, this.$store.state.ui.currentRegionType);
                    this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: levelRegion.title});
                } else {
                    this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                }
            }, false);
        },
        getRegionForPoint(x, y) {
            const regions = this.$store.state[this.currentMap.module].all;
            let reversed = regions.slice().reverse();
            for (let region of reversed) {
                for (let path of region.paths) {
                    if (this.ctx.isPointInPath(path.storedPaths[this.mapRenderKey], x, y)) {
                        return region;
                    }
                }
            }
            return null;
        },
        draw() {
            if (this.currentSource.loaded) {
                this.clear();
                const settings = {
                    key: this.mapRenderKey,
                    container: this.sizes.container,
                    canvas: this.sizes.canvas,
                    scale: this.$store.state.settings.scale,
                    map: this.currentMap.settings.map,
                    navigation: this.navigation,
                    fill: true,
                    border: true,
                    shiftPrint: {
                        x: 0,
                        y: 0
                    }
                };
                canvasTools.draw(this.ctx, this.regions, settings, this.view, this.mapType);
            }
        },
        clear() {
            this.ctx.clearRect(0, 0, this.sizes.container.width, this.sizes.container.height);
        },
        checkSource() {
            if (this.view.currentSource && !this.view.currentSource.loaded) {
                const key = this.view.currentSource.key;
                const sourceData = this.currentMap.data.sources[key];
                loadSource(this.currentMap, {...sourceData, key }).then(() => {
                    this.$nextTick(() => {
                        this.draw();
                    });
                })
            }
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
        currentRegionType: function () {
            this.draw();
        },
        color: function () {
            this.draw();
        },
        signalingSystem: function () {
            this.draw();
        },
        gradient: function () {
            this.draw();
        },
        navigation: {
            handler: function() {
                this.draw();
            },
            deep: true
        },
        currentSource: function () {
            this.checkSource();
        },
    }
}
</script>


<template>
    <canvas :id="'canvas-' + id"></canvas>
</template>


<style lang="scss" scoped>
canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
}
</style>
