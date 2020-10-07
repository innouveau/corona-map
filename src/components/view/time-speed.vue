<script>
    import VueSlider from 'vue-slider-component'

    export default {
        name: 'time-speed',
        components: {
            VueSlider
        },
        props: {

        },
        computed: {
            timeInterval() {
                return this.$store.state.ui.timeInterval;
            },
            speed: {
                get() {
                    switch(this.timeInterval) {
                        case 1000:
                            return 1;
                        case 200:
                            return 2;
                        case 100:
                            return 3;
                    }

                },
                set(value) {
                    let i;
                    switch(value) {
                        case 1:
                            i = 1000;
                            break;
                        case 2:
                            i = 200;
                            break;
                        case 3:
                            i = 100;
                            break;
                    }
                    this.$store.commit('ui/updateProperty', {key: 'timeInterval', value: i});
                }
            },
            label() {
                return '' + this.speed;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="time-speed">
        <div class="vue-slider__container">
            <vue-slider
                v-model="speed"
                :min="1"
                :max="3"
                :interval="1"
                :tooltip-formatter="label"
                :duration="0"/>
        </div>

        <div class="time-speed__label">
            {{translate('speed', true)}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-speed {
        display: flex;

        .vue-slider__container {
            width: 80px;
            margin-right: 12px;
        }
    }
</style>