<script>
import View from "@/classes/View";
import changeTools from "@/tools/change";
import numberTools from "@/tools/number";
import { getChangeOfType } from "@/tools/calculator";
import trendSection from "@/components/elements/trends/trend-section";
import trendSectionHead from "@/components/elements/trends/trend-section-head";
import trendSectionBody from "@/components/elements/trends/trend-section-body";
import trendList from "@/components/elements/trends/trend-list";
import trendRegion from "@/components/elements/trends/trend-region";

export default {
    name: "change-trends-regions",
    components: {
        trendRegion,
        trendList,
        trendSectionBody,
        trendSectionHead,
        trendSection,
    },
    props: {
        view: {
            type: View,
            required: true,
        },
        direction: {
            type: String,
            required: true,
        },
        set: {
            type: Array,
            required: true,
        },
    },
    computed: {
        currentMap() {
            return this.$store.state.maps.current;
        },
        regions() {
            let sorted = [...this.set]
                .sort((a, b) => {
                    return this.direction === "top"
                        ? b.value - a.value
                        : a.value - b.value;
                })
                .map((item) => item.region);
            if (sorted.length > 10) {
                return sorted.slice(0, 10);
            } else {
                return sorted;
            }
        },
        typeLabel() {
            if (this.currentMap.settings.customRegionLabel) {
                return this.currentMap.settings.customRegionLabel[
                    this.currentLanguage.iso_code
                ];
            } else {
                return this.translate(
                    this.$store.getters["ui/typeLabel"](true),
                    true
                );
            }
        },
        title() {
            let title = "";
            title += this.typeLabel + " ";
            if (this.direction === "top") {
                title += this.translate("with-growth").toLowerCase() + " ";
            } else {
                title += this.translate("with-shrinkage").toLowerCase() + " ";
            }
            title += this.translate("for", false) + " ";
            title += this.translate(this.view.currentSource.key, false);
            return title;
        },
    },
    methods: {
        formatChange(region) {
            const change = getChangeOfType(
                region,
                this.view.offset,
                7,
                this.view.currentSource.key
            );
            return numberTools.formatChange(change);
        },
        getColor(region) {
            const change = getChangeOfType(
                region,
                this.view.offset,
                7,
                this.view.currentSource.key
            );
            return changeTools.getColorForChange(change);
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
                    v-for="(region, index) in regions"
                    :key="index"
                    :view="view"
                    :region="region"
                >
                    <div
                        :style="{
                            'border-bottom': '2px solid ' + getColor(region),
                        }"
                        class="trend-region__change-info"
                    >
                        {{ formatChange(region) }}
                    </div>
                </trend-region>
            </trend-list>
        </trend-section-body>
    </trend-section>
</template>

<style lang="scss"></style>
