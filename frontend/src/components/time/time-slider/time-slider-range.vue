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
        },
        methods: {
            date(v) {
                return this.$store.getters['ui/getDateByOffset'](this.reverse(v) * this.currentMap.data.positivePcrTests.interval);
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
        <vue-slider
            @drag-end="update"
            v-model="range"
            :min="0"
            :max="max"
            :interval="1"
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
