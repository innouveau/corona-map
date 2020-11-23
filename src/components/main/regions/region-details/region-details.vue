<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";

    import positivePcrTests from "@/components/graphs/positive-pcr-tests";
    import administeredPcrTests from "@/components/graphs/administered-pcr-tests"
    import sewageTreatmentPlants from "./sewage-treatment-plants/sewage-treatment-plants";
    import ageDistributionGraph from "./case-characteristics/age-distribution-graph";
    import ageDistributionGraphNormalised from "./case-characteristics/age-distribution-graph-normalised/age-distribution-graph-normalised";
    import ageDistributionTools from "./case-characteristics/age-distribution-graph-normalised/age-distribution-tools";
    import regionRelations from "./../region-type/region-relations";
    import regionDetailsHead from "./region-details-head";
    import loader from "@/components/elements/loader";
    import regionDetailsNumbers from "./region-details-numbers";

    export default {
        name: 'region-details',
        components: {
            regionDetailsNumbers,
            regionDetailsHead,
            administeredPcrTests,
            regionRelations,
            ageDistributionTools,
            ageDistributionGraphNormalised,
            loader,
            ageDistributionGraph,
            sewageTreatmentPlants,
            positivePcrTests
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
                return this.$store.state.maps.current.data.sewageMeasurements.status;
            },
            hasAgeGroups() {
                return this.$store.state.maps.current.data.ageGroups.status;
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
        </div>

        <div class="region-details__section">
            <positive-pcr-tests
                    :view="view"
                    :region="regionOfFocus"
                    :frames-before="(weeks * 7)"/>

            <administered-pcr-tests
                    v-if="currentMap.data.administeredPcrTests.status"
                    :view="view"
                    :region="regionOfFocus"
                    :frames-before="(weeks * 7)"/>
        </div>

        <div class="region-details__info">
            <div class="region-details__section">
                <region-relations
                    :view="view"
                    :region="region"/>
            </div>

            <div
                v-if="hasAgeGroups && (regionOfFocus.regionType === 'ggd' || regionOfFocus.regionType === 'country') && caseDataRequested"
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

<!--            <div-->
<!--                    v-if="hasSewageTreatmentPlants"-->
<!--                    class="region-details__section">-->
<!--                <div class="region-details__row">-->
<!--                    <sewage-treatment-plants-->
<!--                        :view="view"-->
<!--                        :region="regionOfFocus"/>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details {
        font-size: 15px;
        position: relative;

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

    .region-details__section {
        border-bottom: 2px solid #000;
        padding: 10px 0;

        .region-details__section-header {
            font-weight: 700;
            margin-bottom: 4px;
        }

        .region-details__row {
            display: flex;
            padding: 8px 0;
            border-bottom: 1px dashed #555;
            line-height: 1.1;

            &:last-child {
                border-bottom: 0;
            }

            .region-details__label {
                width: 250px;
                display: flex;
                align-items: center;
            }

            .region-details__value {
                font-weight: 700;
                font-family: $monospace;
                font-size: 20px;
                width: calc(100% - 250px);
                position: relative;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }

        &:last-child {
            border-bottom: 0;
        }
    }
</style>