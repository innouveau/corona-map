<script>
    import d3TestGraphMixin from '@/mixins/d3-test-graph-mixin';
    import _Region from "@/classes/region/_Region";

    export default {
        name: 'speed-test-graph',
        components: {},
        props: {
            region: {
                type: _Region,
                required: true
            },
            weeks: {
                type: Number,
                required: true
            }
        },
        mixins: [d3TestGraphMixin],
        data() {
            return {
                mapType: 'speed-test-graph'
            }
        },
        computed: {
            title() {
                return 'Speed tests'
            }
        },
        methods: {
            redraw() {
                this.clear();
                this.drawBackground('#f5eedc');
                this.drawGrid();
                if (this.getDays().length > 0) {
                    this.drawPcrTestsBars('rgba(0,0,0,0.15)');
                    this.drawAntigenTestsBars('rgba(255,0,0,0.5)');
                    this.drawTestsLine('cumulative', true, false, '#ff0000');
                    this.drawTestsLine('positiveTests', true, false, '#000');
                }
                this.drawDates();
            }
        },
        mounted() {
            this.redraw();
        },
        watch: {
            offset: {
                handler: function(newValue) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            }
        }
    }
</script>


<template>
    <div class="speed-test-graph">
        <div
            ref="container"
            class="administered-tests__container">
            <svg :style="{width: canvasWidth + 'px', height: canvashHeight + 'px'}"></svg>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .speed-test-graph {

    }
</style>