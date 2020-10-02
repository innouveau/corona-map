<script>
    import _Region from "@/classes/_Region";
    import testGraphMixin from "./test-graph-mixin";

    export default {
        name: 'positive-tests',
        components: {},
        mixins: [testGraphMixin],
        props: {
            region: {
                type: _Region,
                required: true
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
                if (this.thresholds) {
                    this.drawThresholds();
                    this.drawGrid();
                }

                if (this.getDays().length > 0) {
                    this.drawTrendLine();
                }
                if (this.thresholds) {
                    this.drawDates();
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
            drawTrendLine() {
                let ctx, step, start, report, days;
                ctx = this.ctx;
                step = this.step;

                const getY = (day) => {
                    // for the graph we always use 100000, independent from the signaling system
                    let relativeValue = 100000 * (day.positiveTests / this.currentMap.settings.testDataInterval) / this.region.getTotalPopulation();
                    return (this.height - this.paddingBottom) - (relativeValue * this.zoom);
                };

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                // draw 1 point extra, this point is out of the graph on the leftside
                start = 1;


                days = this.getDays();

                ctx.moveTo(this.getX(days[0]), getY(days[0]));
                days = days.slice(1);
                for (let day of days) {
                    ctx.lineTo(this.getX(day), getY(day));
                }
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
</script>


<template>
    <div class="positive-tests">
        <div class="positive-tests__title">
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