<script>
    import TimeSliderStop from "./time-slider-stop";
    import dateTools from '@/tools/date';

    export default {
        name: 'time-slider-stops',
        components: {TimeSliderStop},
        props: {
            stops: {
                type: Array,
                required: true
            },
            l: {
                type: Number,
                required: true
            }
        },
        computed: {
            translatedStops() {
                return this.stops.map(stop => {
                    let offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, new Date(stop).getTime()) / this.$store.state.maps.current.settings.testDataInterval;
                    return 100 - (100 * offset/this.l);
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="time-slider-stops">
        <time-slider-stop
            v-for="stop in translatedStops"
            :x="stop"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-stops {

    }
</style>