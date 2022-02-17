<script>
    import View from "@/classes/View";
    import { HOSPITALISATION_MULTIPLICATION, DECEASED_MULTIPLICATION} from "@/data/constants";
    import { getCurrentRegion } from "@/tools/relations";

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
                return getCurrentRegion(this.view.currentRegion);
            },
            height() {
                const source = this.view.currentSource.key;
                if (source === 'vaccination') {
                    const scale = 0.5;
                    return scale * 100 * this.day.source[source] / this.view.currentRegion.population;
                } else {
                    let multiply = 15000;
                    if (source === 'hospitalisations') {
                        multiply *= HOSPITALISATION_MULTIPLICATION;
                    } else if (source === 'deceased') {
                        multiply *= DECEASED_MULTIPLICATION;
                    }
                }
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
