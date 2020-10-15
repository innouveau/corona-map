<script>
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
        }
    }
</script>


<template></template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .d3-graph-mixin {

    }
</style>