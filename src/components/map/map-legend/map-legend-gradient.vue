<script>
    import thresholdTools from '@/tools/thresholds';

    export default {
        name: 'map-legend-gradient',
        components: {},
        props: {},
        computed: {
            thresholds() {
                return this.$store.state.signalingSystems.current.thresholds;
            },
            colorSetting() {
                return this.$store.state.ui.color;
            }
        },
        methods: {
            getNumber(threshold) {
                return thresholdTools.getNumber(threshold);
            },
            getValue(threshold) {
                if (threshold.label) {
                    return threshold.label;
                } else {
                    return this.getNumber(threshold);
                }
            },
            getBackground(threshold) {
                let index, color1, color2;
                index = this.thresholds.indexOf(threshold);
                if (index === 0 || index === this.thresholds.length - 1) {
                    return threshold.color[this.colorSetting];
                } else {
                    color1 = threshold.color[this.colorSetting];
                    color2 = this.thresholds[index + 1].color[this.colorSetting];
                    return 'linear-gradient(180deg, ' + color1 + ' 0%, ' + color2 + ' 120%)';
                }
            }
        }
    }
</script>


<template>
    <div class="map-legend-gradient">
        <div
            v-for="threshold in thresholds"
            class="threshold">
            <div
                :style="{'background': getBackground(threshold)}"
                class="threshold__swatch"></div>
            <div class="threshold__cases">
                {{getValue(threshold)}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-legend-gradient {

        .threshold {

            .threshold__swatch {
                width: 12px;
                height: 17px;
                margin-right: 4px;
                border: 1px solid $map-color;
                margin-bottom: -1px;
            }

            &:first-child,
            &:last-child {
                //height: 4px;
            }
        }
    }
</style>