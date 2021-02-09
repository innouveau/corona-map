<script>
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";
    import downloadImageMixin from './download-image-mixin';

    export default {
        name: 'download-image-hospitalisations',
        components: {},
        props: {
            views: {
                type: Array,
                required: true
            }
        },
        mixins: [downloadImageMixin],
        computed: {
            typeLabel() {
                return '-hospitalisations-' + this.getDateStringdashes(this.views[0]);
            }
        },
        methods: {
            getSettings(index) {
                return {
                    width: (1/3) * this.width,
                    height: 0.8 * this.height,
                    shiftX: (index * (1/3) + 0.01) * this.width,
                    shiftY: 0.2 * this.height,
                    zoom: this.currentMap.settings.map.zoom * 350 * this.imageScale,
                    key: 'download-hospitalisations-' + index,
                    fill: true
                }
            },
            download() {
                this.prepair();
                this.addHead().then(() => {
                    this.addDate(this.views[0], 0.48, 0.12, false);
                    for (let i = 0; i < 3; i++) {
                        canvasTools.draw(this.ctx, this.views[i].currentSource, this.regions, this.getSettings(i), this.views[i].offset, 'signaling');
                        this.addLegend('signaling', true, ((i/3) + 0.03), 0.18, this.views[i].currentSource);
                    }
                    this.addCreator();
                    this.finish();
                });
            }
        }
    }
</script>


<template>
    <div
        @click="download()"
        class="download-image download-image-hospitalisations icon-button">
        <img src="assets/img/tools/download.svg">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image-hospitalisations {

    }
</style>