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
            showTrends() {
                return this.$store.state.ui.menu === 'trends';
            },
            show() {
                return this.view.offset < 2;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :class="{'panel--active': showTrends}"
        class="change-trends trends panel">
        <div v-if="show">
            <regions-growth
                :view="view"/>
            <regions-shrinkage
                :view="view"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .change-trends {

    }
</style>