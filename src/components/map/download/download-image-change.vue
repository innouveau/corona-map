<script>
    import canvasTools from '@/tools/canvas';
    import thresholdTools from '@/tools/thresholds';
    import View from "@/classes/View";

    export default {
        name: 'download-image-change',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            }
        },
        data() {
            return {
                typeLabel: ''
            }
        },
        computed: {},
        methods: {
            getSettings(i) {
                return {
                    width: this.width,
                    height: this.height,
                    shiftX: (220 * this.imageScale),
                    shiftY: 0,
                    zoom: this.currentMap.settings.map.zoom * 550 * this.imageScale,
                    key: 'download-compare-' + i,
                    fill: true
                }
            },
            download() {
                this.prepair();
                this.addHead().then(() => {

                    this.addDate(this.view, 0.03, 0.195);
                    canvasTools.draw(this.ctx, this.regions, this.getSettings(1), this.view.offset);
                    this.addCreator();
                    this.addLegend();
                    this.finish();
                });
            }
        }
    }
</script>


<template>
    <div
        @click="download()"
        class="download-image download-image-change icon-button">
        <img src="assets/img/tools/download.svg">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image-change {

    }
</style>