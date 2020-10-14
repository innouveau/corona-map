<script>
    import View from "@/classes/View";
    import regionsShrinkage from "./regions-shrinkage";
    import RegionsGrowth from "./regions-growth";

    export default {
        name: 'change-trends',
        components: {
            RegionsGrowth,
            regionsShrinkage
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {

        },
        methods: {}
    }
</script>


<template>
    <div class="change-trends trends panel">
        <regions-growth
            :view="view"/>
        <regions-shrinkage
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .change-trends {

    }
</style>