<script>
    import mapTests from "@/components/map/map";
    import headerMenu from "@/components/main/header-menu";
    import View from "@/classes/View";
    import regionDetailsShort from "@/components/main/regions/region-details/region-details-short";
    import compareTools from "./compare-tools";

    export default {
        name: 'compare-item',
        components: {
            compareTools,
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
            }
        },
        computed: {

        },
        methods: {
            updateQuery() {
                this.$parent.updateQuery();
            }
        }
    }
</script>


<template>
    <div class="compare-item">
        <div class="compare__header">
            <header-menu
                :view="view"
                :editable="false"/>
        </div>
        <div class="compare__body">
            <compare-tools
                :view="view"/>
            <div class="compare__map">
                <div
                    v-if="view.currentRegion"
                    class="region-details__container">
                    <region-details-short
                        :view="view"
                        :region="view.currentRegion"/>
                </div>

                <map-tests
                    :show-tools="false"
                    :show-legend="showLegend"
                    :view="view"/>
            </div>

        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .compare-item {
        border-right: 1px solid #ddd;

        &:last-child {
            border-right: 0;
        }

        .compare__header {
            height: 48px;

            .header-menu {
                height: 100%;
            }
        }

        .compare__body {
            height: calc(100% - 48px);

            .compare__map {
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

            .compare__body {

                .compare__map {

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