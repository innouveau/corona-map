<script>
    import compareItem from "./compare-item";
    import View from "@/classes/View";

    export default {
        name: 'time-line',
        components: {
            compareItem
        },
        data() {
            return {
                view: new View({id:1})
            }
        },
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="time-line">
        <compare-item
            v-if="view"
            :view="view"
            :show-legend="true"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-line {
        height: 100%;

        .compare-item {
            height: 100%;
        }
    }
</style>