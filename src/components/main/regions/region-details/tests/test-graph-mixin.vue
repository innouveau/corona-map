<script>
    import View from "@/classes/View";

    export default {
        name: 'test-graph-mixin',
        components: {},
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
                id
            }
        },
        computed: {
            canvas() {
                return document.getElementById('canvas-' + this.id);
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            // settings
            offset() {
                return this.view.offset;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            // dimensions
            step() {
                if (this.mapType === 'signaling') {
                    return this.$store.state.settings.step;
                } else {
                    return 2.5 * this.$store.state.settings.step;
                }
            },
            width() {
                return this.length * this.step;
            },
            canvasWidth() {
                return this.width + this.paddingRight;
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
            // days() {
            //     return this.report.history.filter(day => {
            //         return day.offset <= this.min && day.offset >= this.max;
            //     })
            // },
            isColorblind() {
                return this.colorSet === 'colorblind1';
            },
            report() {
                return this.region.report
            }
        },
        methods: {
            clear() {
                let ctx = this.ctx;
                ctx.clearRect(0, 0, this.canvasWidth, this.height);
            },
            drawBackground() {
                let ctx = this.ctx;
                ctx.rect(0, 0, this.width, (this.height - this.paddingBottom));
                ctx.fillStyle = '#ddd';
                ctx.fill();
            },
            drawDates() {
                let ctx, weeks, index;
                index = 0;
                ctx = this.ctx;
                weeks = Array.from(Array(this.weeks + 1).keys());
                ctx.font = '12px Arial';

                ctx.fillStyle = '#000';
                for (let week of weeks) {
                    let dateString, x, y, offset;
                    offset = (this.offset * this.currentMap.settings.testDataInterval) + ((this.weeks - week) * 7);
                    dateString = this.$store.getters['ui/getDateByOffset'](offset, 'd/M');
                    x = this.step * week * 7;
                    y = this.height - 4;
                    if (index === 0) {
                        ctx.textAlign = 'left';
                    } else if (index === weeks.length - 1) {
                        ctx.textAlign = 'right';
                    } else {
                        ctx.textAlign = 'center';
                    }
                    ctx.fillText(dateString, x, y);
                    index++;
                }
            },
            drawGrid() {
                let ctx, set;
                ctx = this.ctx;
                set = Array.from(Array(7 * this.weeks).keys());
                for (let i of set) {
                    let x = i * this.step;
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = (i % 7 === 0) ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, (this.height - this.paddingBottom));
                    ctx.stroke();
                    ctx.closePath();
                }
            },
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


<template></template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .test-graph-mixin {

    }
</style>