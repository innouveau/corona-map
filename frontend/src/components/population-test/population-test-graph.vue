<script>
    import d3TestGraphMixin from '@/mixins/d3-test-graph-mixin';

    export default {
        name: 'population-test-graph',
        components: {},
        props: {},
        mixins: [d3TestGraphMixin],
        data() {
            return {
                mapType: 'population-test-graph'
            }
        },
        computed: {
            title() {
                return 'Population tests'
            }
        },
        methods: {
            redraw() {
                this.clear();
                this.drawBackground('#f5eedc');
                this.drawGrid();
                if (this.days.length > 0) {
                    this.drawPcrTestsBars('positiveTests','rgba(0,0,0,0.15)');
                    this.drawAntigenTestsBars('rgba(255,0,0,0.5)');
                    // this.drawTestsLine('positiveAntigenTests', true, false, '#ff0000');
                    // this.drawTestsLine('positiveTests', true, false, '#000');
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
    <div class="population-test-graph">
        <div
            ref="container"
            class="administered-tests__container">
            <svg :style="{width: canvasWidth + 'px', height: canvashHeight + 'px'}"></svg>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .population-test-graph {

    }
</style>