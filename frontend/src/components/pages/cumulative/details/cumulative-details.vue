<script>
import _Region from "@/classes/region/_Region";
import View from "@/classes/View";
import { getCumulativeForPeriod } from "@/tools/calculator";
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
            type: _Region,
            required: true
        }
    },
    computed: {
        total() {
            const start = this.view.offset;
            const end = this.view.offsetStart;
            return getCumulativeForPeriod(this.region, start, end, this.view.currentSource.key, false);
        },
        totalFormatted() {
            return numberTools.format(this.total, false);
        },
        relative() {
            return Math.round(1000 * this.total / this.region.totalPopulation) / 10 + "%";
        },
        date1() {
            return this.$store.getters['ui/getDateByOffset'](this.view.offsetStart, 'd/MM/yyyy');
        },
        date2() {
            return this.$store.getters['ui/getDateByOffset'](this.view.offset, 'd/MM/yyyy');
        }
    },
    methods: {}
}
</script>


<template>
    <div class="cumulative-details">
        <div class="region-details__section">
             {{total}}
        </div>
        <div class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('period', true)}}
                </div>
                <div class="region-details__value">
                    {{date1}} <br> {{date2}}
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('total', true)}}
                </div>
                <div class="region-details__value">
                    {{totalFormatted}}
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    {{translate('relative', true)}}
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
