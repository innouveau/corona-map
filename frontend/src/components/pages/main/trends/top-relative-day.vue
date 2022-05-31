<script>
import View from "@/classes/View";
import trendMixin from "./trend-mixin.js";
import { getRelativeValueForDay } from "@/tools/calculator";
import trendSection from "@/components/elements/trends/trend-section";
import trendSectionHead from "@/components/elements/trends/trend-section-head";
import trendSectionBody from "@/components/elements/trends/trend-section-body";
import trendList from "@/components/elements/trends/trend-list";
import trendRegion from "@/components/elements/trends/trend-region";

export default {
    name: "top-relative-day",
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
    },
    data() {
        return {
            list: [],
        };
    },
    computed: {
        title() {
            return (
                "Top 10 " +
                this.translate("relative") +
                " " +
                this.translate("increase") +
                " " +
                this.translate("today")
            );
        },
    },
    methods: {
        getValue(region) {
            return getRelativeValueForDay(
                region,
                this.view.offset,
                this.view.currentSource.key
            );
        },
    },
};
</script>

<template>
    <trend-section>
        <trend-section-head>
            {{ title }}
        </trend-section-head>
        <trend-section-body>
            <trend-list>
                <trend-region
                    v-for="(item, index) in list"
                    :key="index"
                    :view="view"
                    :region="item.region"
                >
                    ({{ formatted(item.value) }}
                    <span class="abs-rel"> rel </span>)
                </trend-region>
            </trend-list>
        </trend-section-body>
    </trend-section>
</template>

<style lang="scss"></style>
