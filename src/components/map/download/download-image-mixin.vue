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
            addDate(view, x, y) {
                let ctx, xAbs, yAbs;
                ctx = this.ctx;
                xAbs = x * this.width;
                yAbs = y * this.height;
                ctx.font = 'bold ' + (32 * this.imageScale) + 'px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.fillText(this.getDateString(view), xAbs, yAbs);
                ctx.beginPath();
                ctx.moveTo(xAbs, yAbs + (8 * this.imageScale));
                ctx.lineTo( (xAbs + 0.44 * this.width), yAbs + (8 * this.imageScale));
                ctx.stroke();
            },
            addLegend() {
                let baseY, baseX, ctx;
                ctx = this.ctx;
                baseX = 38 * this.imageScale;
                baseY = 160 * this.imageScale;
                ctx.strokeStyle = '#555';
                if (this.mapType === 'change') {
                    this.addLegendChange(baseX, baseY);
                } else {
                    this.addLegendSignaling(baseX, baseY);
                }
            },
            addLegendSignaling(baseX, baseY) {
                let ctx = this.ctx;
                ctx.font = (20 * this.imageScale) + 'px Arial';
                for (let threshold of thresholdTools.getThresholds()) {
                    ctx.fillStyle = threshold.color[this.$store.state.ui.color];
                    ctx.beginPath();
                    ctx.arc(baseX, baseY, (9 * this.imageScale), 0, (Math.PI * 2), false);
                    ctx.stroke();
                    ctx.fill();
                    ctx.fillStyle = 'black';
                    ctx.fillText(thresholdTools.getNumber(threshold), baseX + (24 * this.imageScale), (baseY + (7 * this.imageScale)));
                    baseY += (33 * this.imageScale);
                }
                ctx.beginPath();
                ctx.moveTo(30 * this.imageScale, 330 * this.imageScale);
                ctx.lineTo(465 * this.imageScale, 330 * this.imageScale);
                ctx.stroke();
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
                    ctx.fillStyle = 'black';
                    ctx.fillText(value, baseX + (24 * this.imageScale), y + (6 * this.imageScale));
                    if (index === changeTools.sections.length - 1) {
                        change = changeTools.getChangeForFactor(section.range[0]);
                        value = numberTools.formatChange(change);
                        ctx.fillStyle = 'black';
                        ctx.fillText(value, baseX + (24 * this.imageScale), y + height + (2 * this.imageScale));
                    }

                    index++;
                    y += (height - 1);
                }
            },
            addCreator() {
                let ctx = this.ctx;
                ctx.font = (20 * this.imageScale) + 'px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText('Created by: @innouveau', (30 * this.imageScale),  (545 * this.imageScale));
            },
            finish() {
                this.downloadLink.setAttribute('download', 'corona-status' + this.typeLabel);
                this.canvas.toBlob((blob) => {
                    let url = URL.createObjectURL(blob);
                    this.downloadLink.setAttribute('href', url);
                    this.downloadLink.click();
                });
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