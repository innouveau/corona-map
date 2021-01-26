<script>
    import canvasTools from '@/tools/canvas';
    import thresholdTools from '@/tools/thresholds';

    export default {
        name: 'download-red-regions',
        components: {},
        props: {
            regions: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                canvas: null,
                ctx: null,
                x: 0,
                y: 0,
                lineHeight: 16
            }
        },
        computed: {
            cities() {
                return this.$store.state.cities.all;
            },
            dateString() {
                return this.$store.getters['ui/dateString']();
            },
            dateStringdashes() {
                return this.dateString.replace(/\s/g , "-");
            },
            imageScale() {
                return 1;
            },
            typeLabel() {
                return this.$store.getters['ui/typeLabel'](true).toLowerCase();
            },
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            color() {
                let thresholds, lastThreshold;
                thresholds = this.signalingSystem.thresholds;
                lastThreshold = thresholds[thresholds.length - 1];
                return lastThreshold.color.regular;
            }
        },
        methods: {
            createImage() {
                let body, width, height;
                width = 250;
                this.x = 20;
                this.y = 20;
                height = (this.y * 2) + (this.regions.length * this.lineHeight);
                body = document.getElementsByTagName("body")[0];

                this.canvas = document.createElement('canvas');
                this.ctx = this.canvas.getContext("2d");

                this.canvas.id = 'image-for-download';
                this.canvas.width = width;
                this.canvas.height = height;

                canvasTools.addBackground(this.ctx, width, height);
                for (let region of this.regions) {
                    this.createRegion(region);
                }
                this.download();
            },
            createRegion(region) {
                let text = region.title + ' (' + Math.round(this.getIndicator(region)) + ')';
                this.ctx.beginPath();
                this.ctx.fillStyle = this.color;
                this.ctx.arc(this.x, this.y, 5, 0, (Math.PI * 2), false);
                this.ctx.stroke();
                this.ctx.fill();

                this.ctx.font = '12px Arial';
                this.ctx.fillStyle = 'black';


                this.ctx.fillText(text, (this.x + 10), (this.y + 3));
                this.y += this.lineHeight;
            },
            getIndicator(region) {
                if (this.signalingSystem.days === 1) {
                    return region.getTotalRelativeIncreasDay();
                } else if (this.signalingSystem.days === 7) {
                    return region.getTotalRelativeIncreaseWeek();
                }
            },
            download() {
                let downloadLink;
                downloadLink = document.createElement('a');
                downloadLink.setAttribute('download', 'zwarte-' + this.typeLabel + '-' + this.dateStringdashes + '.png');
                this.canvas.toBlob(function(blob) {
                    let url = URL.createObjectURL(blob);
                    downloadLink.setAttribute('href', url);
                    downloadLink.click();
                });
            }
        }
    }
</script>


<template>
    <div class="download-red-regions">
        <div
            @click="createImage()"
            class="icon-button">
            <img src="assets/img/tools/download.svg">
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-red-regions {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 32px;
    }
</style>