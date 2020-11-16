<script>
    import _Region from "@/classes/region/_Region";
    import testGraphMixin from "./test-graph-mixin";
    import changeTools from '@/tools/change';
    import * as d3 from "d3";

    export default {
        name: 'positive-tests',
        components: {},
        mixins: [testGraphMixin],
        props: {
            region: {
                type: _Region,
                required: true
            },
            mapType: {
                type: String,
                required: false,
                default: 'signaling'
            }
        },
        computed: {
            colorSet() {
                return this.$store.state.ui.color;
            },
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            isColorblind() {
                return this.colorSet === 'colorblind1';
            },
            title() {
                return this.translate('positive-tests', true);
            }
        },
        methods: {
            redraw() {
                this.clear();
                if (this.mapType === 'change') {
                    this.drawBackground('pink');
                }
                if (this.mapType === 'signaling') {
                    if (this.thresholds) {
                        this.drawThresholds();
                    } else {
                        this.drawBackground('#ddd');
                    }
                } else {
                    this.drawWeekAverageLines();
                    this.drawDoublingLines();
                }
                this.drawGrid();
                if (this.getDays().length > 0) {
                    this.drawTrendLine();
                }
                if (this.thresholds) {
                    this.drawDates();
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
            drawThresholds() {
                let lastY, thresholds;
                lastY = 0;
                thresholds = this.signalingSystem.thresholds;

                for (let threshold of thresholds) {
                    if (threshold.n > 0) {
                        let height, x, y;
                        if (threshold.n !== Infinity) {
                            height = (this.appliedZoom * threshold.n / this.signalingSystem.days) - lastY;
                            y = this.height  - lastY - height;
                        } else {
                            height = this.height - lastY;
                            y = 0;
                        }
                        this.contentContainer.append('rect')
                            .attr('x', 0)
                            .attr('y', y)
                            .attr('width', this.width)
                            .attr('height', height)
                            .attr('fill', threshold.color[this.$store.state.ui.color])
                            .attr('opacity', 0.5);
                        lastY += height;
                    }
                }
            },
            getY(day) {
                // for the graph we always use 100000, independent from the signaling system
                let relativeValue = 100000 * (day.positiveTests / this.currentMap.data.positivePcrTests.interval) / this.region.getTotalPopulation();
                return this.valueToY(relativeValue)
            },
            valueToY(value) {
                return this.height - (value * this.appliedZoom);
            },
            drawTrendLine() {
                let points, days, lineFunction;
                days = this.getDays();
                points = days.map(day => {
                    return {
                        x: this.getX(day),
                        y: this.getY(day)
                }
                });
                lineFunction = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; });

                this.lineContainer.append('path')
                    .attr('d', lineFunction(points))
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none');
            }
        }
    }
</script>


<template>
    <div class="positive-tests">
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

    .positive-tests {
        margin-bottom: 12px;

        .positive-tests__title {
            margin-bottom: 4px;
        }

        svg {
            font-size: 11px;
        }
    }
</style>