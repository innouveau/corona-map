<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import View from '@/classes/View';

    export default {
        name: 'time-slider-range',
        components: {
            VueSlider
        },
        props: {
            view: {
                type: View,
                required: true
            },
        },
        data() {
            const frameSize = this.view.pcrWeekly ? 7 : 1;
            const l = this.$store.state.settings.historyLength;
            const max = (frameSize === 1) ? l : (Math.floor(l / frameSize) * frameSize);
            return {
                max,
                frameSize,
                range: [0, max]
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current
            },
            date() {
                return this.$store.getters['ui/getDateByOffset'](this.view.offset * this.currentMap.data.positivePcrTests.interval);
            },
        },
        methods: {
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
        <vue-slider
            @drag-end="update"
            v-model="range"
            :min="0"
            :max="max"
            :interval="frameSize"
            :tooltip-formatter="date"
            :duration="0"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-range {
        width: calc(100% - 20px);
    }
</style>
