<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import numberTools from '@/tools/number';

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
            }
        },
        methods: {
            format(value, addPlus) {
                return numberTools.format(Math.round(value), addPlus);
            },
            formatPercentage(value) {
                return value.toFixed(1) + '%';
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

        <div class="region-details__section">
            <div
                v-if="hasDays && !short"
                class="region-details__row">
                <div class="region-details__label">
                    {{translate('increase', true)}} {{translate('today')}}
                    <span v-if="showLateReportingWarning">*</span>
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, 1, view.currentSource.key, false), true)}}
                </div>
            </div>
            <div v-if="hasDays && !short" class="region-details__row">
                <div class="region-details__label">
                    {{translate('relative', true)}} {{translate('increase')}} {{translate('today')}} ({{translate('per')}} 100.000 {{translate('inhabitants-short')}})
                    <span v-if="showLateReportingWarning">*</span>
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, 1, view.currentSource.key, true), true)}}
                </div>
            </div>
            <div
                v-if="!short"
                class="region-details__row">
                <div class="region-details__label">
                    {{translate('increase', true)}} {{translate('last-7-days')}}
                    <span v-if="showLateReportingWarning">*</span>
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, (7 / testDataInterval) , view.currentSource.key, false), true)}}
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('relative', true)}} {{translate('increase')}} {{translate('last-7-days')}} ({{translate('per')}} 100.000 {{translate('inhabitants-short')}})
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, (7 / testDataInterval), view.currentSource.key, true), true)}}
                </div>
            </div>
        </div>
        <div
            v-if="view.currentSource.key === 'positiveTests'"
            class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('total-infections', true)}}
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseOfType(view.offset, -1, view.currentSource.key, false), false)}}
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('total-infections-percentage-of-population', true)}}
                </div>
                <div class="region-details__value">
                    {{formatPercentage(region.getTotalAsPercentageOfPopulation(view.offset, view.currentSource.key), false)}}
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