<script>
    import mapMixin from './map-mixin'
    import canvasTools from '@/tools/canvas';

    export default {
        name: 'map-change',
        components: {},
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
    <div class="map">
        <canvas :id="'canvas-' + id"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map {
        width: 100%;
        height: 100%;
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
    }
</style>