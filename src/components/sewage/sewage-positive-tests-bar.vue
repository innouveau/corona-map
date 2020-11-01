<script>
    export default {
        name: 'sewage-positive-tests-bar',
        components: {},
        props: {
            positiveTest: {
                type: Number,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div
        :style="{
            'height': positiveTest + 'px',
            'width': settings.width + 'px',
            'margin-right': settings.margin + 'px'
            }"
        :title="Math.round(positiveTest)"
        class="sewage-positive-tests-bar">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-positive-tests-bar {
        background: red;
    }
</style>