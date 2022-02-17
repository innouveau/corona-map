<script>
import $ from "jquery";
import canvasTools from '@/tools/canvas';
import View from "@/classes/View";
import mapNavigationZoomScroll from "@/components/map/navigation/map-navigation-zoom.scroll.js"
import MapNavigationPositionDrag from "./navigation/map-navigation-position-drag";
import { loadSource } from "@/tools/timeline";
import mapMixin from "./map-mixin.js";
import { getRegionFromBaseRegion } from "@/tools/relations";
import {getBaseRegions, getRegions} from "../../tools/relations";

export default {
    name: 'map-canvas',
    components: { MapNavigationPositionDrag },
    mixins: [mapNavigationZoomScroll, mapMixin],
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
    computed: {
        canvas() {
            return document.getElementById('canvas-' + this.id);
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
        currentRegionType() {
            return this.$store.state.ui.currentRegionType;
        },
        currentSource(){
            return this.view.currentSource;
        },
        regions() {
            return this.$store.getters['regions/regionsForRegionType'];
        },
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
                const x = event.offsetX;
                const y = event.offsetY;
                const region = this.getRegionForPoint(x, y);
                if (region) {
                    const baseRegion = getBaseRegions(region, this.$store.state.ui.currentRegionType)[0];
                    this.view.currentRegion = baseRegion;
                    this.$store.commit('ui/updateProperty', {key: 'menu', value: 'details'});
                    this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                    this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                } else {
                    this.view.currentRegion = null;
                }
            }, false);
        },
        addHoverEvent() {
            this.canvas.addEventListener('mousemove', (event) => {
                const x = event.offsetX;
                const y = event.offsetY;
                const region = this.getRegionForPoint(x, y);
                if (region) {
                    this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: region.title});
                } else {
                    this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                }
            }, false);
        },
        getRegionForPoint(x, y) {
            const regions = getRegions(this.$store.state.ui.currentRegionType);
            let reversed = regions.slice().reverse();
            for (const region of reversed) {
                for (const path of region.paths) {
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
