<script>
    import thresholdTools from '@/tools/thresholds';

    export default {
        name: 'map-legend-regular',
        components: {},
        props: {},
        computed: {
            colorSetting() {
                return this.$store.state.ui.color;
            },
            thresholds() {
                return this.$store.state.signalingSystems.current.thresholds;
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
            }
        }
    }
</script>


<template>
    <div class="map-legend-regular">
        <div
            v-for="threshold in thresholds"
            class="threshold">
            <div
                :style="{'background-color': threshold.color[colorSetting]}"
                class="threshold__swatch"></div>
            <div class="threshold__cases">
                {{getValue(threshold)}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-legend-regular {
        pointer-events: none;

        .threshold {
            padding: 2px 0;

            .threshold__swatch {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 4px;
                border: 1px solid #555;
            }
        }
    }
</style>