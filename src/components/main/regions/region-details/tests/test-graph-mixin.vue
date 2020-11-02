<script>
    import View from "@/classes/View";
    import * as d3 from "d3";
    import d3GraphMixin from '@/mixins/d3-graph-mixin';

    export default {
        name: 'test-graph-mixin',
        components: {},
        mixins: [d3GraphMixin],
        props: {
            view: {
                type: View,
                required: true
            },
            weeks: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: false,
                default: 220
            },
            zoom: {
                type: Number,
                required: false,
                default: 3
            },
            thresholds: {
                type: Boolean,
                required: false,
                default: true
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
            }
        },
        data() {
            let id = Math.round(Math.random() * 1000000);
            return {
                id,
                svg: null,
                gridContainer: null,
                lineContainer: null,
            }
        },
        computed: {
            // settings
            appliedZoom() {
                if (this.currentMap.settings.positiveTestGraph && this.currentMap.settings.positiveTestGraph.zoomFactor) {
                    return this.zoom * this.currentMap.settings.positiveTestGraph.zoomFactor;
                } else {
                    return this.zoom;
                }
            },
            offset() {
                return this.view.offset;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            // dimensions
            step() {
                if (this.mapType === 'change' || this.stepWide) {
                    return 1.5 * this.$store.state.settings.step;
                } else {
                    return this.$store.state.settings.step;
                }
            },
            width() {
                return this.length * this.step;
            },
            canvasWidth() {
                return this.width + this.paddingRight;
            },
            canvashHeight() {
                return this.height + this.paddingBottom;
            },
            length() {
                return this.weeks * 7;
            },
            min() {
                return this.offset + (this.length / this.currentMap.settings.testDataInterval);
            },
            max() {
                return this.offset;
            },
            isColorblind() {
                return this.colorSet === 'colorblind1';
            },
            report() {
                return this.region.report
            }
        },
        methods: {
            init() {
                this.svg = d3.select(this.$refs.container).select('svg');
                this.backgroundContainer = this.svg.append('g').attr('class', 'background-container');
                this.contentContainer = this.svg.append('g').attr('class', 'content-container');
                this.gridContainer = this.svg.append('g').attr('class', 'grid-container');
                this.lineContainer = this.svg.append('g').attr('class', 'line-container');
                this.textContainer = this.svg.append('g').attr('class', 'text-container');
                this.datesContainer = this.svg.append('g').attr('class', 'dates-container');
                this.redraw();
            },
            clear() {
                this.lineContainer.selectAll('*').remove();
                this.textContainer.selectAll('*').remove();
                this.contentContainer.selectAll('*').remove();
                this.datesContainer.selectAll('*').remove();
                this.backgroundContainer.selectAll('*').remove();
            },
            drawBackground(color) {
                this.backgroundContainer.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .attr('fill', color);
            },
            drawDates() {
                let weeks, index;
                index = 0;
                weeks = Array.from(Array(this.weeks + 1).keys());
                for (let week of weeks) {
                    let dateString, x, y, offset;
                    offset = (this.offset * this.currentMap.settings.testDataInterval) + ((this.weeks - week) * 7);
                    dateString = this.$store.getters['ui/getDateByOffset'](offset, 'd/M');
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

            // business logic
            getX(day) {
                let offset = day.offset - this.offset;
                return this.width - (this.step * this.currentMap.settings.testDataInterval * offset);
            },
            getDays() {
                let report, module, days;
                report = this.region.report;
                if (!report) {
                    report = this.region.getTotalReport();
                    module = this.$store.getters['ui/module'];
                    this.$store.commit(module +'/updatePropertyOfItem', {item: this.region, property: 'report', value: report});

                }
                days = report.history.filter(day => {
                    return day.positiveTests !== null && day.offset <= this.min && day.offset >= this.max;
                });
                return days;
            },
        },
        mounted() {
            this.init();
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


<template></template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .test-graph-mixin {

    }
</style>