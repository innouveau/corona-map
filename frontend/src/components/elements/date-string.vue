<script>
    export default {
        name: 'date-string',
        components: {},
        props: {},
        computed: {
            dateString() {
                return this.$store.getters['ui/dateString'];
            }
        },
        methods: {}
    }
</script>


<template>
    <span class="date-string">
        {{dateString}}
    </span>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .date-string {

    }
</style>