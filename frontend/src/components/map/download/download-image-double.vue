<script>
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";
    import downloadImageMixin from './download-image-mixin';

    export default {
        name: 'download-image-double',
        components: {},
        props: {
            view1: {
                type: View,
                required: true
            },
            view2: {
                type: View,
                required: true
            }
        },
        mixins: [downloadImageMixin],
        data() {
            return {
                mapType: 'signaling',
                typeLabel: '-compare'
            }
        },
        computed: {},
        methods: {
            getSettings(index) {
                return {
                    width: 0.5 * this.width,
                    height: 0.8 * this.height,
                    shiftX: index === 0 ? 0 : 0.5 * this.width,
                    shiftY: 0.2 * this.height,
                    zoom: this.currentMap.settings.map.zoom * 400 * this.imageScale,
                    key: 'download-compare-' + index,
                    fill: true
                }
            },
            download() {
                this.prepair();
                this.addHead().then(() => {
                    let text = this.getDateString(this.view1) + ' - ' + this.getDateString(this.view2);
                    this.addCustomText(text,0.48, 0.12);
                    this.addLegend('signaling', true, 0.03, 0.18, this.view1.currentSource);
                    canvasTools.draw(this.ctx, this.view1.currentSource, this.regions, this.getSettings(0), this.view1.offset, this.mapType);
                    canvasTools.draw(this.ctx, this.view2.currentSource, this.regions, this.getSettings(1), this.view2.offset, this.mapType);
                    this.addCreator();
                    this.finish();
                });
            },

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