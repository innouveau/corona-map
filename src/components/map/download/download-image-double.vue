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
        computed: {},
        methods: {
            download() {
                this.prepair();
                this.addHead().then(() => {

                    this.addDate(this.view1, 0.03, 0.22);
                    this.addDate(this.view2, 0.53, 0.22);
                    //this.addLegend();
                    canvasTools.draw(this.ctx, this.regions, this.getSettings(1), this.view1.offset);
                    canvasTools.draw(this.ctx, this.regions, this.getSettings(2), this.view2.offset);
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