<script>
    import d3TestGraphMixin from '@/mixins/d3-test-graph-mixin';

    export default {
        name: 'positive-pcr-tests-change',
        components: {},
        mixins: [d3TestGraphMixin],
        props: {},
        computed: {
            title() {
                return this.translate('positive-tests', true);
            },
            mapType() {
                return 'change';
            }
        },
        methods: {
            redraw() {
                this.clear();
                this.drawBackground('pink');
                this.drawWeekAverageLines();
                this.drawDoublingLines();
                this.drawGrid();
                if (this.getDays().length > 0) {
                    this.drawPcrTestsLine(false, false);
                }
                this.drawDates();
            },
            drawDoublingLines() {
                let baseY, doublings, baseOffset, heightGraph, cases;
                heightGraph = this.height;
                doublings = [0.25, 0.5, 1, 2, 4];
                cases = this.region.getIncreaseOfType((this.view.offset + 7), 7, 'positiveTests', true);
                baseY = this.valueToY(cases / 7);

                if (baseY > 0.75 * heightGraph) {
                    doublings = doublings.slice(1);
                }
                if (baseY > 0.9 * heightGraph) {
                    doublings = doublings.slice(1);
                }
                if (baseY > 0.97 * heightGraph) {
                    doublings = doublings.slice(1);
                }
                baseOffset = heightGraph - baseY;

                for (let doubling of doublings) {
                    let y = heightGraph -  (doubling * baseOffset);

                    this.contentContainer.append('line')
                        .attr('x1', (this.weeks - 1) * this.width / this.weeks)
                        .attr('y1', y)
                        .attr('x2', this.width)
                        .attr('y2', y)
                        .attr('stroke', '#000')
                        .attr('stroke-dasharray', [2,2]);
                    this.contentContainer.append('text')
                        .attr('x', this.width + 6)
                        .attr('y', y + 4)
                        .text('× ' + doubling)
                }
            },
            drawWeekAverageLines() {
                let weeks = [0,1,2];
                for (let week of weeks) {
                    let cases, y, offset;
                    offset = (this.weeks - week - 1) * 7;
                    cases = this.region.getIncreaseOfType((this.view.offset + offset), 7, 'positiveTests', true);
                    y = this.valueToY(cases / 7);
                    this.contentContainer.append('rect')
                        .attr('x', week * (this.width / this.weeks))
                        .attr('y', y)
                        .attr('width', this.width / this.weeks)
                        .attr('height', this.height - y)
                        .attr('fill', 'rgba(0,0,0,0.2)');
                }
            }
        }
    }
</script>


<template>
    <div class="pcr-tests-change">
        <div
            v-if="weeks > 2"
            class="positive-tests__title">
            {{title}}
        </div>
        <div
            ref="container"
            class="positive-tests__container">
            <svg :style="{width: canvasWidth + 'px', height: canvashHeight + 'px'}"></svg>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .pcr-tests-change {

    }
</style>