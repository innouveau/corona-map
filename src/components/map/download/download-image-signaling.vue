<script>
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";

    export default {
        name: 'download-image',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {

        },
        methods: {
            download() {
                this.prepair();
                this.addHead().then(() => {

                    this.addDate(this.view, 0.03, 0.22);
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