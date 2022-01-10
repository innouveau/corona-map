<script>
    import mapLegendRegular from "./map-legend-regular";
    import mapLegendGradient from "./map-legend-gradient";
    import View from "@/classes/View";

    export default {
        name: 'map-legend',
        components: {
            mapLegendGradient,
            mapLegendRegular
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            gradient() {
                return this.$store.state.settings.gradient;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            hasRegionTypePicker() {
                return this.currentMap.settings.regionTypes && this.currentMap.settings.regionTypes.length > 1;
            },
            hasSourcePicker() {
                return this.currentMap.data.hospitalisations.status || this.currentMap.data.deceased.status;
            },
            top() {
                if (this.hasSourcePicker && this.hasRegionTypePicker) {
                    return 54;
                } else if (this.hasSourcePicker || this.hasRegionTypePicker) {
                    return 34;
                } else {
                    return 0;
                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{'top': top + 'px'}"
        class="map-legend">
        <map-legend-gradient
            v-if="gradient"
            :view="view"/>
        <map-legend-regular
            v-else
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-legend {
        pointer-events: none;

        .threshold {
            display: flex;
            align-items: center;
            font-size: 9px;
            color: $map-color-super-dark;
        }
    }
</style>