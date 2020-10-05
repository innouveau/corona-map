<script>
    import translate from "@/components/elements/translate";

    export default {
        name: 'gradient-toggle',
        components: {
            translate
        },
        props: {},
        computed: {
            gradient: {
                get() {
                    return this.$store.state.settings.gradient;
                },
                set(value) {
                    this.$store.commit('settings/updateProperty', {key: 'gradient', value: !this.gradient});
                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="gradient-toggle">
        <input
            type="checkbox"
            v-model="gradient"/>

        <translate :word="'gradient'"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .gradient-toggle {
        display: flex;
        align-items: center;
        margin-top: 2px;

        input {
            pointer-events: all;
        }
    }
</style>