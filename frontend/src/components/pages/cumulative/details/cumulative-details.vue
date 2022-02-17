<script>
import Region from "@/classes/region/Region";
import View from "@/classes/View";
import { getAbsoluteCumulativeForPeriod } from "@/tools/calculator";
import numberTools from '@/tools/number';

export default {
    name: 'cumulative-details',
    components: {},
    props: {
        view: {
            type: View,
            required: true
        },
        region: {
            type: Object,
            required: true
        }
    },
    computed: {
        total() {
            const start = this.view.offset;
            const end = this.view.offsetStart;
            return getAbsoluteCumulativeForPeriod(this.region, start, end, this.view.currentSource.key);
        },
        totalFormatted() {
            return numberTools.format(this.total, false);
        },
        relative() {
            return Math.round(1000 * this.total / this.region.totalPopulation) / 10 + "%";
        },
        date1() {
            return this.$store.getters['ui/getDateByOffset'](this.view.offsetStart, 'dd/MM/yyyy');
        },
        date2() {
            return this.$store.getters['ui/getDateByOffset'](this.view.offset, 'dd/MM/yyyy');
        }
    },
    methods: {
        format(value, addPlus) {
            return String(numberTools.format(Math.round(value), addPlus))
        },
    }
}
</script>


<template>
    <div class="cumulative-details">
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
        <div class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('period', true)}}
                </div>
                <div class="region-details__value">
                    {{date1}}<br>{{date2}}
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('total', true)}} {{translate(view.currentSource.key)}} {{translate('in-period')}}
                </div>
                <div class="region-details__value">
                    {{totalFormatted}}
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('part-of-population', true)}}
                </div>
                <div class="region-details__value">
                    {{relative}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.cumulative-details {

}
</style>
