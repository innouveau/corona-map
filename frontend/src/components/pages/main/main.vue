<script>
import View from "@/classes/View";
import page from "@/components/pages/page";
import { downloadImage } from "@/tools/download";
import RegionDetails from "./details/region-details";
import mainTrends from "./trends/main-trends";
import Map from "@/components/map/Map";
import Region from "@/components/region/Region";
import query from '@/components/elements/query.js'

export default {
    name: 'main-page',
    components: {
        Region,
        Map,
        mainTrends,
        RegionDetails,
        page,
    },
    mixins: [query],
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
            downloadImage(this.view, "signaling");
        }
    },
    mounted() {

    }
}
</script>


<template>
    <page :view="view">
        <template v-slot:map>
            <Map
                @download="download"
                :view="view"
                :map-type="'signaling'" />
        </template>

        <template v-slot:details>
            <Region
                :view="view">
                <region-details
                    :view="view"
                    :region="currentRegion" />
            </Region>
        </template>

        <template v-slot:trends>
            <main-trends :view="view" />
        </template>
    </page>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>
