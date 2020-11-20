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
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
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
            settings() {
                return {
                    key: 'map-' + this.$store.state.settings.canvasWidth,
                    width: this.$store.state.settings.canvasWidth,
                    height: this.$store.state.settings.canvasHeight,
                    shiftX: 0,
                    shiftY: 0,
                    zoom: this.$store.state.settings.zoom,
                    fill: false
                }
            }
        },
        methods: {
            showCurrentRegion() {
                this.clear();
                if (this.currentRegion) {
                    this.ctx.strokeStyle = '#fff';
                    canvasTools.drawRegionContainer(this.ctx, this.currentRegion, this.settings, this.view.offset);
                }
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
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
        :width="width"
        :height="height"></canvas>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .pointer-canvas {
        pointer-events: none;
    }
</style>