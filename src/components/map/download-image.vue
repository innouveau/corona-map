<script>
    import canvasTools from '@/tools/canvas';
    import thresholdTools from '@/tools/thresholds';
    import View from "@/classes/View";

    export default {
        name: 'download-image',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            regions() {
                return this.$store.getters['ui/regions'];
            },
            dateString() {
                return this.$store.getters['ui/getDateByOffset'](this.view.offset * this.currentMap.settings.testDataInterval);
            },
            dateStringdashes() {
                return this.dateString.replace(/\s/g , "-");
            },
            imageScale() {
                return 1;
            },
            currentMap() {
                return this.$store.state.maps.current;
            }
        },
        methods: {
            download() {
                let canvas, body, ctx, width, height, downloadLink;
                // twitter dimensions
                width = 1014 * this.imageScale;
                height = 570 * this.imageScale;
                body = document.getElementsByTagName("body")[0];
                downloadLink = document.createElement('a');
                canvas = document.createElement('canvas');
                ctx = canvas.getContext("2d");

                canvas.id = 'image-for-download';
                canvas.width = width;
                canvas.height = height;

                canvasTools.addBackground(ctx, width, height);
                this.addHead(ctx).then(() => {

                    let settings = {
                        width,
                        height,
                        shiftX: 220 * this.imageScale,
                        shiftY: 0,
                        zoom: this.currentMap.settings.map.zoom * 550 * this.imageScale,
                        key: 'download',
                        fill: true
                    };
                    this.addDate(ctx);
                    this.addLegend(ctx);
                    this.addRedCities(ctx);
                    canvasTools.draw(ctx, this.regions, settings, this.view.offset);
                    this.addCreator(ctx, width, height);

                    downloadLink.setAttribute('download', 'corona-status-' + this.dateStringdashes.toLowerCase() + '');
                    canvas.toBlob(function(blob) {
                        let url = URL.createObjectURL(blob);
                        downloadLink.setAttribute('href', url);
                        downloadLink.click();
                    });
                });
            },
            addHead(ctx) {
                let width, height;
                width = 430 * this.imageScale;
                height = 42 * this.imageScale;
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = 'assets/img/corona-status-new.png';
                    img.onload = () => {
                        ctx.drawImage(img, (30 * this.imageScale), (36 * this.imageScale), width, height);
                        resolve();
                    }
                });
            },
            addDate(ctx) {
                ctx.font = 'bold ' + (32 * this.imageScale) + 'px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.fillText(this.dateString, 30 * this.imageScale, 110 * this.imageScale);
                ctx.beginPath();
                ctx.moveTo(30 * this.imageScale, 130 * this.imageScale);
                ctx.lineTo(465 * this.imageScale, 130 * this.imageScale);
                ctx.stroke();
            },
            addLegend(ctx) {
                let baseY, baseX;
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
            addRedCities(ctx) {
                //let redCities = this.$store.getters['cities/redCities'];
            },
            addCreator(ctx, width, height) {
                ctx.beginPath();
                ctx.moveTo(30 * this.imageScale, 510 * this.imageScale);
                ctx.lineTo(465 * this.imageScale, 510 * this.imageScale);
                ctx.stroke();

                ctx.font = (20 * this.imageScale) + 'px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText('Kaart door: @innouveau', (30 * this.imageScale),  (545 * this.imageScale));
            }
        }
    }
</script>


<template>
    <div
        @click="download()"
        class="download-image icon-button">
        <img src="assets/img/tools/download.svg">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image {

    }
</style>