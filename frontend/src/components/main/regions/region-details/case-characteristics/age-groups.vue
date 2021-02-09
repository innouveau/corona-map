<script>
    import ageGroup from "./age-group";

    export default {
        name: 'age-groups',
        components: {
            ageGroup
        },
        props: {},
        computed: {
            ageGroups() {
                return this.$store.state.ageGroups.all;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="age-groups">
        <age-group
            v-for="ageGroup in ageGroups"
            :age-group="ageGroup"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-groups {

    }
</style>