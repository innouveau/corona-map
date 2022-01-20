<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import numberTools from '@/tools/number';
    import sourceLoader from "./source-loader";
    import { getAbsoluteCumulativeForPeriod, getRelativeCumulativeForPeriod,
        getAbsoluteValueForDay, getRelativeValueForDay} from "@/tools/calculator";
    import {getReportingDelay} from "../../../../tools/calculator";

    export default {
        name: 'region-details-numbers',
        components: {
            sourceLoader,
         },
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            },
            compact: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            showLateReportingWarning() {
                return getReportingDelay(this.region, this.view.offset) > 0;
            },
            todayAbsolute() {
                return getAbsoluteValueForDay(this.region, this.view.offset, this.view.currentSource.key);
            },
            todayRelative() {
                return getRelativeValueForDay(this.region, this.view.offset, this.view.currentSource.key);
            },
            weekAbsolute() {
                return getAbsoluteCumulativeForPeriod(this.region, this.view.offset, (this.view.offset + 7), this.view.currentSource.key);
            },
            weekRelative() {
                return getRelativeCumulativeForPeriod(this.region, this.view.offset, (this.view.offset + 7), this.view.currentSource.key);
            }
        },
        methods: {
            format(value, addPlus) {
                return String(numberTools.format(Math.round(value), addPlus))
            }
        }
    }
</script>


<template>
    <div class="region-details-numbers">
        <div class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('population', true)}}
                </div>
                <div class="region-details__value">
                    {{format(region.totalPopulation, false)}}
                </div>
            </div>
        </div>

        <div
            v-if="!compact"
            class="region-details__section">
            <div class="region-details__section-head">
                {{translate('trend-today', true)}}
            </div>
            <div

                class="region-details__row">
                <div class="region-details__label">
                    {{translate('increase', true)}} {{translate('today')}}
                    <span v-if="showLateReportingWarning">*</span>
                </div>
                <div class="region-details__value">
                    {{format(todayAbsolute)}}
                    <span class="abs-rel abs-rel--big">abs</span>
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('relative', true)}} {{translate('increase')}} {{translate('today')}} ({{translate('per')}} 100.000 {{translate('inhabitants-short')}})
                    <span v-if="showLateReportingWarning">*</span>
                </div>
                <div class="region-details__value">
                    {{format(todayRelative, true)}}
                    <span class="abs-rel abs-rel--big">rel</span>
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div class="region-details__section-head">
                {{translate('trend-week', true)}}
            </div>
            <div
                v-if="!compact"
                class="region-details__row">
                <div class="region-details__label">
                    {{translate('increase', true)}} {{translate('last-7-days')}}
                    <span v-if="showLateReportingWarning">*</span>
                </div>
                <div class="region-details__value">
                    {{format(weekAbsolute, true)}}
                    <span class="abs-rel abs-rel--big">abs</span>
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('relative', true)}} {{translate('increase')}} {{translate('last-7-days')}} ({{translate('per')}} 100.000 {{translate('inhabitants-short')}})
                </div>
                <div class="region-details__value">
                    {{format(weekRelative, true)}}
                    <span class="abs-rel abs-rel--big">rel</span>
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div
                v-if="showLateReportingWarning"
                class="region-details__row">
                <div class="region-details__label">
                    * {{translate('late-reporting-warning', true)}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-numbers {

    }
</style>
