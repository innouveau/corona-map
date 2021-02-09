<script>
    import GGD from "@/classes/region/GGD";
    import View from "@/classes/View";
    import Country from "@/classes/region/Country";
    import ageGroups from "@/data/age-groups";
    import ageGroup from "./age-group";
    import ageDistributionHeader from "./age-distribution-header";

    export default {
        name: 'age-distribution-graph-normalised',
        components: {
            ageDistributionHeader,
            ageGroup
        },
        data() {
            return {
                ageGroups: ageGroups.slice().reverse()
            }
        },
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: GGD | Country,
                required: true
            }
        },
        computed: {
            weeks() {
                return [...Array(this.$store.state.settings.weeks).keys()].slice().reverse();
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="age-distribution-graph-normalised">
        <age-distribution-header
            :view="view"
            :weeks="weeks"/>
        <age-group
            v-for="ageGroup in ageGroups"
            :view="view"
            :age-group="ageGroup"
            :region="region"
            :weeks="weeks"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-distribution-graph-normalised {
        font-size: 9px;
    }
</style>