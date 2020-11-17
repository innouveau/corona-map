<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import speedTestGraph from "./speed-test-graph";

    export default {
        name: 'speed-test-region',
        components: {
            speedTestGraph
        },
        props: {
            region: {
                type: _Region,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="speed-test-region">
        <div class="speed-test-region__title">
            {{region.title}}
        </div>
        <speed-test-graph
            :view="view"
            :region="region"
            :weeks="4"
            :height="700"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .speed-test-region {
        border-bottom: 1px solid #ddd;
        padding: 12px;
    }
</style>