<script>
import populationTestRegion from "./population-test-region";
import View from "@/classes/View";
import ViewTools from "@/components/time/view-tools";
import RegionsPicker from "./regions-picker";

export default {
    name: "population-week-stats-container",
    components: {
        RegionsPicker,
        ViewTools,
        populationTestRegion,
    },
    data() {
        let view = {
            id: 1,
            pcrWeekly: true,
        };
        return {
            view: new View(view),
            group: {
                title: "X",
                label: "X",
                color: "purple",
            },
            activeRegions: [],
        };
    },
    props: {},
    computed: {
        currentMap() {
            return this.$store.state.maps.current;
        },
        regions() {
            return this.$store.state.regions.all;
        },
    },
    methods: {},
};
</script>

<template>
    <div class="population-week-stats-container">
        <div class="population-week-stats-container__head">
            <view-tools :view="view" />
        </div>
        <regions-picker :regions="regions" :active-regions="activeRegions" />

        <div class="population-week-stats-container__body">
            <population-test-region
                v-for="(region, index) in activeRegions"
                :key="index"
                :region="region"
                :view="view"
                :group="group"
            />
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.population-week-stats-container {
    .population-week-stats-container__head {
        height: 56px;
        background: $map-color;
    }

    .population-week-stats-container__body {
        height: calc(100% - 196px);
        overflow: auto;
        padding: 12px;
    }
}
</style>
