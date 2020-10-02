<script>
    import languageButton from "./language-button";
    import translate from "@/components/elements/translate";

    export default {
        name: 'language-switch',
        components: {
            translate,
            languageButton
        },
        props: {},
        computed: {
            languages() {
                return this.$store.state.languages.all;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="language-switch">
        <div class="language-switch__label">
            <translate :word="'language'"/>:
        </div>
        <div class="language-switch__buttons">
            <language-button
                    v-for="language in languages"
                    :language="language"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .language-switch {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;
        height: 24px;

        .language-switch__label {
            border-right: 1px solid #ddd;
            padding: 0 16px;
            height: 100%;
            display: flex;
            align-items: center;
        }

        .language-switch__buttons {
            display: flex;
            align-items: center;
            margin-bottom: -2px;
            padding: 16px;
            height: 100%;
        }

        @include mobile() {

            .language-switch__label {
                display: none;
            }
        }
    }
</style>