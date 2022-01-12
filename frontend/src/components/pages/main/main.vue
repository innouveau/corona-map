<script>
import View from "@/classes/View";
import page from "@/components/pages/page";
import { downloadImage } from "@/tools/download";
import RegionDetails from "./details/region-details";
import Trends from "./trends/trends";
import Map from "@/components/map/Map";
import Region from "@/components/region/Region";
import query from '@/components/elements/query.js'

export default {
    name: 'main-page',
    components: {
        Region,
        Map,
        Trends,
        RegionDetails,
        page,
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
        },
        showMap() {
            return this.$store.state.ui.menu === 'map';
        },
        currentSource() {
            return this.view.currentSource;
        },
        showEmbedButton() {
            return this.$store.state.ui.presets !== 'radio1';
        }
    },
    methods: {
        download() {
            downloadImage(this.view, "signaling");
        }
    },
    watch: {
        currentSource: function () {
            this.$store.commit('ui/updateProperty', {key: 'showTrends', value: false});
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
                :map-type="'signaling'" />
        </template>

        <template v-slot:details>
            <Region
                :view="view">
                <region-details
                    :view="view"
                    :region="currentRegion" />
                {{currentPage}}
            </Region>
        </template>

        <template v-slot:trends>
            <trends :view="view" />
        </template>
    </page>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>
