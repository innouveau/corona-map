<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import timeTools from "./time-tools";
    import View from '@/classes/View';
    import timeSliderStops from "./time-slider-stops";
    import TimeSliderGraph from "./graph/time-slider-graph";

    export default {
        name: 'time-slider',
        components: {
            TimeSliderGraph,
            timeSliderStops,
            timeTools,
            VueSlider
        },
        props: {
            view: {
                type: View,
                required: true
            },
            stops: {
                type: Array,
                required: false,
                default() {
                    return []
                }
            },
            showGraph: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            reversedOffset: {
                get() {
                    return this.max - this.view.offset;
                },
                set(value) {
                    this.view.offset = (this.max - value)
                }
            },
            historyLength() {
                return this.$store.state.settings.historyLength;
            },
            date() {
                return this.$store.getters['ui/getDateByOffset'](this.view.offset * this.currentMap.data.positivePcrTests.interval);
            },
            currentMap() {
                return this.$store.state.maps.current
            },
            frameSize() {
                return this.view.pcrWeekly ? 7 : 1;
            },
            min() {
                return 0;
            },
            max() {
                if (this.frameSize === 1) {
                    return this.historyLength;
                } else {
                    return Math.floor(this.historyLength / this.frameSize) * this.frameSize;
                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="time-slider">
        <div class="vue-slider__container">
            <vue-slider
                v-model="reversedOffset"
                :min="min"
                :max="max"
                :interval="frameSize"
                :tooltip-formatter="date"
                :duration="0"/>
            <time-slider-stops
                v-if="stops.length > 0"
                :stops="stops"
                :l="historyLength"
                :view="view"/>
            <time-slider-graph
                v-if="view.currentRegion && view.currentSource.loaded"
                :view="view"/>
        </div>

        <time-tools
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider {
        display: flex;
        align-items: flex-end;
        pointer-events: none;
        width: 300px;
        height: 32px;

        .vue-slider__container {
            width: calc(100% - 120px);
            position: relative;

            .vue-slider {
                margin-right: 20px;
                padding-bottom: 0!important;
            }

            .time-slider-stops {
                pointer-events: none;
                position: absolute;
                left: 0;
                top: 0;
                width: calc(100% - 20px);
                height: 100%;
                z-index: 1;
            }

            .time-slider-graph {
                pointer-events: none;
                position: absolute;
                left: 0;
                top: 2px;
                width: calc(100% - 20px);
                height: calc(50% - 2px);
                z-index: 0;
            }
        }
    }
</style>
