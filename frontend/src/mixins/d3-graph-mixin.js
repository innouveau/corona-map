import dateTools from '@/tools/date';

export default {
    name: 'd3-graph-mixin',
    components: {},
    props: {
        step: {
            type: Number,
            required: false,
            default() {
                return this.$store.state.settings.step;
            }
        },
        paddingBottom: {
            type: Number,
            required: false,
            default: 20
        },
        paddingRight: {
            type: Number,
            required: false,
            default: 80
        },
        height: {
            type: Number,
            required: false,
            default: 220
        },
    },
    computed: {},
    methods: {
        drawGrid() {
            let set = Array.from(Array(this.totalFrames).keys());
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
                    if (this.framesAfter > 0 && (d / 7) === this.framesBefore) {
                        return 'blue';
                    } else {
                        return (d % 7 === 0 && this.frameSize !== 7) ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
                    }
                })
                .attr('stroke-width', 1);
        },
        drawDates() {
            let index, offsets;
            offsets = this.days.map(d => d.offset);
            for (let offset of offsets) {
                let dateString, x, y, g;
                if (offset >= 0) {
                    if (this.frameSize === 7 || (offset - this.max) % 7 === 0 || this.currentMap.data.positivePcrTests.interval === 7) {
                        dateString = dateTools.getDateByOffset(offset).split('-').slice(1,3).join('-');
                        index = (this.min - offset) / this.frameSize;
                        x = this.step * index;
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
                            .attr('text-anchor', function() {
                                if (index === 0) {
                                    return 'start';
                                } else if (index === offsets.length - 1) {
                                    return 'end';
                                } else {
                                    return 'middle';
                                }
                            })
                            .attr('y', 20)
                            .text(dateString)
                            .attr('font-size', '9px');

                        if (this.framesAfter > 0 && this.offset === offset) {
                            g.append('polygon')
                                .attr('points', '0,0 5,8, -5,8')
                                .attr('fill', 'blue');
                        }
                    }
                }
            }
        }
    }
}
