<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import regionDetailsHead from "../main/regions/region-details/region-details-head";
    import numberTools from '@/tools/number';
    import positiveTests from "@/components/main/regions/region-details/tests/positive-tests";
    import changeTools from '@/tools/change';
    import administeredTests from "@/components/main/regions/region-details/tests/administered-tests";

    export default {
        name: 'region-details-change',
        components: {
            administeredTests,
            positiveTests,
            regionDetailsHead
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
            weeks() {
                return this.$store.state.settings.weeks;
            },
            change() {
                return this.regionOfFocus.getChange(this.view.offset, changeTools.daysBack);
            },
            formatChange() {
                return numberTools.formatChange(this.change);
            },
            factor() {
                return changeTools.getFactorForChange(this.change);
            },
            changeColor() {
                return changeTools.getColorForChange(this.change);
            },
            showDetails() {
                return this.$store.state.ui.menu === 'city';
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            showLateReportingWarning() {
                return this.region.hasLateReporting && this.region.getLatestReporting(this.view.offset) > this.view.offset;
            },
            getTotalRelativeIncreaseWeek() {
                return this.regionOfFocus.getIncreaseOfType(this.view.offset, 7, 'positiveTests', true);
            },
            getTotalRelativeIncreasePreviousWeek() {
                return this.regionOfFocus.getIncreaseOfType((this.view.offset + 7), 7, 'positiveTests', true);
            }
        },
        methods: {
            format(value, addPlus) {
                return numberTools.format(value, addPlus);
            }
        }
    }
</script>


<template>
    <div
        :class="{'panel--active': showDetails}"
        class="region-details-change region-details panel">
        <region-details-head
                :view="view"
                :region="regionOfFocus"/>
        <div class="region-details__info">
            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        {{translate('population', true)}}
                    </div>
                    <div class="region-details__value">
                        {{format(regionOfFocus.getTotalPopulation(), false)}}
                    </div>
                </div>
            </div>
            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        {{translate('relative', true)}} {{translate('increase')}} {{translate('for-7-days')}} {{translate('seven-days-back')}} ({{translate('per')}} 100.000 {{translate('inhabitants-short')}})
                    </div>
                    <div class="region-details__value">
                        {{format(Math.round(getTotalRelativeIncreasePreviousWeek))}}
                    </div>
                </div>
                <div class="region-details__row">
                    <div class="region-details__label">
                        {{translate('relative', true)}} {{translate('increase')}} {{translate('last-7-days')}}
                        <span v-if="showLateReportingWarning">*</span>
                    </div>
                    <div class="region-details__value">
                        {{format(Math.round(getTotalRelativeIncreaseWeek))}}
                    </div>
                </div>
            </div>
            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        {{translate('change', true)}}
                    </div>
                    <div class="region-details__value">
                        {{formatChange}}
                    </div>
                </div>
            </div>
            <div
                    v-if="showLateReportingWarning"
                    class="region-details__section">
                <div class="region-details__row">
                    * {{translate('late-reporting-warning', true)}}
                </div>
            </div>
            <div class="region-details__section">
                <div class="region-details__section-header">
                    {{translate('test-results', true)}}
                </div>
                <positive-tests
                    :view="view"
                    :region="regionOfFocus"
                    :weeks="3"
                    :map-type="'change'"/>

                <administered-tests
                    v-if="currentMap.settings.hasAdministeredTests"
                    :view="view"
                    :region="regionOfFocus"
                    :weeks="3"
                    :step-wide="true"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-change {

        .change-color {
            width: 20px;
            height: 20px;
            margin-left: 4px;
        }
    }
</style>