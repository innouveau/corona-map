<script>
    import d3TestGraphMixin from '@/mixins/d3-test-graph-mixin.js';

    export default {
        name: 'graph-signaling',
        components: {},
        mixins: [d3TestGraphMixin],
        computed: {
            title() {
                return this.translate('positive-tests', true);
            },
            mapType() {
                return 'signaling';
            }
        },
        methods: {
            redraw() {
                this.clear();
                if (this.thresholds) {
                    this.drawThresholds();
                } else {
                    this.drawBackground('#ddd');
                }
                this.drawGrid();
                if (this.days.length > 0) {
                    if (this.currentMap.settings.interval === 1) {
                        this.drawPcrTestsBars(this.view.currentSource.key, 'rgba(0,0,0,0.15)');
                        this.drawTestsLine(this.view.currentSource.key, true, false, '#000');
                    } else {
                        this.drawTestsLine(this.view.currentSource.key, false, false, '#000');
                        this.drawTestsDots(this.view.currentSource.key, false, '#000');
                    }

                }
                if (this.thresholds) {
                    this.drawDates();
                }
            }
        }
    }
</script>


<template>
    <div class="pcr-test-graph">
        <div
            v-if="framesBefore > 2"
            class="pcr-test-graph__title">
            {{translate(this.view.currentSource.key, true)}}
        </div>
        <div
            ref="container"
            class="pcr-test-graph__container">
            <svg :style="{width: canvasWidth + 'px', height: canvashHeight + 'px'}"></svg>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .pcr-test-graph {
        margin-bottom: 12px;
        width: 100%;
        overflow: hidden;

        .pcr-test-graph__title {
            margin-bottom: 4px;
        }

        svg {
            font-size: 11px;
        }
    }
</style>
