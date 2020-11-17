<script>
    import d3TestGraphMixin from '@/mixins/d3-test-graph-mixin';

    export default {
        name: 'positive-pcr-tests',
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
                if (this.getDays().length > 0) {
                    this.drawPcrTestsBars('rgba(0,0,0,0.15)');
                    this.drawPcrTestsLine(true, false);
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
            v-if="weeks > 2"
            class="pcr-test-graph__title">
            {{title}}
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

        .pcr-test-graph__title {
            margin-bottom: 4px;
        }

        svg {
            font-size: 11px;
        }
    }
</style>