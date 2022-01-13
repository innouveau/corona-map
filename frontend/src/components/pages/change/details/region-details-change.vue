<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import numberTools from '@/tools/number';
    import changeTools from '@/tools/change';
    import positivePcrTestsChange from "@/components/graphs/positive-pcr-tests-change";
    import {getChangeOfType, getRelativeCumulativeForPeriod} from "@/tools/calculator";

    export default {
        name: 'region-details-change',
        components: {
            positivePcrTestsChange,
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
                return getChangeOfType(this.regionOfFocus, this.view.offset, 7, this.view.currentSource.key);
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
                return getRelativeCumulativeForPeriod(this.regionOfFocus, this.view.offset, this.view.offset + 7, this.view.currentSource.key)
            },
            getTotalRelativeIncreasePreviousWeek() {
                return getRelativeCumulativeForPeriod(this.regionOfFocus, this.view.offset + 7, this.view.offset + 14, this.view.currentSource.key)
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
        class="region-details-change region-details">
        <div class="region-details__info">
            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        {{translate('population', true)}}
                    </div>
                    <div class="region-details__value">
                        {{format(regionOfFocus.totalPopulation, false)}}
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
                <positive-pcr-tests-change
                    :view="view"
                    :region="regionOfFocus"
                    :frames-before="21"/>
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
