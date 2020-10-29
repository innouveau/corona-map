<script>
    import View from "@/classes/View";

    export default {
        name: 'time-slider-graph-bar',
        components: {},
        props: {
            day: {
                type: Object,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            relativeIncrease() {
                return 100000 * this.day.positiveTests / this.view.currentRegion.population;
            },
            height() {
                return this.relativeIncrease * 1;
            },
            isActive() {
                return this.view.offset === this.day.offset;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :class="{'time-slider-graph-bar--active': isActive}"
        :style="{'height': height + 'px'}"
        class="time-slider-graph-bar"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-graph-bar {
        background: #ddd;
        width: 2px;
        flex-grow: 1;

        &.time-slider-graph-bar--active {
            background: #ccc;
        }
    }
</style>