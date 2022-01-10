<script>
    import mapMixin from '@/components/_map/map-mixin.js'
    import pointerCanvas from "./../pointer-canvas";
    import regionTypePicker from "@/components/_map/region-type/region-type-picker";
    import canvasTools from '@/tools/canvas';
    import MapSourcePicker from "@/components/_map/source/map-source-picker";

    export default {
        name: 'map-cumulative',
        components: {
            MapSourcePicker,
            pointerCanvas,
            regionTypePicker
        },
        mixins: [mapMixin],
        props: {},
        data() {
            const id = Math.round(Math.random() * 1000000);
            return {
                id,
            }
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
                canvasTools.draw(this.ctx, this.view.currentSource, this.containerRegions, settings, this.view, 'cumulative');
            }
        }
    }
</script>


<template>
    <div class="map-cumulative map">
        <canvas :id="'canvas-' + id"></canvas>
        <pointer-canvas
            :view="view"
            :width="width"
            :height="height"/>

        <map-source-picker
            v-if="hasSourcePicker"
            :view="view"/>

        <region-type-picker
            v-if="hasRegionTypePicker"
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-cumulative {

    }
</style>
