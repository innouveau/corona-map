<script>
    import sewageToolsRegio from "./sewage-tools-regio";

    export default {
        name: 'sewage-tools-regios',
        components: {
            sewageToolsRegio
        },
        props: {
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            regios() {
                return this.$store.state.regios.all
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-tools-regios">
        <sewage-tools-regio
            v-for="regio of regios"
            :regio="regio"
            :settings="settings"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-tools-regios {
        display: flex;
        flex-wrap: wrap;
    }
</style>