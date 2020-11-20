<script>
    import dateTools from '@/tools/date';

    export default {
        name: 'd3-graph-mixin',
        components: {},
        props: {
            weeksAfter: {
                type: Number,
                required: false,
                default: 0
            }
        },
        computed: {},
        methods: {
            drawGrid() {
                let set = Array.from(Array(7 * this.totalWeeks).keys());
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
                        if (this.weeksAfter > 0 && (d / 7) === this.weeksBefore) {
                            return 'blue';
                        } else {
                            return (d % 7 === 0) ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
                        }
                    })
                    .attr('stroke-width', 1);
            },
            drawDates() {
                let weeks, index;
                index = 0;
                weeks = Array.from(Array(this.totalWeeks + 1).keys());
                for (let week of weeks) {
                    let dateString, x, y, offset, g;
                    offset = this.offset + ((this.weeksBefore - week) * (7 / this.currentMap.data.positivePcrTests.interval));
                    if (offset >= 0) {
                        dateString = dateTools.getDateByOffset(offset).split('-').slice(1,3).join('-');
                        x = this.step * week * 7;
                        y = this.height;
                        g = this.datesContainer.append('g')
                            .attr('transform', 'translate(' + x + ',' + y + ')');

                        g.append('line')
                            .attr('x1', 0)
                            .attr('y1', 0)
                            .attr('x2', 0)
                            .attr('y2', 4)
                            .attr('stroke', 'rgba(0,0,0,0.5)');
                        g.append('text')
                            .attr('text-anchor', function(){
                                return index === 0 ? 'start' : 'middle';
                            })
                            .attr('y', 20)
                            .text(dateString)
                            .attr('font-size', '9px');

                        if (this.weeksAfter > 0 && this.offset === offset) {
                            g.append('polygon')
                                .attr('points', '0,0 5,8, -5,8')
                                .attr('fill', 'blue');
                        }

                        index++;
                    }
                }
            }
        }
    }
</script>


<template></template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .d3-graph-mixin {

    }
</style>