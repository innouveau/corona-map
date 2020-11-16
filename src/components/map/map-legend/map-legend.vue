<script>
    import mapLegendRegular from "./map-legend-regular";
    import mapLegendGradient from "./map-legend-gradient";

    export default {
        name: 'map-legend',
        components: {
            mapLegendGradient,
            mapLegendRegular
        },
        props: {},
        computed: {
            gradient() {
                return this.$store.state.settings.gradient;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="map-legend">
        <map-legend-gradient v-if="gradient"/>
        <map-legend-regular v-else/>
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