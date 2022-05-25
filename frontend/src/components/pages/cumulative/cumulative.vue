<script>
import View from "@/classes/View";
import Page from "@/components/pages/page";
import Map from "@/components/map/Map";
import { downloadImage } from "@/tools/download";
import Region from "@/components/region/Region";
import CumulativeDetails from "./details/cumulative-details";
import query from "@/mixins/query.js";
import CumulativeTrends from "./trends/cumulative-trends";
import { getCurrentRegion } from "@/tools/relations";

export default {
    name: "cumulative",
    components: {
        CumulativeTrends,
        CumulativeDetails,
        Region,
        Page,
        Map,
    },
    mixins: [query],
    props: {},
    data() {
        return {
            view: new View({
                id: 1,
                offsetStart: this.$store.state.settings.historyLength,
            }),
        };
    },
    computed: {
        regionOfFocus() {
            return getCurrentRegion(this.view.currentRegion);
        },
    },
    methods: {
        download(payload) {
            downloadImage(this.view, "cumulative");
        },
    },
};
</script>

<template>
    <page :view="view">
        <template v-slot:map>
            <Map @download="download" :view="view" :map-type="'cumulative'" />
        </template>

        <template v-slot:details>
            <Region :view="view">
                <cumulative-details :view="view" :region="regionOfFocus" />
            </Region>
        </template>

        <template v-slot:trends>
            <cumulative-trends :view="view" />
        </template>
    </page>
</template>

<style lang="scss">
@import "@/styles/variables.scss";
</style>
