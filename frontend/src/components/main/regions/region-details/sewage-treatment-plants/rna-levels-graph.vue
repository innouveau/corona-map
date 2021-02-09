<script>
    import SewageTreatmentPlant from '@/classes/SewageTreatmentPlant';
    import * as d3 from 'd3';
    import {format, sub} from 'date-fns'
    import View from "@/classes/View";

    export default {
        name: 'rna-levels-graph',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            },
            sewageTreatmentPlant: {
                type: SewageTreatmentPlant,
                required: true
            }
        },
        data() {
            return {
                svg: null,
                gridContainer: null,
                lineContainer: null,
                textContainer: null,
                height: 150,
                max: 10000
            }
        },
        computed: {
            // settings
            step() {
                return this.$store.state.settings.step;
            },
            weeks() {
                return this.$store.state.settings.weeks;
            },
            offset() {
                return this.view.offset;
            },
            width() {
                return this.weeks * 7 * this.step;
            },
            measurementsInRange() {
                let startIndex, endIndex, index;
                startIndex = null;
                endIndex = null;
                index = 0;
                for (let measurement of this.sewageTreatmentPlant.measurements) {
                    if (!startIndex && measurement.dateInMs >= this.startDateInMs) {
                        startIndex = index;
                    }
                    if (!endIndex && measurement.dateInMs > this.endDateInMs) {
                        endIndex = index;
                    }
                    index++;
                }
                // we want the starting index 1 point out of the range
                if (startIndex > 0) {
                    startIndex--;
                }
                // end falls in between range
                if (endIndex === null) {
                    endIndex = index;
                }
                return this.sewageTreatmentPlant.measurements.slice(startIndex, (endIndex + 1));
            },
            points() {
                return this.measurementsInRange.map(measurement => {
                    return {
                        x: this.getX(measurement.dateInMs),
                        y: this.getY(measurement),
                        measurement: measurement
                    }
                })
            },
            msPerDay() {
                return 1000 * 3600 * 24;
            },
            todayInMs() {
                return this.$store.state.ui.today.getTime();
            },
            startDateInMs() {
                return this.endDateInMs - (7 * this.weeks * this.msPerDay)
            },
            endDateInMs() {
                return this.todayInMs - (this.offset * this.msPerDay)
            },
            startDate() {
                return format(new Date(this.startDateInMs), 'EEEE d MMMM' );
            },
            endDate() {
                return format(new Date(this.endDateInMs), 'EEEE d MMMM' );
            }
        },
        methods: {
            init(){
                this.svg = d3.select(this.$refs.container).select('svg');
                this.gridContainer = this.svg.append('g').attr('class', 'grid-container');
                this.lineContainer = this.svg.append('g').attr('class', 'line-container');
                this.textContainer = this.svg.append('g').attr('class', 'text-container');
                this.draw();
            },
            draw() {
                this.clear();
                this.drawGraph();
            },
            clear() {
                this.lineContainer.selectAll('*').remove();
                this.textContainer.selectAll('*').remove();
            },
            getX(dateInMs) {
                let pct = (dateInMs - this.startDateInMs) / (this.endDateInMs - this.startDateInMs);
                return (this.width) * pct - (0.5 * this.step);
            },
            getY(measurement) {
                let value = measurement.valueFlowPer100000;
                return this.height - (value / this.max * this.height);
            },
            drawGraph() {
                this.drawGrid();
                this.drawBars();
                this.drawTexts();
            },
            // todo move stuff to d3-graph-mixin
            drawGrid() {
                let set = Array.from(Array(7 * this.weeks).keys());
                this.gridContainer.selectAll('line')
                    .data(set)
                    .enter()
                    .append('line')
                    .attr('x1', (d) => {
                        return d * this.step;
                    })
                    .attr('x2', (d) => {
                        return d * this.step;
                    })
                    .attr('y1', 0)
                    .attr('y2', this.height)
                    .attr('stroke', (d) => {
                        return (d % 7 === 0) ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
                    })
                    .attr('stroke-width', 1);
            },
            drawLine() {
                let lineFunction = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; });

                this.lineContainer.append('path')
                    .attr('d', lineFunction(this.points))
                    .attr('stroke', '#aaa')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none');
            },
            drawBars() {
                let width, minHeight;
                width = 3;

                // give the bar a min width
                // to show that there was a measurement
                minHeight = 2;
                this.lineContainer.selectAll('rect')
                    .data(this.points)
                    .enter()
                    .append('rect')
                    .attr('x', function(d) {
                        return d.x - (0.5 * width);
                    })
                    .attr('y', function(d) {
                        return d.y - minHeight;
                    })
                    .attr('width', width)
                    .attr('height', (d) => {
                        return (this.height - d.y) + minHeight;
                    })
            },
            drawPoints() {
                this.lineContainer.selectAll('circle')
                    .data(this.points)
                    .enter()
                    .append('circle')
                    .attr('cx', function(d) {
                        return d.x;
                    })
                    .attr('cy', function(d) {
                        return d.y;
                    })
                    .attr('r', 2);
            },
            drawTexts() {
                let buffer = this.width - 20;

                this.textContainer.selectAll('text')
                    .data(this.points.filter(point => point.x > 0 && point.x < this.width))
                    .enter()
                    .append('text')
                    .attr('x', function(d) {
                        return d.x;
                    })
                    .attr('y', function(d) {
                        return d.y - 15;
                    })
                    .attr('text-anchor', (d) => {
                        if (d.x < 10) {
                            return 'start'
                        } else if (d.x >= buffer) {
                            return 'end'
                        } else {
                            return 'middle';
                        }
                    })
                    .text(function(d) {
                        let value = Math.round(d.measurement.RNA_flow_per_100000 / 1000000);
                        return value;
                    });
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            sewageTreatmentPlant: function (newValue, oldValue) {
                if (this.sewageTreatmentPlant) {
                    setTimeout(() => {
                        this.draw();
                    })
                }
            },
            offset: {
                handler: function(newValue) {
                    setTimeout(() => {
                        this.draw();
                    })
                }
            }
        }
    }
</script>


<template>
    <div
        ref="container"
        class="rna-levels-graph">
        <svg :style="{width: width + 'px', height: height + 'px'}"></svg>
    </div>
</template>


<style lang='scss'>
    @import '@/styles/variables.scss';

    .rna-levels-graph {

        svg {
            background: #eee;

            .line-container {

                line {

                }

                circle {

                }
            }

            .text-container {

                text {
                    font-size: 9px;
                    fill: #555
                }
            }
        }
    }
</style>