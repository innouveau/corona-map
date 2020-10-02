<script>
    import _Region from "@/classes/_Region";
    import View from "@/classes/View";

    import positiveTests from "./tests/positive-tests";
    import sewageTreatmentPlants from "./sewage-treatment-plants/sewage-treatment-plants";
    import ageDistributionGraph from "./case-characteristics/age-distribution-graph";
    import ageDistributionGraphNormalised from "./case-characteristics/age-distribution-graph-normalised/age-distribution-graph-normalised";
    import ageDistributionTools from "./case-characteristics/age-distribution-graph-normalised/age-distribution-tools";
    import regionRelations from "./../region-type/region-relations";
    import administeredTests from "./tests/administered-tests";
    import regionTrend from "./region-trend";
    import regionDetailsHead from "./region-details-head";
    import loader from "@/components/elements/loader";
    import regionDetailsNumbers from "./region-details-numbers";

    export default {
        name: 'region-details',
        components: {
            regionDetailsNumbers,
            regionDetailsHead,
            regionTrend,
            administeredTests,
            regionRelations,
            ageDistributionTools,
            ageDistributionGraphNormalised,
            loader,
            ageDistributionGraph,
            sewageTreatmentPlants,
            positiveTests
        },
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            showTrend() {
                return this.$store.state.signalingSystems.current.title === 'WHO' && this.currentMap.settings.testDataInterval === 1 ;
            },
            regionOfFocus() {
                return this.$store.getters['ui/getRegionOfFocus'](this.region);
            },
            showDetails() {
                return this.$store.state.ui.menu === 'city';
            },
            caseDataLoaded() {
                return this.$store.state.ui.caseDataLoaded;
            },
            caseDataRequested() {
                return this.$store.state.ui.caseDataRequested;
            },
            date() {
                return this.$store.getters['ui/dateString']();
            },
            hasSewageTreatmentPlants() {
                return this.$store.state.maps.current.settings.hasSewageTreatmentPlants;
            },
            hasAgeGroups() {
                return this.$store.state.maps.current.settings.hasAgeGroups;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            weeks() {
                return this.$store.state.settings.weeks;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :class="{'panel--active': showDetails}"
        class="region-details panel">
        <div class="region-card">
            <region-details-head
                :view="view"
                :region="regionOfFocus"/>

            <region-trend
                v-if="showTrend"
                :view="view"
                :region="regionOfFocus"
                :show-verdict="true"/>
        </div>

        <div class="region-details__info">
            <div class="region-details__section">
                <region-relations
                    :view="view"
                    :region="region"/>
            </div>

            <div
                v-if="hasAgeGroups && (regionOfFocus.regionType === 'ggd') && caseDataRequested"
                class="region-details__section">
                <div class="region-details__section-header">
                    {{translate('age-distribution', true)}}
                </div>
                <div class="age-distribution-graph__container">
                    <age-distribution-graph-normalised
                        v-if="caseDataLoaded"
                        :view="view"
                        :region="regionOfFocus"/>
                    <loader v-else/>
                </div>
                <age-distribution-tools
                    :view="view"/>
            </div>

            <region-details-numbers
                :view="view"
                :region="regionOfFocus"/>

            <div class="region-details__section">
                <div class="region-details__section-header">
                    {{translate('test-results', true)}}
                </div>
                <positive-tests
                    :view="view"
                    :region="regionOfFocus"
                    :weeks="weeks"/>

                <administered-tests
                        v-if="currentMap.settings.hasAdministeredTests"
                        :view="view"
                        :region="regionOfFocus"
                        :weeks="weeks"/>
            </div>

            <div
                    v-if="hasSewageTreatmentPlants"
                    class="region-details__section">
                <div class="region-details__row">
                    <sewage-treatment-plants
                        :view="view"
                        :region="regionOfFocus"/>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details {
        font-size: 15px;
        position: relative;

        .region-card {
            padding: 12px;
            box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
            margin-bottom: 20px;
            border-radius: 4px;
            background: #fff;
        }

        .region-details__info {

            .region-details__section {
                border-bottom: 1px solid #ddd;
                padding: 10px 0;

                .region-details__section-header {
                    font-weight: 700;
                    margin-bottom: 4px;
                }

                &:last-child {
                    border-bottom: 0;
                }
            }

            .region-details__row {
                display: flex;
                padding: 2px 0;

                .region-details__label {
                    width: 200px;
                }

                .region-details__value {
                    font-weight: 700;
                    font-family: $monospace;
                    font-size: 20px;
                    text-align: right;
                    width: calc(100% - 200px);
                    position: relative;
                }
            }
        }

        .age-distribution-graph__container {
            height: 352px;
            position: relative;
            background: #fff;
            margin-bottom: 12px;
        }

        @include mobile() {
            font-size: 12px;

            .region-details__header {
                margin-top: 16px;
            }

            .region-details__info {

                .region-details__row {

                    .region-details__label {
                        width: 160px;
                    }

                    .region-details__value {
                        font-size: 18px;
                        width: calc(100% - 160px);
                    }

                }
            }
        }
    }
</style>