<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import View from '@/classes/View';
    import TimeSliderGraph from "./graph/time-slider-graph";

    export default {
        name: 'time-slider-range',
        components: {
            TimeSliderGraph,
            VueSlider
        },
        props: {
            view: {
                type: View,
                required: true
            },
        },
        data() {
            const max = this.$store.state.settings.historyLength;
            return {
                max,
                range: [max - this.view.offsetStart, max - this.view.offset]
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current
            },
            isPlaying() {
                return this.$store.state.ui.isPlaying;
            },
            showGraph() {
                return this.view.currentRegion && this.view.currentSource.loaded && !this.isPlaying && this.$store.state.ui.currentRegionType === this.currentMap.settings.regionTypes[0];
            }
        },
        methods: {
            date(v) {
                return this.$store.getters['ui/getDateByOffset'](this.reverse(v) * this.currentMap.settings.interval);
            },
            reverse(v) {
                return this.max - v;
            },
            update() {
                this.view.offset = this.reverse(this.range[1]);
                this.view.offsetStart = this.reverse(this.range[0]);
            }
        }
    }
</script>


<template>
    <div class="time-slider-range">
        <div class="time-slider-range__container">
        <vue-slider
            @drag-end="update"
            v-model="range"
            :min="0"
            :max="max"
            :interval="1"
            :tooltip-formatter="date"
            :duration="0"/>

            <time-slider-graph
                v-if="showGraph"
                :view="view"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-range {
        width: calc(100% - 20px);

        &__container {
            position: relative;
        }
    }
</style>
