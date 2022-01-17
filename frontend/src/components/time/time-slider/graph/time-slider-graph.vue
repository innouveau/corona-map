<script>
    import View from "@/classes/View";
    import timeSliderGraphBar from "./time-slider-graph-bar";
    import {getHistory} from "@/tools/calculator";

    export default {
        name: 'time-slider-graph',
        components: {
            timeSliderGraphBar
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            region() {
                return this.$store.getters['ui/getRegionOfFocus'](this.view.currentRegion);
            },
            days() {
                return getHistory(this.region, this.view.currentSource.key);
            }
        }
    }
</script>


<template>
    <div class="time-slider-graph">
        <time-slider-graph-bar
            v-for="(day, index) in days"
            :key="index"
            :view="view"
            :day="day"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-graph {
        display: flex;
        align-items: flex-end;
    }
</style>
