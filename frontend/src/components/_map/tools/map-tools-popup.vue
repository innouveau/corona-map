<script>
    import colorSetPicker from "./color-set-picker";
    import signalingSystemPicker from "./signaling-system-picker";
    import gradientToggle from "./gradient-toggle";
    import vClickOutside from 'v-click-outside';
    import downloadImageMixin from '@/components/_old/download/download-image-mixin';
    import canvasTools from '@/tools/canvas';
    import View from "@/classes/View";

    export default {
        name: 'map-tools-popup',
        components: {
            colorSetPicker,
            signalingSystemPicker,
            gradientToggle
        },
        mixins: [downloadImageMixin],
        directives: {
            clickOutside: vClickOutside.directive
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            isFreeSignalingSystem() {
                return this.$store.state.signalingSystems.current.id === 4;
            }
        },
        methods: {
            close() {
                this.$store.commit('ui/updateProperty', {key: 'mapToolsPopup', value: false});
            },
            getSettings() {
                return {
                    width: this.width,
                    height: this.height,
                    shiftX: 0,
                    shiftY: 0,
                    zoom: this.currentMap.settings.map.zoom * 550 * this.imageScale,
                    key: 'download-frame',
                    fill: true,
                    hideStroke: false
                }
            },
            exportFrames() {
                let waitTime, index;
                waitTime = 10;
                index = 1;
                this.prepair();

                const next = () => {
                    setTimeout(() => {
                        draw();
                    }, waitTime)
                };

                const draw = () => {
                    canvasTools.draw(this.ctx, this.view.currentSource, this.regions, this.getSettings(), this.$parent.view, 'signaling', false);
                    this.finish('frame-' + index).then(()=>{
                        if (this.$parent.view.offset > 0) {
                            this.$parent.view.offset--;
                            index++;
                            next();
                        }
                    });

                };

                draw();
            }
        }
    }
</script>


<template>
    <div
        v-click-outside="close"
        class="map-tools-popup">
        <div class="map-tools-popup__section">
            <signaling-system-picker
                :view="view"/>
        </div>
<!--        <div-->
<!--            v-if="!isFreeSignalingSystem"-->
<!--            class="map-tools-popup__section">-->
<!--            <color-set-picker/>-->
<!--        </div>-->
        <div class="map-tools-popup__section">
            <gradient-toggle/>
        </div>
        <div class="map-tools-popup__section">
            <div
                @click="exportFrames()"
                class="map-tools-popup__button">
                <div class="map-tools-popup__title">
                    Export frames
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-tools-popup {
        width: 220px;
        max-height: 300px;
        overflow: auto;
        background: #fff;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
        border-radius: 3px;

        .map-tools-popup__section {
            border-bottom: 1px solid #ddd;
            padding: 8px;

            .map-tools-popup__head {
                font-weight: 700;
                margin-bottom: 4px;
            }

            .map-tools-popup__body {
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                border-top: 1px solid #ddd;
            }

            .map-tools-popup__button {
                border-bottom: 1px solid #ddd;
                cursor: pointer;
                height: 24px;
                display: flex;

                .map-tools-popup__checkmark {
                    width: 24px;
                    height: 100%;
                    padding: 4px;

                    img {
                        width: 100%;
                        height: 100%;
                        display: none;
                    }
                }

                .map-tools-popup__title {
                    width: calc(100% - 24px);
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding: 0 6px;
                }

                &:hover {
                    background: #ddd;
                }

                &.map-tools-popup__button--active {

                    .map-tools-popup__checkmark {

                        img {
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>
