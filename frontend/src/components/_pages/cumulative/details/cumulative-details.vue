<script>
import _Region from "@/classes/region/_Region";
import View from "@/classes/View";
import { getIncreaseOfType } from "@/tools/calculator";
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
            const historyLength = this.$store.state.settings.historyLength;
            const start = historyLength - this.view.offsetStart;
            const end = historyLength - this.view.offset;
            return getIncreaseOfType(this.region, start, end, this.view.currentSource.key, false);
        },
        totalFormatted() {
            return numberTools.format(this.total, false);
        },
        relative() {
            return Math.round(1000 * this.total / this.region.totalPopulation) / 10 + "%";
        },
        date1() {
            return this.$store.getters['ui/getDateByOffset'](this.view.offsetStart);
        },
        date2() {
            return this.$store.getters['ui/getDateByOffset'](this.view.offset);
        }
    },
    methods: {}
}
</script>


<template>
    <div class="cumulative-details">
        <div class="region-details__section">
            {{date1}} - {{date2}}
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
