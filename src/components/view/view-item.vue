<script>
    import mapTests from "@/components/map/map";
    import headerMenu from "@/components/main/header-menu";
    import View from "@/classes/View";
    import regionDetailsShort from "@/components/main/regions/region-details/region-details-short";
    import viewTools from "./view-tools";

    export default {
        name: 'view-item',
        components: {
            viewTools,
            regionDetailsShort,
            headerMenu,
            mapTests,

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
                :view="view"/>
            <div class="view__map">
                <div
                    v-if="view.currentRegion"
                    class="region-details__container">
                    <region-details-short
                        :view="view"
                        :region="view.currentRegion"/>
                </div>

                <map-tests
                    :show-tools="showTools"
                    :show-legend="showLegend"
                    :view="view"/>
            </div>

        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .view-item {
        border-right: 1px solid #ddd;

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

                .map {
                    height: 100%;
                    width: 100%;
                }

                .region-details__container {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    width: 200px;
                    z-index: 1;

                    .region-details__row {
                        display: block;

                        .region-details__label {
                            width: 100%;
                        }

                        .region-details__value {
                            width: 100%;
                            text-align: left;
                        }
                    }
                }
            }
        }

        @include mobile() {

            .view__body {

                .view__map {

                    .map {
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