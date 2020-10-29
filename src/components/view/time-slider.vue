<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import timeTools from "./time-tools";
    import View from '@/classes/View';
    import timeSliderStops from "./time-slider-stops";

    export default {
        name: 'time-slider',
        components: {
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
                required: false
            }
        },
        computed: {
            reversedOffset: {
                get() {
                    return this.historyLength - this.view.offset;
                },
                set(value) {
                    this.view.offset = (this.historyLength - value)
                }
            },
            historyLength() {
                return this.$store.state.settings.historyLength;
            },
            date() {
                return this.$store.getters['ui/getDateByOffset'](this.view.offset * this.currentMap.settings.testDataInterval);
            },
            currentMap() {
                return this.$store.state.maps.current
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
                :min="0"
                :max="historyLength"
                :interval="1"
                :tooltip-formatter="date"
                :duration="0"/>
            <time-slider-stops
                :stops="stops"
                :l="historyLength"/>
        </div>

        <time-tools
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider {
        display: flex;
        align-items: center;
        pointer-events: none;
        width: 300px;
        height: 32px;

        .vue-slider__container {
            width: calc(100% - 120px);
            position: relative;

            .vue-slider {
                margin-right: 20px;
            }

            .time-slider-stops {
                pointer-events: none;
                position: absolute;
                left: 0;
                top: 0;
                width: calc(100% - 20px);
                height: 100%;
            }
        }
    }
</style>