<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import numberTools from '@/tools/number';
    import dateTools from '@/tools/date';

    export default {
        name: 'region-details-numbers',
        components: { },
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            },
            short: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            hasDays() {
                return this.testDataInterval === 1;
            },
            showLateReportingWarning() {
                return this.region.hasLateReporting && this.region.getLatestReporting(this.view.offset) > this.view.offset;
            },
            testDataInterval() {
                return this.$store.state.maps.current.data.positivePcrTests.interval;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            hasHospitalisations() {
                return this.currentMap.data.hospitalisations.status;
            },
            hasDeceased() {
                return this.currentMap.data.deceased.status;
            },
            offsetOfJuly1() {
                return dateTools.getOffsetByDate('2020-07-01');
            },
            lengthToJuly1() {
                return this.offsetOfJuly1 - this.view.offset;
            },
            hospitalisationsPerPositiveTest() {
                let value = 100 * this.region.getTotalIncreaseOfType(this.view.offset, this.lengthToJuly1, 'hospitalisations', false) / this.region.getTotalIncreaseOfType(this.view.offset, this.lengthToJuly1, 'positiveTests', false);
                return this.formatPercentage(value, 1);
            },
            deceasedPerPositiveTest() {
                let value = 100 * this.region.getTotalIncreaseOfType(this.view.offset, this.lengthToJuly1, 'deceased', false) / this.region.getTotalIncreaseOfType(this.view.offset, this.lengthToJuly1, 'positiveTests', false);
                return this.formatPercentage(value, 1);
            }
        },
        methods: {
            format(value, addPlus) {
                return numberTools.format(Math.round(value), addPlus);
            },
            formatPercentage(value, d = 1) {
                return value.toFixed(d) + '%';
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
                    {{format(region.getTotalPopulation(), false)}}
                </div>
            </div>
        </div>

        <div
            v-if="hasDays && !short"
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
                    {{format(region.getTotalIncreaseOfType(view.offset, 1, view.currentSource.key, false), true)}} <span class="abs-rel abs-rel--big">abs</span>
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('relative', true)}} {{translate('increase')}} {{translate('today')}} ({{translate('per')}} 100.000 {{translate('inhabitants-short')}})
                    <span v-if="showLateReportingWarning">*</span>
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, 1, view.currentSource.key, true), true)}} <span class="abs-rel abs-rel--big">rel</span>
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div class="region-details__section-head">
                {{translate('trend-week', true)}}
            </div>
            <div
                v-if="!short"
                class="region-details__row">
                <div class="region-details__label">
                    {{translate('increase', true)}} {{translate('last-7-days')}}
                    <span v-if="showLateReportingWarning">*</span>
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, (7 / testDataInterval) , view.currentSource.key, false), true)}} <span class="abs-rel abs-rel--big">abs</span>
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('relative', true)}} {{translate('increase')}} {{translate('last-7-days')}} ({{translate('per')}} 100.000 {{translate('inhabitants-short')}})
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, (7 / testDataInterval), view.currentSource.key, true), true)}} <span class="abs-rel abs-rel--big">rel</span>
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div class="region-details__section-head">
                {{translate('total-since-day-1', true)}}
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('total-infections', true)}}
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, -1, 'positiveTests', false), false)}}
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('total-infections-percentage-of-population', true)}}
                </div>
                <div class="region-details__value">
                    {{formatPercentage(region.getTotalAsPercentageOfPopulation(view.offset, 'positiveTests', false), 1)}}
                </div>
            </div>
            <div
                v-if="hasHospitalisations"
                class="region-details__row">
                <div class="region-details__label">
                    {{translate('total-hospitalisations', true)}}
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, -1, 'hospitalisations', false), false)}}
                </div>
            </div>
            <div
                v-if="hasDeceased"
                class="region-details__row">
                <div class="region-details__label">
                    {{translate('total-deceased', true)}}
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, -1, 'deceased', false), false)}}
                </div>
            </div>
        </div>
        <div
            v-if="hasHospitalisations"
            class="region-details__section">
            <div class="region-details__section-head">
                {{translate('ratios-since-july-1', true)}}
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('hospitalisations-per-positive-test', true)}}
                </div>
                <div class="region-details__value">
                    {{hospitalisationsPerPositiveTest}}
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('deceased-per-positive-test', true)}}
                </div>
                <div class="region-details__value">
                    {{deceasedPerPositiveTest}}
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