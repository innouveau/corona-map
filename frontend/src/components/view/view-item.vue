<script>
    import mapSignaling from "@/components/_map/Map";
    import headerMenu from "@/components/_pages/header/header-menu";
    import View from "@/classes/View";
    import regionDetailsShort from "@/components/_pages/main/details/region-details-short";
    import viewTools from "./view-tools";

    export default {
        name: 'view-item',
        components: {
            viewTools,
            regionDetailsShort,
            headerMenu,
            mapSignaling,
        },
        props: {
            view: {
                type: View,
                required: true
            },
            showLegend: {
                type: Boolean,
                required: true
            },
            showTools: {
                type: Boolean,
                required: true
            },
            showTimeTools: {
                type: Boolean,
                required: false,
                default: false
            },
            showDownload: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        computed: {
            offset() {
                return this.view.offset;
            }
        },
        methods: {},
        watch: {
            offset() {
                this.$parent.updateQuery();
            }
        }
    }
</script>


<template>
    <div class="view-item">
        <div class="view__header">
            <header-menu
                :view="view"
                :editable="false"/>
        </div>
        <div class="view__body">
            <view-tools
                :view="view"
                :show-time-tools="showTimeTools"/>
            <div class="view__map">
                <div
                    v-if="view.currentRegion"
                    class="region-details__container">
                    <region-details-short
                        :view="view"
                        :region="view.currentRegion"/>
                </div>

                <map-signaling
                    :show-tools="showTools"
                    :show-legend="showLegend"
                    :show-download="showDownload"
                    :view="view"/>
            </div>

        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .view-item {
        border-right: 1px solid #ddd;
        background: $map-color;

        &:last-child {
            border-right: 0;
        }

        .view__header {
            height: 48px;

            .header-menu {
                height: 100%;
            }
        }

        .view__body {
            height: calc(100% - 48px);

            .view__map {
                height: calc(100% - 56px);
                padding: 8px;
                position: relative;

                .Map {
                    height: 100%;
                    width: 100%;
                }

                .region-details__container {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    width: 200px;
                    z-index: 10;

                    .region-card {
                        padding: 12px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                        border-radius: 6px;
                        background: #FDFCF8;

                        .region-details__section {
                            padding: 6px 0;

                            .region-details__row {

                                .region-details__label {
                                    width: 60%;
                                    font-size: 11px;
                                }

                                .region-details__value {
                                    width: 40%;
                                    font-size: 13px;
                                }
                            }
                        }
                    }
                }
            }
        }

        @include mobile() {

            .view__body {

                .view__map {

                    .Map {
                        width: 100%;
                    }

                    .region-details__container {
                        display: none;
                    }
                }
            }
        }
    }
</style>
