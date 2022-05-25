<script>
import View from "@/classes/View";
import trendSection from "@/components/elements/trends/trend-section";
import trendSectionHead from "@/components/elements/trends/trend-section-head";
import trendSectionBody from "@/components/elements/trends/trend-section-body";
import trendList from "@/components/elements/trends/trend-list";
import trendRegion from "@/components/elements/trends/trend-region";
import trendMixin from "./../trend-mixin.js";
import { getAbsoluteValueForDay } from "@/tools/calculator";

export default {
    name: "list-vaccination",
    components: {
        trendRegion,
        trendList,
        trendSectionBody,
        trendSectionHead,
        trendSection,
    },
    mixins: [trendMixin],
    props: {
        view: {
            type: View,
            required: true,
        },
        direction: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            list: [],
        };
    },
    computed: {
        regions() {
            return this.$store.getters["regions/regionsForRegionType"].filter(
                (region) => {
                    return (
                        !region.noData &&
                        getAbsoluteValueForDay(
                            region,
                            this.view.offset,
                            this.view.currentSource.key
                        ) !== 9999
                    );
                }
            );
        },
    },
    methods: {
        getValue(region) {
            return getAbsoluteValueForDay(
                region,
                this.view.offset,
                this.view.currentSource.key
            );
        },
    },
};
</script>

<template>
    <div class="list-vaccination">
        <trend-section>
            <trend-section-head>
                {{ translate("vaccinated-" + direction, true) }}
            </trend-section-head>
            <trend-section-body>
                <trend-list>
                    <trend-region
                        v-for="item in list"
                        :view="view"
                        :region="item.region"
                    >
                        <b>{{ item.value }}%</b>
                    </trend-region>
                </trend-list>
            </trend-section-body>
        </trend-section>
    </div>
</template>

<style lang="scss">
.list-vaccination {
}
</style>
