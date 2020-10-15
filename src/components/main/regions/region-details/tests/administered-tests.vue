<script>
    import _Region from "@/classes/_Region";
    import testGraphMixin from './test-graph-mixin';
    import * as d3 from "d3";

    export default {
        name: 'administered-tests',
        components: {},
        mixins: [testGraphMixin],
        props: {
            region: {
                type: _Region,
                required: true
            },
            stepWide: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                mapType: 'administered-tests'
            }
        },
        computed: {
            title() {
                let title = '';
                title += this.translate('percentage', true) + ' ';
                title += this.translate('positive-tests');
                return title;
            }
        },
        methods: {
            redraw() {
                this.clear();
                this.drawBackground('#ddd');
                this.drawGrid();
                this.drawMaxLine();
                if (this.getDays().length > 0) {
                    this.drawLine();
                    this.drawValues();
                }
                this.drawDates();
            },
            drawLine() {
                let points, days, lineFunction;

                const getY = (day) => {
                    return this.getY(this.getPercentage(day));
                };


                days = this.getDays();
                points = days.map(day => {
                    return {
                        x: this.getX(day),
                        y: getY(day)
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

            },
            drawValues() {
                let days, index;
                index = 0;
                days = this.getDays();

                for (let day of days) {
                    let percentage, x, y, string;
                    percentage = this.getPercentage(day);
                    x = this.getX(day);
                    y = this.getY(percentage);
                    string = percentage.toFixed(1) + '%';
                    this.datesContainer.append('text')
                        .attr('x', x)
                        .attr('y', y - 12)
                        .attr('text-anchor', function(){
                            return index === 0 ? 'start' : 'middle';
                        })
                        .text(string)
                        .attr('font-size', '9px');
                    this.datesContainer.append('circle')
                        .attr('cx', x)
                        .attr('cy', y)
                        .attr('r', 2)
                        .attr('fill', '#000');
                    index++;

                }
            },
            getPercentage(day) {
                return 100 * day.positiveTests / day.administeredTests;
            },
            getY(percentage) {
                let maxPercentage, value, height;
                maxPercentage = 50;
                value = percentage / maxPercentage;
                height = this.height - this.paddingBottom;
                return (this.height - this.paddingBottom) - (value * height);
            },
            drawMaxLine() {
                let y, normValue, normColor, normString1, normString2;
                normString1 = 'WHO';
                normString2 = 'richtlijn';
                normValue = 5;
                normColor = 'red';
                y = this.getY(normValue);

                this.contentContainer.append('line')
                    .attr('x1', 0)
                    .attr('y1', y)
                    .attr('x2', this.width)
                    .attr('y2', y)
                    .attr('stroke', 'red')
                    .attr('stroke-dasharray', [2,2]);
                this.contentContainer.append('text')
                    .attr('x', this.width + 6)
                    .attr('y', y)
                    .text(normString1)
                    .attr('font-size', '9px');
                this.contentContainer.append('text')
                    .attr('x', this.width + 6)
                    .attr('y', y + 12)
                    .text(normString2)
                    .attr('font-size', '9px');
            }
        },
        mounted() {
            this.redraw();
        },
        watch: {
            region: function (newValue, oldValue) {
                if (this.region) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            },
            offset: {
                handler: function(newValue) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            },
            colorSet: {
                handler: function(newValue) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            },
            signalingSystem: {
                handler: function() {
                    this.redraw();
                }
            }
        }
    }
</script>


<template>
    <div class="administered-tests">
        <div class="administered-tests__title">
            {{title}}
        </div>
        <div
            ref="container"
            class="administered-tests__container">
            <svg :style="{width: canvasWidth + 'px', height: canvashHeight + 'px'}"></svg>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .administered-tests {

        .administered-tests__title {
            margin-bottom: 4px;
        }
    }
</style>