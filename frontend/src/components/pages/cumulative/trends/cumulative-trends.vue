<script>
import View from "@/classes/View";
import CumulativeTrendsRegion from "./cumulative-trends-region";
import { getCumulativeForPeriod } from "@/tools/calculator";

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
        isTrendPanel() {
            return this.$store.state.ui.menu === 'trends';
        },
        offset() {
            return this.view.offset;
        },
        offsetStart() {
            return this.view.offsetStart;
        },
        showTrends() {
            return this.$store.state.ui.showTrends;
        },
        list() {
            const regions = this.$store.getters['ui/regions'];
            return regions.map(region => {
                const start = this.view.offset;
                const end = this.view.offsetStart;
                return {
                    region,
                    value: getCumulativeForPeriod(region, start, end, this.view.currentSource.key, true)
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
        doShowTrends(){
            this.$store.commit('ui/updateProperty', {key: 'showTrends', value: true});
        },
        select(region) {
            if (region.regionType === 'city' || region.regionType === 'district') {
                this.view.currentRegion = region;
            }
            this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
        }
    },
    watch: {
        offset: {
            handler: function () {
                this.$store.commit('ui/updateProperty', {key: 'showTrends', value: false});
            }
        },
        offsetStart: {
            handler: function () {
                console.log("!");
                this.$store.commit('ui/updateProperty', {key: 'showTrends', value: false});
            }
        }
    }
}
</script>


<template>
    <div
        :class="{'panel--active': showTrends}"
        class="cumulative-trends trends">
        <div v-if="showTrends">
            <div class="trends__section">
                <div class="trends__section-head">
                    Hoogste score over periode
                </div>
                <div class="trends__section-body">
                    <cumulative-trends-region
                        v-for="item in highest"
                        @select="select"
                        :region="item.region"
                        :value="item.value" />
                </div>
            </div>

            <div class="trends__section">
                <div class="trends__section-head">
                    Laagste score over periode
                </div>
                <div class="trends__section-body">
                    <cumulative-trends-region
                        v-for="item in lowest"
                        @select="select"
                        :region="item.region"
                        :value="item.value" />
                </div>
            </div>
        </div>
        <div v-else>
            <p>
                {{translate('show-notification')}}
            </p>
            <div class="buttons">
                <div
                    @click="doShowTrends()"
                    class="button">
                    {{translate('show-trend')}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.trends__section {
    margin-bottom: 16px;
}

.trends__section-head {
    font-weight: 700;
}
</style>
