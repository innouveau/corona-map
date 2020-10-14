<script>
    import _Region from "@/classes/_Region";
    import testGraphMixin from "./test-graph-mixin";
    import changeTools from '@/tools/change';

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
                setTimeout(() =>{
                    if (this.thresholds) {
                        if (this.mapType === 'signaling') {
                            this.drawThresholds();
                        } else {
                            this.drawBackground();
                            setTimeout(() => {
                                this.drawWeekAverageLines();
                                this.drawDoublingLines();
                            }, 1)

                        }
                        this.drawGrid();
                    }

                    if (this.getDays().length > 0) {
                        this.drawTrendLine();
                    }
                    if (this.thresholds) {
                        this.drawDates();
                    }
                }, 10)

            },
            drawWeekAverageLines() {
                let weeks, ctx;
                ctx = this.ctx;
                ctx.strokeStyle = 'blue';
                weeks = [0,1];
                for (let week of weeks) {
                    let cases, y, offset;
                    offset = (this.weeks - week - 1) * 7;
                    cases = this.region.getTotalRelativeIncreaseWeek(offset, this.view.offset);
                    y = this.valueToY(cases / 7);
                    ctx.beginPath();
                    ctx.moveTo(week * (this.width / 2), y);
                    ctx.lineTo((week + 1) * (this.width / 2), y);
                    //ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.closePath();
                }

            },
            drawDoublingLines() {
                let baseY, ctx, doublings, baseOffset, heightGraph, cases;
                heightGraph = this.height - this.paddingBottom;
                doublings = [0.25, 0.5, 1, 2, 4];
                ctx = this.ctx;
                cases = this.region.getTotalRelativeIncreaseWeek(7, this.view.offset);
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
                ctx.lineWidth = 1;
                ctx.fillStyle = '#000';
                ctx.strokeStyle = '#888';
                for (let doubling of doublings) {
                    let y = heightGraph -  (doubling * baseOffset);
                    ctx.beginPath();
                    ctx.moveTo((this.width / 2), y);
                    ctx.lineTo(this.width, y);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.textAlign = 'left';

                    ctx.fillText('× ' + doubling, this.width + 6, y + 4);
                }


            },
            drawThresholds() {
                let lastY, ctx, thresholds;
                lastY = 0;
                ctx = this.ctx;
                thresholds = this.signalingSystem.thresholds;
                if (!this.isColorblind) {
                    ctx.globalAlpha = 0.5;
                }
                for (let threshold of thresholds) {
                    if (threshold.n > 0) {
                        let height, x, y;
                        ctx.beginPath();
                        if (threshold.n !== Infinity) {
                            height = (this.zoom * threshold.n / this.signalingSystem.days) - lastY;
                            y = (this.height - this.paddingBottom) - lastY - height;
                        } else {
                            height = (this.height - this.paddingBottom) - lastY;
                            y = 0;
                        }
                        ctx.rect(0, y, this.width, height);
                        ctx.fillStyle = threshold.color[this.$store.state.ui.color];
                        ctx.closePath();
                        ctx.fill();
                        lastY += height;
                    }
                }
                ctx.globalAlpha = 1;
            },
            getY(day) {
                // for the graph we always use 100000, independent from the signaling system
                let relativeValue = 100000 * (day.positiveTests / this.currentMap.settings.testDataInterval) / this.region.getTotalPopulation();
                return this.valueToY(relativeValue)
            },
            valueToY(value) {
                return (this.height - this.paddingBottom) - (value * this.zoom);
            },
            drawTrendLine() {
                let ctx, step, start, report, days;
                ctx = this.ctx;
                step = this.step;

                ctx.beginPath();
                ctx.lineWidth = 1;
                if (this.mapType === 'signaling') {
                    ctx.strokeStyle = 'black';
                } else {
                    ctx.strokeStyle = '#888';
                    ctx.setLineDash([3,3]);
                }

                // draw 1 point extra, this point is out of the graph on the leftside
                start = 1;


                days = this.getDays();

                ctx.moveTo(this.getX(days[0]), this.getY(days[0]));
                days = days.slice(1);
                for (let day of days) {
                    ctx.lineTo(this.getX(day), this.getY(day));
                }
                ctx.stroke();
                ctx.closePath();
                ctx.setLineDash([])
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
        <canvas
            :id="'canvas-' + id"
            :width="canvasWidth"
            :height="height"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .positive-tests {
        margin-bottom: 12px;

        .positive-tests__title {
            margin-bottom: 4px;
        }

        canvas {
        }
    }
</style>