<script>
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";
    import mapMixin from "./map-mixin.js";
    import { getCurrentRegion } from "@/tools/relations";

    export default {
        name: 'pointer-canvas',
        components: {},
        mixins: [mapMixin],
        props: {
            view: {
                type: View,
                required: true
            },
        },
        computed: {
            hoverValue() {
                return this.$store.state.ui.hoverValue;
            },
            currentRegion() {
                return getCurrentRegion(this.view.currentRegion);
            },
            canvas() {
                return document.getElementById('pointer-canvas-' + this.id);
            },
        },
        methods: {
            showCurrentRegion() {
                this.clear();
                if (this.currentRegion) {
                    this.ctx.strokeStyle = '#fff';
                    const settings = {
                        key: this.mapRenderKey,
                        container: this.sizes.container,
                        canvas: this.sizes.canvas,
                        scale: this.$store.state.settings.scale,
                        map: this.currentMap.settings.map,
                        navigation: this.navigation,
                        fill: false,
                        border: true,
                        shiftPrint: {
                            x: 0,
                            y: 0
                        }
                    }
                    canvasTools.drawRegion(this.ctx, this.currentRegion, settings, "transparent");
                }
            },
        },
        watch: {
            currentRegion: function () {
                this.showCurrentRegion();
            },
        }
    }
</script>


<template>
    <canvas
        :id="'pointer-canvas-' + id"
        class="pointer-canvas"
        :width="sizes.container.width"
        :height="sizes.container.height" />
</template>


<style lang="scss" scoped>
    @import '@/styles/variables.scss';

    canvas {
        pointer-events: none;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
    }
</style>
