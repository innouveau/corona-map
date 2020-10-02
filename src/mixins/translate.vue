<script>
    import translateTool from '@/tools/translate';

    export default {
        name: 'translate-mixin',
        components: {},
        props: {},
        computed: {},
        methods: {
            translate(word) {
                return translateTool.translate(word);
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