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
                typeLabel: ''
            }
        },
        computed: {},
        methods: {
            getSettings(i) {
                return {
                    width: 0.6 * this.width,
                    height: this.height,
                    shiftX: 0.5 * this.width + (20 * this.imageScale),
                    shiftY: 0.2 * this.height,
                    zoom: this.currentMap.settings.map.zoom * 400 * this.imageScale,
                    key: 'download-signaling-' + i,
                    fill: true
                }
            },
            download() {
                this.prepair();
                this.addHead().then(() => {

                    this.addDate(this.view, 0.03, 0.20);
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
        class="download-image icon-button">
        <img src="assets/img/tools/download.svg">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image {

    }
</style>