<script>
    import colorSetPicker from "./map-tools/color-set-picker";
    import signalingSystemPicker from "./map-tools/signaling-system-picker";
    import gradientToggle from "./map-tools/gradient-toggle";
    import vClickOutside from 'v-click-outside';

    export default {
        name: 'map-tools-popup',
        components: {
            colorSetPicker,
            signalingSystemPicker,
            gradientToggle
        },
        directives: {
            clickOutside: vClickOutside.directive
        },
        props: {},
        computed: {},
        methods: {
            close() {
                this.$store.commit('ui/updateProperty', {key: 'mapToolsPopup', value: false});
            }
        }
    }
</script>


<template>
    <div
        v-click-outside="close"
        class="map-tools-popup">
        <div class="map-tools-popup__section">
            <signaling-system-picker/>
        </div>
        <div class="map-tools-popup__section">
            <color-set-picker/>
        </div>
        <div class="map-tools-popup__section">
            <gradient-toggle/>
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

                &:hover,
                &.map-tools-popup__button--active {
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