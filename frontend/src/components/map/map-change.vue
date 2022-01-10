<script>
    import mapMixin from '@/components/_map/map-mixin.js'
    import canvasTools from '@/tools/canvas';
    import pointerCanvas from "./pointer-canvas";
    import ChangeLegend from "@/components/_map/legend/change-legend";
    import downloadImageChange from "./download/download-image-change";
    import regionTypePicker from "@/components/_map/region-type/region-type-picker";

    export default {
        name: 'map-change',
        components: {
            downloadImageChange,
            ChangeLegend,
            pointerCanvas,
            regionTypePicker
        },
        mixins: [mapMixin],
        props: {},
        data() {
            let id = Math.round(Math.random() * 1000000);
            return {
                id,
            }
        },
        computed: {
            hasSourcePicker() {
                return false;
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
                canvasTools.draw(this.ctx, this.view.currentSource, this.containerRegions, settings, this.view, 'change');
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

        <download-image-change
            :view="view"/>

        <change-legend/>

        <region-type-picker
            v-if="hasRegionTypePicker"
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-change {

    }
</style>
