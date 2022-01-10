<script>
    import View from "@/classes/View";
    import exportSettings from "./export-settings";
    import mapSignaling from "@/components/_map/maps/Map";
    import timeSlider from "../view/time-slider";

    export default {
        name: 'export',
        components: {
            timeSlider,
            mapSignaling,
            exportSettings
        },
        props: {},
        data() {
            return {
                settings: {
                    canvasWidth: 1920,
                    canvasHeight: 1080,
                    width: 900,
                    shiftX: 550,
                    shiftY: 250,
                    zoom: 3
                },
                view: new View({}),
                scale: 3
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            height() {
                return (this.settings.width / this.currentMap.settings.map.ratio) / this.scale;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="export">
        <div class="export__map-container">
            <time-slider :view="view"/>
            <div
                :style="{'width': (settings.canvasWidth / scale) + 'px', 'height': (settings.canvasHeight / scale) + 'px'}"
                class="export__paper">
                <div
                    :style="{
                        'width': (settings.width / scale) + 'px',
                        'height': height + 'px',
                        'left': (settings.shiftX / scale) + 'px',
                        'top': (settings.shiftY / scale) + 'px',
                    }"
                    class="export__map">
                    <map-signaling
                        :show-tools="false"
                        :show-legend="false"
                        :view="view"
                        :show-download="false"/>
                </div>
            </div>
        </div>

        <export-settings
            :view="view"
            :settings="settings"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .export {
        height: 100%;
        display: flex;

        .export__map-container {
            height: 100%;
            width: calc(100% - 400px);
            position: relative;
            padding: 40px 20px;
            background: #ddd;

            .time-slider {
            }

            .export__paper {
                background: $map-color;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                position: absolute;
                left: 20px;
                top: 80px;

                .export__map {
                    position: absolute;
                    border: 1px dotted #000;

                    .Map {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .export-settings {
            width: 400px;
        }
    }
</style>
