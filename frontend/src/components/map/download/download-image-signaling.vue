<script>
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";
    import downloadImageMixin from './download-image-mixin';

    export default {
        name: 'download-image',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            }
        },
        mixins: [downloadImageMixin],
        data() {
            return {
                mapType: 'signaling'
            }
        },
        computed: {
            typeLabel() {
                return '-' + this.getDateStringdashes(this.view);
            }
        },
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
                    canvasTools.draw(this.ctx, this.view.currentSource, this.regions, this.getSettings(1), this.view, this.mapType);
                    this.addCreator();
                    this.addLegend('signaling', this.gradient, 0.03, 0.28, this.view.currentSource);
                    this.finish();
                });
            }
        }
    }
</script>


<template>
    <div
        @click="download()"
        class="download-image icon-button">
        <img src="assets/img/tools/download.svg">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image {

    }
</style>
