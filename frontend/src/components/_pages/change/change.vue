<script>
import View from "@/classes/View";
import query from '@/components/elements/query'
import Page from "@/components/_pages/page";
import Map from "@/components/_map/Map";
import { downloadImage } from "@/tools/download";
import RegionDetailsChange from "./details/region-details-change";
import ChangeTrends from "./trends/change-trends";

export default {
    name: 'change',
    components: {
        ChangeTrends,
        RegionDetailsChange,
        Page,
        Map,
    },
    mixins: [query],
    props: {},
    data() {
        return {
            view: new View({id: 1, offsetStart: this.$store.state.settings.historyLength})
        }
    },
    computed: {
        currentRegion() {
            return this.view.currentRegion;
        }
    },
    methods: {
        download(payload) {
            downloadImage("change", payload);
        }
    }
}
</script>


<template>
    <page :view="view">
        <template v-slot:map>
            <Map
                @download="download"
                :view="view"
                :map-type="'change'" />
        </template>

        <template v-slot:details>
            <region-details-change
                :view="view"
                :region="currentRegion" />
        </template>

        <template v-slot:trends>
            <change-trends :view="view" />
        </template>
    </page>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>
