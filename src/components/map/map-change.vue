<script>
    import mapMixin from './map-mixin'
    import canvasTools from '@/tools/canvas';
    import pointerCanvas from "./pointer-canvas";
    import ChangeLegend from "./map-legend/change-legend";

    export default {
        name: 'map-change',
        components: {
            ChangeLegend,
            pointerCanvas
        },
        mixins: [mapMixin],
        props: {},
        data() {
            let id = Math.round(Math.random() * 1000000);
            return {
                id
            }
        },
        computed: {

        },
        methods: {
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
                canvasTools.draw(this.ctx, this.containerRegions, settings, this.view.offset, 'change');
            },
        }
    }
</script>


<template>
    <div class="map-change map">
        <canvas :id="'canvas-' + id"></canvas>
        <pointer-canvas
            :view="view"
            :width="width"
            :height="height"/>

        <change-legend/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-change {

    }
</style>