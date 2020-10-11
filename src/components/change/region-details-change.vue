<script>
    import _Region from "@/classes/_Region";
    import View from "@/classes/View";
    import regionDetailsHead from "../main/regions/region-details/region-details-head";
    import numberTools from '@/tools/number';

    export default {
        name: 'region-details-change',
        components: {
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
                        {{translate('relative', true)}} {{translate('increase')}} {{translate('today')}} ({{translate('per')}} 100.000 {{translate('inhabitants-short')}})
                    </div>
                    <div class="region-details__value">
                        {{format(Math.round(regionOfFocus.getTotalRelativeIncreaseWeek(view.offset)))}}
                    </div>
                </div>
            </div>
            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        Increase 7 dagen terug
                    </div>
                    <div class="region-details__value">
                        {{format(Math.round(regionOfFocus.getTotalRelativeIncreaseWeek((view.offset + 7))))}}
                    </div>
                </div>
                <div class="region-details__row">
                    <div class="region-details__label">
                        Change
                    </div>
                    <div class="region-details__value">
                        × {{regionOfFocus.getChange(view.offset, 7).toFixed(2)}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-change {

    }
</style>