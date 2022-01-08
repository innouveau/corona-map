<script>
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";
    import downloadImageMixin from './download-image-mixin';

    export default {
        name: 'download-image-change',
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
                mapType: 'change'
            }
        },
        computed: {
            typeLabel() {
                return '-change-' + this.getDateStringdashes(this.view);
            }
        },
        methods: {
            getSettings(index, key) {
                return {
                    width: 0.5 * this.width,
                    height: 0.8 * this.height,
                    shiftX: index === 0 ? 0 : 0.5 * this.width,
                    shiftY: 0.2 * this.height,
                    zoom: this.currentMap.settings.map.zoom * 400 * this.imageScale,
                    key: 'download-' + key,
                    fill: true
                }
            },
            download() {
                this.prepair();
                this.addHead().then(() => {
                    this.addDate(this.view, 0.51, 0.12, false);
                    canvasTools.draw(this.ctx, this.view.currentSource, this.regions, this.getSettings(0, 'signaling'), this.view, 'signaling');
                    canvasTools.draw(this.ctx, this.view.currentSource, this.regions, this.getSettings(1, 'change'), this.view, 'change');
                    this.addCreator();
                    this.addLegend('signaling', true, 0.03, 0.18, this.view.currentSource);
                    this.addLegend('change', null, 0.57, 0.18);
                    this.finish();
                });
            },
            download2() {
                this.prepair();
                this.addHead().then(() => {
                    this.addDate(this.view, 0.03, 0.195);
                    canvasTools.draw(this.ctx, this.regions, this.getSettings(1), this.view, this.mapType);
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
