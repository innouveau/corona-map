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
        },
        methods: {}
    }
</script>


<template>
    <div class="map-legend">
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
