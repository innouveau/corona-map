<script>
    import TimeSliderStop from "./time-slider-stop";
    import View from "@/classes/View";


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
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="time-slider-stops">
        <time-slider-stop
            v-for="stop in stops"
            :stop="stop"
            :l="l"
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-stops {

    }
</style>