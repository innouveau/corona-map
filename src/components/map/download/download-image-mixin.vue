<script>
    import thresholdTools from '@/tools/thresholds';
    import canvasTools from '@/tools/canvas';
    import changeTools from '@/tools/change';
    import numberTools from '@/tools/number';

    export default {
        name: 'download-image-mixin',
        components: {},
        props: {},
        computed: {
            regions() {
                return this.$store.getters['ui/regions'];
            },
            imageScale() {
                return 1;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            width() {
                return 1014 * this.imageScale;
            },
            height() {
                return 570 * this.imageScale;
            },
            body() {
                return document.getElementsByTagName("body")[0];
            },
            downloadLink() {
                return document.createElement('a');
            },
            canvas() {
                return document.createElement('canvas');
            },
            ctx() {
                return this.canvas.getContext("2d");
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            },
            gradient() {
                return this.$store.state.settings.gradient;
            }
        },
        methods: {
            getDateStringdashes(view) {
                return this.getDateString(view).replace(/\s/g , "-").toLowerCase();
            },
            getDateString(view) {
                return this.$store.getters['ui/getDateByOffset'](view.offset * this.currentMap.settings.testDataInterval, 'EE d MMM', this.currentLanguage.iso_code);
            },
            prepair() {
                this.canvas.id = 'image-for-download';
                this.canvas.width = this.width;
                this.canvas.height = this.height;

                canvasTools.addBackground(this.ctx, this.width, this.height);
            },
            addHead() {
                let width, height;
                width = 559 * this.imageScale;
                height = 57 * this.imageScale;
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    if (this.mapType === 'change') {
                        img.src = 'assets/img/corona-change.png';
                    } else {
                        img.src = 'assets/img/corona-signaling.png';
                    }
                    img.onload = () => {
                        this.ctx.drawImage(img, (30 * this.imageScale), (36 * this.imageScale), width, height);
                        resolve();
                    }
                });
            },
            addDate(view, x, y, addLine = true) {
                let ctx, xAbs, yAbs;
                ctx = this.ctx;
                xAbs = x * this.width;
                yAbs = y * this.height;
                ctx.font = 'bold ' + (32 * this.imageScale) + 'px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.fillText(this.getDateString(view), xAbs, yAbs);
                if (addLine) {
                    ctx.beginPath();
                    ctx.moveTo(xAbs, yAbs + (24 * this.imageScale));
                    ctx.lineTo( (xAbs + 0.44 * this.width), yAbs + (24 * this.imageScale));
                    ctx.stroke();
                }
            },
            addLegend(mapType, gradient, x, y) {
                let baseX, baseY, ctx;
                ctx = this.ctx;
                baseX = x * this.width;
                baseY = y * this.height;
                ctx.strokeStyle = '#555';
                if (mapType === 'change') {
                    this.addLegendChange(baseX, baseY);
                } else {
                    ctx.font = (14 * this.imageScale) + 'px Arial';
                    if (gradient) {
                        this.addLegendSignalingGradient(baseX, baseY);
                    } else {
                        this.addLegendSignaling(baseX, baseY);
                    }
                }
            },
            addLegendSignalingGradient(baseX, baseY) {
                let ctx, index, thresholds, y, width, height, margin;
                height = 20 *  this.imageScale;
                margin = this.imageScale;
                width = 16 *  this.imageScale;
                y = baseY;
                ctx = this.ctx;
                index = 0;
                thresholds = thresholdTools.getThresholds();
                for (let threshold of thresholds) {
                    let color1, color2, grd, label;
                    color1 = threshold.color[this.$store.state.ui.color];
                    if (index === 0 || index === thresholds.length - 1) {
                        ctx.fillStyle = color1;
                    } else {
                        color2 = thresholds[index + 1].color[this.$store.state.ui.color];
                        grd = ctx.createLinearGradient(0, y, 0, (y + height));
                        grd.addColorStop(0, color1);
                        grd.addColorStop(1, color2);
                        ctx.fillStyle = grd;
                    }
                    ctx.fillRect(baseX, y, width, height);

                    ctx.fillStyle = '#544e41';
                    if (threshold.label) {
                        label = threshold.label;
                    } else {
                        label = thresholdTools.getNumber(threshold);
                    }
                    ctx.fillText(label, baseX + width + (8 * this.imageScale), (y + (18 * this.imageScale)));
                    y += (height + margin);
                    index++;
                }
            },
            addLegendSignaling(baseX, baseY) {
                let ctx = this.ctx;
                baseX += 8;
                for (let threshold of thresholdTools.getThresholds()) {
                    let label;
                    ctx.fillStyle = threshold.color[this.$store.state.ui.color];
                    ctx.beginPath();
                    ctx.arc(baseX, baseY, (9 * this.imageScale), 0, (Math.PI * 2), false);
                    ctx.stroke();
                    ctx.fill();
                    ctx.fillStyle = '#544e41';
                    if (threshold.label) {
                        label = threshold.label;
                    } else {
                        label = thresholdTools.getNumber(threshold);
                    }
                    ctx.fillText(label, baseX + (24 * this.imageScale), (baseY + (7 * this.imageScale)));
                    baseY += (24 * this.imageScale);
                }
            },
            addLegendChange(baseX, baseY) {
                let ctx, index, y;
                ctx = this.ctx;
                ctx.font = (12 * this.imageScale) + 'px Arial';
                index = 0;
                y = baseY;
                for (let section of changeTools.sections) {
                    let colors, grd, height, change, value;
                    height = index === 1 ? (18 *  this.imageScale): (36 *  this.imageScale);
                    colors = changeTools.getBackgroundForSection(index);
                    grd = ctx.createLinearGradient(0, y, 0, (y + height));
                    grd.addColorStop(0, colors[0]);
                    grd.addColorStop(1, colors[1]);
                    ctx.beginPath();
                    ctx.fillStyle = grd;
                    ctx.fillRect(baseX, y, (18 *  this.imageScale), height);
                    ctx.strokeRect(baseX, y, (18 *  this.imageScale), height);

                    // text top
                    change = changeTools.getChangeForFactor(section.range[0]);
                    value = numberTools.formatChange(change);
                    ctx.fillStyle = '#544e41';
                    ctx.fillText(value, baseX + (24 * this.imageScale), y + (6 * this.imageScale));
                    if (index === changeTools.sections.length - 1) {
                        change = changeTools.getChangeForFactor(section.range[1]);
                        value = numberTools.formatChange(change);
                        ctx.fillStyle = '#544e41';
                        ctx.fillText(value, baseX + (24 * this.imageScale), y + height + (2 * this.imageScale));
                    }

                    index++;
                    y += (height - 1);
                }
            },
            addCreator() {
                let ctx = this.ctx;
                ctx.font = (20 * this.imageScale) + 'px Arial';
                ctx.fillStyle = '#544e41';
                ctx.fillText('Created by: @innouveau', (30 * this.imageScale),  (545 * this.imageScale));
            },
            finish(name) {
                return new Promise((resolve, reject) => {
                    let fileName;
                    if (name && name.length > 0) {
                        fileName = name;
                    } else {
                        fileName = 'corona-status' + this.typeLabel;
                    }
                    this.downloadLink.setAttribute('download', fileName);
                    this.canvas.toBlob((blob) => {
                        let url = URL.createObjectURL(blob);
                        this.downloadLink.setAttribute('href', url);
                        this.downloadLink.click();
                        resolve();
                    });
                })
            }
        }
    }
</script>


<template></template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image-mixin {

    }
</style>