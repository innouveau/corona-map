<script>
    import View from "@/classes/View";
    import topRelativeWeek from "./top-relative-week";
    import topRelativeDay from "./top-relative-day";
    import topAbsoluteDay from "./top-absolute-day";

    export default {
        name: 'main-trends',
        components: {
            topAbsoluteDay,
            topRelativeDay,
            topRelativeWeek,
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            hasDays() {
                return this.$store.state.maps.current.data.positivePcrTests.interval === 1;
            }
        },
    }
</script>


<template>
    <div class="main-trends">
        <top-relative-week
            :view="view"/>
        <top-relative-day
            v-if="hasDays"
            :view="view"/>
        <top-absolute-day
            v-if="hasDays"
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>
