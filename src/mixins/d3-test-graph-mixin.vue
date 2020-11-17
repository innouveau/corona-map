<script>
    import View from "@/classes/View";
    import * as d3 from "d3";
    import d3GraphMixin from '@/mixins/d3-graph-mixin';
    import _Region from '@/classes/region/_Region';

    export default {
        name: 'test-graph-mixin',
        components: {},
        mixins: [d3GraphMixin],
        props: {
            region: {
                type: _Region,
                required: true
            },
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
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            colorSet() {
                return this.$store.state.ui.color;
            },
            isColorblind() {
                return this.colorSet === 'colorblind1';
            },
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
                return this.offset + (this.length / this.currentMap.data.positivePcrTests.interval);
            },
            max() {
                return this.offset;
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
            // business logic
            getX(day) {
                let offset = day.offset - this.offset;
                return this.width - (this.step * this.currentMap.data.positivePcrTests.interval * offset);
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
            drawTestsLine(source = 'pcr', smoothened, dotted, color) {
                let points, days, lineFunction;
                days = this.getDays();
                points = days.map(day => {
                    return {
                        x: this.getX(day),
                        y: this.getY(day, source, smoothened)
                    }
                });
                lineFunction = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; });

                this.lineContainer.append('path')
                    .attr('d', lineFunction(points))
                    .attr('stroke', color)
                    .attr('stroke-width', 1)
                    .attr('fill', 'none')
                    .attr('stroke-dasharray', () => {
                        return dotted ? [4,4] : [];
                    })
            },
            drawPcrTestsBars(color) {
                let days = this.getDays();

                for (let day of days) {
                    let y, rect;
                    y =  this.getY(day, 'positiveTests',false);
                    rect = this.lineContainer.append('rect')
                        .attr('x', (d) => {
                            return this.getX(day) - 0.5 * this.step
                        })
                        .attr('y', y)
                        .attr('width', () => {
                            let last = days.indexOf(day) === days.length - 1;
                            return last ? (0.5 * this.step) : this.step;
                        })
                        .attr('height', this.height - y)
                        .attr('fill', color);

                    rect.append('svg:title')
                        .text(day.positiveTests)
                }
            },
            drawAntigenTestsBars(color) {
                let days = this.getDays();

                for (let day of days) {
                    let pcrY,antigenY;
                    //pcrY =  this.getY(day, 'positiveTests', false);
                    pcrY =  0;
                    antigenY = this.getRelativeOfType(day, 'positiveAntigenTests') * this.appliedZoom;
                    if (antigenY > 0) {
                        let rect = this.lineContainer.append('rect')
                            .attr('x', (d) => {
                                return this.getX(day) - 0.5 * this.step
                            })
                            .attr('y', (this.height - antigenY))
                            .attr('width', () => {
                                let last = days.indexOf(day) === days.length - 1;
                                return last ? (0.5 * this.step) : this.step;
                            })
                            .attr('height', antigenY)
                            .attr('fill', color);

                        rect.append('svg:title')
                            .text(day.positiveAntigenTests)
                    }
                }
            },
            getRelativeOfType(day, source) {
                let value;
                // for the graph we always use 100000, independent from the signaling system
                if (source !== 'cumulative') {
                    value = day[source]
                } else {
                    value = day['positiveTests'] + day['positiveAntigenTests'];
                }
                return 100000 * (value / this.currentMap.data.positivePcrTests.interval) / this.region.getTotalPopulation();
            },
            getY(day, source, smoothened) {
                let end, start, total, average, relativeValue, l, steps, maxSteps;
                if (!smoothened) {
                    relativeValue = this.getRelativeOfType(day, source);
                } else {
                    total = 0;
                    steps = 3;
                    // todo fix threshold left
                    maxSteps = Math.min(steps, day.offset);
                    end = day.offset - maxSteps;
                    start = day.offset + maxSteps;
                    l = this.report.history.length - 1;
                    for (let i = start; i > (end - 1); i--) {
                        let d, value;
                        d = this.report.history[l - i];
                        if (source === 'cumulative') {
                            value = d['positiveTests'] + d['positiveAntigenTests'];
                        } else {
                            value = d[source];
                        }
                        total += value / this.currentMap.data.positivePcrTests.interval;
                    }
                    average = total / (maxSteps * 2 + 1);
                    relativeValue = 100000 * average / this.region.getTotalPopulation();
                }
                return this.valueToY(relativeValue);
            },
            valueToY(value) {
                return this.height - (value * this.appliedZoom);
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