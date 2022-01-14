<script>
import View from "@/classes/View";
import CumulativeTrendsRegion from "./cumulative-trends-region";
import { getRelativeCumulativeForPeriod } from "@/tools/calculator";

export default {
    name: 'cumulative-trends',
    components: {
        CumulativeTrendsRegion
    },
    props: {
        view: {
            type: View,
            required: true
        }
    },
    computed: {
        list() {
            const regions = this.$store.getters['ui/regions'];
            return regions.map(region => {
                const start = this.view.offset;
                const end = this.view.offsetStart;
                return {
                    region,
                    value: getRelativeCumulativeForPeriod(region, start, end, this.view.currentSource.key)
                }
            }).sort((a,b) => {
                return b.value - a.value;
            });
        },
        highest() {
            return this.list.slice(0,10);
        },
        lowest() {
            const reversed = this.list.reverse();
            return reversed.slice(0,10);
        }
    },
    methods: {
        select(region) {
            if (region.regionType === 'city' || region.regionType === 'district') {
                this.view.currentRegion = region;
            }
            this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
        }
    }
}
</script>


<template>
    <div class="cumulative-trends trends">
        <div class="trends-section">
            <div class="trends-section__head">
                {{translate('most', true)}} {{translate(view.currentSource.key)}} {{translate('in-period')}}
            </div>
            <div class="trends-section__body">
                <div class="regions__list">
                    <cumulative-trends-region
                        v-for="item in highest"
                        @select="select"
                        :region="item.region"
                        :value="item.value" />
                </div>
            </div>
        </div>

        <div class="trends-section">
            <div class="trends-section__head">
                {{translate('least', true)}} {{translate(view.currentSource.key)}} {{translate('in-period')}}
            </div>
            <div class="trends-section__body">
                <div class="regions__list">
                    <cumulative-trends-region
                        v-for="item in lowest"
                        @select="select"
                        :region="item.region"
                        :value="item.value" />
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
</style>
