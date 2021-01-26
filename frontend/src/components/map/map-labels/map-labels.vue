<script>
    import mapLabel from "./map-label";

    export default {
        name: 'map-labels',
        components: {
            mapLabel
        },
        props: {
            labels: {
                type: Array,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="map-labels">
        <map-label
            v-for="label in labels"
            :label="label"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-labels {
        position: relative;
        pointer-events: none;
    }
</style>