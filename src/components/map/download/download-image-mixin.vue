<script>
    import thresholdTools from '@/tools/thresholds';
    import canvasTools from '@/tools/canvas';

    export default {
        name: 'download-image-mixin',
        components: {},
        props: {},
        computed: {
            regions() {
                return this.$store.getters['ui/regions'];
            },
            dateStringdashes() {
                return this.dateString.replace(/\s/g , "-");
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
            }
        },
        methods: {
            getDateString(view) {
                return this.$store.getters['ui/getDateByOffset'](this.view.offset * this.currentMap.settings.testDataInterval);
            },
            prepair() {
                this.canvas.id = 'image-for-download';
                this.canvas.width = this.width;
                this.canvas.height = this.height;

                canvasTools.addBackground(this.ctx, this.width, this.height);
            },
            addHead() {
                let width, height;
                width = 430 * this.imageScale;
                height = 42 * this.imageScale;
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = 'assets/img/corona-status-new.png';
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
                baseY = 160 * this.imageScale;
                baseX = 38 * this.imageScale;
                ctx.strokeStyle = '#555';
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


<template>
    <div class="download-image-mixin">
        download-image-mixin
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image-mixin {

    }
</style>