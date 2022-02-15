<script>
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";

    export default {
        name: 'pointer-canvas',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            },
        },
        data() {
            return {
                id: Math.round(Math.random() * 1000000)
            }
        },
        computed: {
            canvas() {
                return document.getElementById('pointer-canvas-' + this.id);
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            hoverValue() {
                return this.$store.state.ui.hoverValue;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            currentRegion() {
                return this.$store.getters['ui/getRegionOfFocus'](this.view.currentRegion);
            },
            sizes() {
                return this.$store.state.settings.sizes;
            },
            navigation() {
                return this.$store.state.settings.navigation;
            },
            mapRenderKey() {
                return 'map-' + this.sizes.canvas.width + '-' + this.navigation.zoom + this.navigation.position.x + '-' + this.navigation.position.y;
            }
        },
        methods: {
            showCurrentRegion() {
                console.log("!");
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
                    canvasTools.drawRegionContainer(this.ctx, this.currentRegion, settings, "transparent");
                }
            },
            clear() {
                this.ctx.clearRect(0, 0, this.sizes.container.width, this.sizes.container.height);
            }
        },
        watch: {
            currentRegion: function () {
                this.showCurrentRegion();
            }
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
