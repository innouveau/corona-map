<script>
import View from "@/classes/View";
import { getRelativeCumulativeForPeriod } from "@/tools/calculator";
import trendSection from "@/components/elements/trends/trend-section";
import trendSectionHead from "@/components/elements/trends/trend-section-head";
import trendSectionBody from "@/components/elements/trends/trend-section-body";
import trendList from "@/components/elements/trends/trend-list";
import trendRegion from "@/components/elements/trends/trend-region";

export default {
    name: 'cumulative-trends',
    components: {
        trendRegion,
        trendList,
        trendSectionBody,
        trendSectionHead,
        trendSection
    },
    props: {
        view: {
            type: View,
            required: true
        }
    },
    computed: {
        list() {
            const regions = this.$store.getters['regions/regionsForRegionType'];
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
    }
}
</script>


<template>
    <div class="cumulative-trends trends">
        <trend-section>
            <trend-section-head>
                {{translate('most', true)}} {{translate(view.currentSource.key)}} {{translate('in-period')}}
            </trend-section-head>
            <trend-section-body>
                <trend-list>
                    <trend-region
                        v-for="item in highest"
                        :view="view"
                        :region="item.region">
                    </trend-region>
                </trend-list>
            </trend-section-body>
        </trend-section>

        <trend-section>
            <trend-section-head>
                {{translate('least', true)}} {{translate(view.currentSource.key)}} {{translate('in-period')}}
            </trend-section-head>
            <trend-section-body>
                <trend-list>
                    <trend-region
                        v-for="item in lowest"
                        :view="view"
                        :region="item.region">
                    </trend-region>
                </trend-list>
            </trend-section-body>
        </trend-section>
    </div>
</template>


<style lang="scss">
</style>
