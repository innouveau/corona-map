<script>
    import sewageToolsregio from "./sewage-tools-regio";

    export default {
        name: 'sewage-tools-regios',
        components: {
            sewageToolsregio
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
        methods: {
            toggle() {
                if (this.settings.regios.length === 0) {
                    for (let regio of this.regios) {
                        this.settings.regios.push(regio.regio_title)
                    }
                } else {
                    this.settings.regios = [];
                }
            }
        }
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