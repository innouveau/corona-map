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
            framesBefore: {
                type: Number,
                required: true
            },
            framesAfter: {
                type: Number,
                required: false,
                default: 0
            },
            // ui
            zoom: {
                type: Number,
                required: false,
                default: 3
            },
            thresholds: {
                type: Boolean,
                required: false,
                default: true
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
            totalFrames(){
                return this.framesBefore + this.framesAfter;
            },
            signalingSystem() {
                return this.$store.getters['signalingSystems/getItemById'](this.view.currentSource.signalingSystem_id);
            },
            colorSet() {
                return this.$store.state.ui.color;
            },
            isColorblind() {
                return this.colorSet === 'colorblind1';
            },
            appliedZoom() {
                let z;
                if (this.currentMap.settings.positiveTestGraph && this.currentMap.settings.positiveTestGraph.zoomFactor) {
                    z = this.zoom * this.currentMap.settings.positiveTestGraph.zoomFactor / this.frameSize;
                } else {
                    z = this.zoom / this.frameSize;
                }
                if (this.view.currentSource.key === 'hospitalisations') {
                    z *= 5;
                } else if (this.view.currentSource.key === 'deceased') {
                    z *= 12;
                }
                return z;
            },
            offset() {
                return this.view.offset;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            frameSize() {
                return this.view.pcrWeekly ? 7 : 1;
            },
            // dimensions
            widthBefore() {
                return this.framesBefore * this.step;
            },
            widthAfter() {
                return this.framesAfter * this.step;
            },
            width() {
                return this.widthBefore + this.widthAfter;
            },
            canvasWidth() {
                return this.width + this.paddingRight;
            },
            canvashHeight() {
                return this.height + this.paddingBottom;
            },
            min() {
                return this.offset + (this.frameSize * this.framesBefore);
            },
            max() {
                return this.offset - (this.frameSize * this.framesAfter);
            },
            report() {
                return this.region.report
            },
            frameOffsetPoints() {
                let frames = Array.from(Array(this.totalFrames + 1).keys());
                return frames.map(frame => {
                    return this.min - (frame * this.frameSize);
                });
            },
            days() {
                let report = this.region.report;
                if (!report) {
                    report = this.region.getTotalReport();
                    this.$store.commit(this.region.module +'/updatePropertyOfItem', {item: this.region, property: 'report', value: report});
                }
                return this.frameOffsetPoints.map(offset => {
                    return report.history.find(day => day.offset === offset);
                }).filter(day => day !== undefined);
            },
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
                            // prevent zero
                            height = Math.max((this.height - lastY), 0);
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
                return this.widthBefore - (this.step * offset);
            },
            drawTestsLine(sourceKey, smoothened, dotted, color) {
                let points, lineFunction;
                points = this.days.map(day => {
                    return {
                        x: this.getX(day),
                        y: this.getY(day, sourceKey, smoothened)
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
            drawTestsDots(sourceKey = 'pcr', smoothened, color) {
                for (let day of this.days) {
                    let x, y;
                    x = this.getX(day);
                    y = this.getY(day, sourceKey, smoothened);

                    this.lineContainer.append('circle')
                        .attr('cx', x)
                        .attr('cy', y)
                        .attr('r', 2)
                        .attr('fill', color);
                }
            },
            drawPcrTestsBars(sourceKey, color) {
                let index, margin;
                margin = 1;
                for (let day of this.days) {
                    if (day) {
                        let value, y, rect;
                        index = (this.min - day.offset) / this.frameSize;
                        value = this.getAbsoluteValue(day, sourceKey);
                        y = this.getY(day, sourceKey,false);
                        rect = this.lineContainer.append('rect')
                            .attr('x', (d) => {
                                return (index - 0.5) * this.step + margin;
                            })
                            .attr('y', y)
                            .attr('width', () => {
                                let last = index === this.totalFrames;
                                return last ? (0.5 * this.step) : (this.step - (2 * margin));
                            })
                            .attr('height', Math.max((this.height - y), 0))
                            .attr('fill', color);

                        rect.append('svg:title')
                            .text(value);
                    }
                }
            },
            drawAntigenTestsBars(color) {
                let size, index, margin;
                size = 1;
                margin = 1;
                for (let day of this.days) {
                    let value, rect, y, pcrHeight;
                    if (day) {
                        index = (this.min - day.offset) / this.frameSize;
                        value = this.getAbsoluteValue(day, 'positiveAntigenTests');
                        if (value > 0) {
                            pcrHeight = this.height - this.getY(day, 'positiveTests',false);
                            y = this.getY(day, 'positiveAntigenTests',false);
                            rect = this.lineContainer.append('rect')
                                .attr('x', (d) => {
                                    return (index - 0.5) * this.step + margin;
                                })
                                .attr('y', (y - pcrHeight))
                                .attr('width', () => {
                                    let last = index === this.totalFrames;
                                    return last ? (0.5 * this.step) : (this.step - (2 * margin));
                                })
                                .attr('height', (this.height - y))
                                .attr('fill', color);

                            rect.append('svg:title')
                                .text(value)
                        }

                    }
                }
            },
            getRelativeOfType(day, sourceKey) {
                let value;
                // for the graph we always use 100000, independent from the signaling system
                if (sourceKey !== 'cumulative') {
                    value = day[sourceKey]
                } else {
                    value = day['positiveTests'] + day['positiveAntigenTests'];
                }
                return 100000 * (value / this.currentMap.data.positivePcrTests.interval) / this.region.getTotalPopulation();
            },
            getAbsoluteValue(day, sourceKey) {
                let total, index;
                if (this.frameSize === 1) {
                    return day[sourceKey];
                } else {
                    // get sum of 7 days
                    total = 0;
                    index = this.region.report.history.indexOf(day);
                    if (index > -1) {
                        for (let i = index - 6; i < (index + 1); i++) {
                            let d = this.region.report.history[i];
                            if (d) {
                                total += d[sourceKey];
                            } else {
                                console.error('coud not find day with index ' + index + ' for region ' + this.region.title);
                            }
                        }
                    }
                    return total;
                }
            },
            getY(day, sourceKey, smoothened) {
                let end, start, total, average, relativeValue, l,
                    steps, maxSteps;
                if (!smoothened) {
                    if (this.frameSize === 1) {
                        relativeValue = this.getRelativeOfType(day, sourceKey);
                    } else {
                        relativeValue = 100000 * this.getAbsoluteValue(day, sourceKey) / this.region.getTotalPopulation();
                    }
                } else {
                    total = 0;
                    steps = 7;
                    l = this.report.history.length;
                    maxSteps = Math.min(steps, (l - day.offset));
                    end = day.offset;
                    start = day.offset + (maxSteps - 1);
                    for (let i = start; i > (end - 1); i--) {
                        let d, value;
                        d = this.report.history[(l - 1) - i];
                        if (sourceKey === 'cumulative') {
                            value = d['positiveTests'] + d['positiveAntigenTests'];
                        } else {
                            value = d[sourceKey];
                        }
                        total += value / this.currentMap.data.positivePcrTests.interval;
                    }
                    average = total / maxSteps;
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