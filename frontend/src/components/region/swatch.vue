<script>
    export default {
        name: 'swatch',
        components: {},
        props: {
            threshold: {
                type: Object | null,
                required: true
            }
        },
        computed: {
            systemColor() {
                return this.$store.state.ui.color;
            },
            color() {
                return this.threshold ? this.threshold.color[this.systemColor] : '#ddd';
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{'background-color': color}"
        class="swatch"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .swatch {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #555;
    }
</style>
