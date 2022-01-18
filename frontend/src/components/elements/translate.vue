<script>
    import translateTool from '@/tools/translate';

    export default {
        name: 'translate',
        props: {
            word: {
                type: String,
                required: true
            },
            n: {
                type: Number,
                required: false,
                default: 1
            }
        },
        computed: {
            translated() {
                return translateTool.translate(this.word, this.n);
            }
        }
    }
</script>


<template>
    <span>
        {{translated}}
    </span>
</template>


<style lang="scss"></style>
