<script>
import View from "@/classes/View";
import query from '@/components/elements/query'
import Page from "@/components/_pages/page";
import Map from "@/components/_map/Map";
import { downloadImage } from "@/tools/download";
import Region from "@/components/_region/Region";
import CumulativeDetails from "./details/cumulative-details";

export default {
    name: 'cumulative',
    components: {
        CumulativeDetails,
        Region,
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
        regionOfFocus() {
            return this.$store.getters['ui/getRegionOfFocus'](this.view.currentRegion);
        }
    },
    methods: {
        download(payload) {
            downloadImage("cumulative", payload);
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
                :map-type="'cumulative'" />
        </template>

        <template v-slot:details>
            <Region
                :view="view">
                <cumulative-details
                    :view="view"
                    :region="regionOfFocus" />
            </Region>
        </template>

        <template v-slot:trends>
            Trends
        </template>
    </page>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>
