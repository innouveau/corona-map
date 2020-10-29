<script>
    import View from "@/classes/View";
    import timeSliderGraphBar from "./time-slider-graph-bar";

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
                return this.view.currentRegion;
            },
            days() {
                return this.region.report.history;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="time-slider-graph">
        <time-slider-graph-bar
            v-for="day in days"
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