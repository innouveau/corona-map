<script>
    import dateTools from '@/tools/date';
    import View from "@/classes/View";

    export default {
        name: 'time-slider-stop',
        components: {},
        props: {
            stop: {
                type: String,
                required: true
            },
            l: {
                type: Number,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            offset() {
                return dateTools.getDateOffset(this.$store.state.ui.todayInMs, new Date(this.stop).getTime()) / this.$store.state.maps.current.data.positivePcrTests.interval;
            },
            x() {
                return 100 - (100 * this.offset/this.l);
            },
            done() {
                return this.view.offset < this.offset;
            }
        },
        methods: {
            select() {
                this.view.offset = this.offset;
            }
        }
    }
</script>


<template>
    <div
        @click="select()"
        :style="{'left': x + '%'}"
        :class="{'time-slider-stop--done': done}"
        class="time-slider-stop"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider-stop {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: 1px solid #aaa;
        background: #fff;
        top: calc(50% - 1px);
        transform: translate(-50%, -50%);

        &.time-slider-stop--done {
            background: #000;
            border: 1px solid #000;
        }
    }
</style>