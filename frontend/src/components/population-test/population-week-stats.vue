<script>
    import populationWeekStatsContainer from "./population-week-stats-container";

    export default {
        name: 'population-week-stats',
        components: {
            populationWeekStatsContainer
        },
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="population-week-stats">
        <population-week-stats-container/>
        <population-week-stats-container/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .population-week-stats {
        display: flex;
        height: 100%;

        .population-week-stats-container {
            width: 50%;
            height: 100%;
            border-right: 1px solid #ddd;

            &:last-child {
                border-right: 0;
            }
        }
    }
</style>