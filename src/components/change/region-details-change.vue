<script>
    import _Region from "@/classes/_Region";
    import View from "@/classes/View";
    import regionDetailsHead from "../main/regions/region-details/region-details-head";
    import numberTools from '@/tools/number';
    import positiveTests from "@/components/main/regions/region-details/tests/positive-tests";
    import changeTools from '@/tools/change';

    export default {
        name: 'region-details-change',
        components: {
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
    <div class="region-details-change region-details panel">
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
                        {{format(Math.round(regionOfFocus.getTotalRelativeIncreaseWeek((view.offset + 7))))}}
                    </div>
                </div>
                <div class="region-details__row">
                    <div class="region-details__label">
                        {{translate('relative', true)}} {{translate('increase')}} {{translate('last-7-days')}}
                    </div>
                    <div class="region-details__value">
                        {{format(Math.round(regionOfFocus.getTotalRelativeIncreaseWeek(view.offset)))}}
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
            <div class="region-details__section">
                <div class="region-details__section-header">
                    {{translate('test-results', true)}}
                </div>
                <positive-tests
                    :view="view"
                    :region="regionOfFocus"
                    :weeks="2"/>
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