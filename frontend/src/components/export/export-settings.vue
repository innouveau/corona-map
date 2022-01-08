<script>
    import downloadImageMixin from '@/components/map/download/download-image-mixin';
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";

    export default {
        name: 'export-settings',
        components: {},
        mixins: [downloadImageMixin],
        props: {
            settings: {
                type: Object,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            downloadSettings() {
                return {
                    width: this.settings.width,
                    height: (this.settings.width / this.currentMap.settings.map.ratio),
                    shiftX: this.settings.shiftX,
                    shiftY: this.settings.shiftY,
                    zoom: this.currentMap.settings.map.zoom * 400 * this.settings.zoom,
                    key: 'custom-export',
                    fill: true,
                    borderStyle: '#f5eedc'
                }
            }
        },
        methods: {
            download() {
                let fileName = 'custom-export-' + this.currentMap.title + '-' + this.getDateStringdashes(this.view);
                this.prepair(this.settings.canvasWidth, this.settings.canvasHeight);
                this.addLegend('signaling', true, 1.5, 1.55);
                canvasTools.draw(this.ctx, this.view.currentSource, this.regions, this.downloadSettings, this.view, 'signaling');
                this.finish(fileName);
            },
        }
    }
</script>


<template>
    <div class="export-settings">
        <div class="export-settings__row">
            <div class="export-settings__label">
                Canvas width
            </div>
            <div class="export-settings__value">
                <input
                    v-model="settings.canvasWidth"
                    type="number"/>
            </div>
        </div>
        <div class="export-settings__row">
            <div class="export-settings__label">
                Canvas height
            </div>
            <div class="export-settings__value">
                <input
                    v-model="settings.canvasHeight"
                    type="number"/>
            </div>
        </div>
        <div class="export-settings__row">
            <div class="export-settings__label">
                Width
            </div>
            <div class="export-settings__value">
                <input
                    v-model="settings.width"
                    type="number"/>
            </div>
        </div>
        <div class="export-settings__row">
            <div class="export-settings__label">
                Shift X
            </div>
            <div class="export-settings__value">
                <input
                    v-model="settings.shiftX"
                    type="number"/>
            </div>
        </div>
        <div class="export-settings__row">
            <div class="export-settings__label">
                Shift Y
            </div>
            <div class="export-settings__value">
                <input
                    v-model="settings.shiftY"
                    type="number"/>
            </div>
        </div>
        <div class="export-settings__row">
            <div class="export-settings__label">
                Zoom
            </div>
            <div class="export-settings__value">
                <input
                    v-model="settings.zoom"
                    type="number"/>
            </div>
        </div>
        <div class="export-settings__row export-settings__row--button">
            <div
                @click="download()"
                class="button">
                Download image
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .export-settings {
        padding: 20px;
        height: 100%;
        overflow: auto;

        .export-settings__row {
            display: flex;
            align-items: center;
            margin-bottom: 2px;

            .export-settings__label {
                width: 160px;
            }

            &.export-settings__row--button {
                margin-top: 24px;
                justify-content: flex-end;
            }
        }
    }
</style>
