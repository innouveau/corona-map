<script>
import View from "@/classes/View";
import timeSliderGraphBar from "./time-slider-graph-bar";
import { getHistory } from "@/tools/calculator";
import { getCurrentRegion } from "@/tools/relations";

export default {
    name: "time-slider-graph",
    components: {
        timeSliderGraphBar,
    },
    props: {
        view: {
            type: View,
            required: true,
        },
    },
    computed: {
        region() {
            return getCurrentRegion(this.view.currentRegion);
        },
        days() {
            return getHistory(this.region, this.view.currentSource.key);
        },
    },
};
</script>

<template>
    <div class="time-slider-graph">
        <time-slider-graph-bar
            v-for="(day, index) in days"
            :key="index"
            :view="view"
            :day="day"
        />
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.time-slider-graph {
    display: flex;
    align-items: flex-end;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 2px;
    width: calc(100% - 20px);
    height: calc(50% - 2px);
    z-index: 0;
}
</style>
