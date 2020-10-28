<script>
    import translateTool from '@/tools/translate';

    export default {
        name: 'translate-mixin',
        components: {},
        props: {},
        computed: {
            isoCode() {
                return this.$store.getters['languages/getCurrentIsoCode'];
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            }
        },
        methods: {
            translate(word, capitalize) {
                return translateTool.translate(word, capitalize);
            }
        }
    }
</script>


<template>
    <div class="translate">
        translate
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .translate {

    }
</style>