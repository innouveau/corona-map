<script>
    export default {
        name: 'p100p7',
        components: {},
        props: {
            size: {
                type: Number,
                required: false,
                default: 10
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div
        :style="{'height': size + 'px'}"
        class="p100p7">
        <img src="assets/img/p100p7.svg"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .p100p7 {
        display: inline-block;
        position: relative;
        top: 2px;

        img {
            height: 100%;
            display: block;
        }
    }
</style>