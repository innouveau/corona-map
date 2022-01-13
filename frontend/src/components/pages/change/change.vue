<script>
import View from "@/classes/View";
import Page from "@/components/pages/page";
import Map from "@/components/map/Map";
import { downloadImage } from "@/tools/download";
import RegionDetailsChange from "./details/region-details-change";
import ChangeTrends from "./trends/change-trends";
import query from '@/components/elements/query.js'
import Region from "@/components/region/Region";

export default {
    name: 'change',
    components: {
        Region,
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
        download() {
            downloadImage(this.view, "change");
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
            <Region
                :view="view">
                <region-details-change
                    :view="view"
                    :region="currentRegion" />
            </Region>

        </template>

        <template v-slot:trends>
            <change-trends :view="view" />
        </template>
    </page>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>
