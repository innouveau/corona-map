<script>
    import View from "@/classes/View";
    import { HOSPITALISATION_MULTIPLICATION, DECEASED_MULTIPLICATION} from "@/data/constants";

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
            region() {
                return this.$store.getters['ui/getRegionOfFocus'](this.view.currentRegion);
            },
            height() {
                const source = this.view.currentSource.key;
                let multiply = 15000;
                if (source === 'hospitalisations') {
                    multiply *= HOSPITALISATION_MULTIPLICATION;
                } else if (source === 'deceased') {
                    multiply *= DECEASED_MULTIPLICATION;
                }
                return multiply * this.day.source[source] / this.region.totalPopulation;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{'height': height + 'px'}"
        class="time-slider-graph-bar" />
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-graph-bar {
        background: rgba(0,0,0,0.15);
        width: 2px;
        flex-grow: 1;
    }
</style>
