<script>
    export default {
        name: 'time-slider-stop',
        components: {},
        props: {
            x: {
                type: Number,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div
        :style="{'left': x + '%'}"
        class="time-slider-stop"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-stop {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #000;
        top: calc(50% - 1px);
        transform: translate(-50%, -50%);
    }
</style>