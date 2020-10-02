<script>
    import _Region from "@/classes/_Region";
    import testGraphMixin from './test-graph-mixin';

    export default {
        name: 'administered-tests',
        components: {},
        mixins: [testGraphMixin],
        props: {
            region: {
                type: _Region,
                required: true
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
                this.drawBackground();
                this.drawGrid();
                this.drawMaxLine();
                if (this.getDays().length > 0) {
                    this.drawLine();
                    this.drawValues();
                }
                this.drawDates();
            },
            drawBackground() {
                let ctx = this.ctx;
                ctx.beginPath();
                ctx.rect(0, 0, this.width, (this.height - this.paddingBottom));
                ctx.fillStyle = '#ddd';
                ctx.fill();
            },
            drawLine() {
                let ctx, step, history, start, days;
                ctx = this.ctx;
                step = this.step;
                history = this.region.getTotalReport().history;

                const getY = (day) => {
                    return this.getY(this.getPercentage(day));
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
            },
            drawValues() {
                let days, ctx, index;
                index = 0;
                days = this.getDays();
                ctx = this.ctx;

                ctx.font = '10px Arial';
                for (let day of days) {
                    let percentage, x, y, string;
                    percentage = this.getPercentage(day);
                    x = this.getX(day);
                    y = this.getY(percentage);
                    string = percentage.toFixed(1) + '%';
                    if (index === 0) {
                        ctx.textAlign = 'left';
                    } else {
                        ctx.textAlign = 'center';
                    }
                    ctx.fillStyle = '#000';
                    ctx.fillText(string, x, (y - 10));
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, (Math.PI * 2), false);
                    ctx.stroke();
                    ctx.fill();
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
                let ctx, y, normValue, normColor, normString1, normString2;
                normString1 = 'WHO';
                normString2 = 'richtlijn';
                normValue = 5;
                normColor = 'red';
                ctx = this.ctx;
                ctx.lineWidth = 1;
                ctx.strokeStyle = normColor;
                ctx.textAlign = 'left';
                y = this.getY(normValue);
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(this.width, y);
                ctx.stroke();
                ctx.closePath();
                ctx.fillStyle = normColor;
                ctx.fillText(normString1, (this.width + 6), (y));
                ctx.fillText(normString2, (this.width + 6), (y + 12));
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
        <canvas
                :id="'canvas-' + id"
                :width="canvasWidth"
                :height="height"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .administered-tests {

        .administered-tests__title {
            margin-bottom: 4px;
        }

        canvas {
        }
    }
</style>