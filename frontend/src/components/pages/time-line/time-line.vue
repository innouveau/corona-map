<script>
import View from "@/classes/View";
import dateTools from "@/tools/date";
import headerMenu from "@/components/pages/header/header-menu";
import Map from "@/components/map/Map";
import { downloadImage } from "@/tools/download";
import query from "@/mixins/query.js";
import Region from "../../region/Region";
import RegionDetails from "@/components/pages/main/details/region-details";
import RegionDetailsNumbers from "@/components/pages/main/details/region-details-numbers";
import RegionContainer from "@/components/region/region-container";

export default {
    name: "time-line",
    components: {
        RegionContainer,
        RegionDetailsNumbers,
        RegionDetails,
        Region,
        Map,
        headerMenu,
    },
    data() {
        return {
            view: new View({}),
        };
    },
    props: {},
    mixins: [query],
    methods: {
        download() {
            downloadImage(this.view, "signaling");
        },
    },
    computed: {
        currentRegion() {
            return this.view.currentRegion;
        },
    },
};
</script>

<template>
    <div class="time-line">
        <header-menu v-if="view" :view="view" />

        <div class="map-container">
            <Map
                v-if="view"
                @download="download"
                :view="view"
                :map-type="'signaling'"
            />
            <region-container :view="view">
                <Region :view="view">
                    <region-details-numbers
                        :view="view"
                        :region="currentRegion"
                        :compact="true"
                    />
                </Region>
            </region-container>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.time-line {
    height: 100%;

    .header-menu {
        height: 48px;
    }

    .map-container {
        position: relative;
        height: calc(100% - 48px);
    }
}
</style>
