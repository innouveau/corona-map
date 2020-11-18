<script>
    import dateTools from '@/tools/date';

    export default {
        name: 'd3-graph-mixin',
        components: {},
        props: {},
        computed: {},
        methods: {
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
            drawDates() {
                let weeks, index;
                index = 0;
                weeks = Array.from(Array(this.weeks + 1).keys());
                for (let week of weeks) {
                    let dateString, x, y, offset;
                    offset = this.offset + ((this.weeks - week) * (7 / this.currentMap.data.positivePcrTests.interval));
                    dateString = dateTools.getDateByOffset(offset).split('-').slice(1,3).join('-');
                    x = this.step * week * 7;
                    y = this.height - 4;
                    this.datesContainer.append('text')
                        .attr('x', x)
                        .attr('y', y + 16)
                        .attr('text-anchor', function(){
                            return index === 0 ? 'start' : 'middle';
                        })
                        .text(dateString)
                        .attr('font-size', '11px');
                    index++;
                }
            },
        }
    }
</script>


<template></template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .d3-graph-mixin {

    }
</style>