<script>
    import changeTools from '@/tools/change';
    import numberTools from '@/tools/number';

    export default {
        name: 'map-legend-change',
        components: {},
        props: {},
        computed: {
            sections() {
                return changeTools.sections;
            },
        },
        methods: {
            getValue(factor) {
                let change = changeTools.getChangeForFactor(factor);
                return numberTools.formatChange(change);
            },
            getBackground(index) {
                let colors = changeTools.getBackgroundForSection(index);
                return 'linear-gradient(180deg, ' + colors[0] + ' 0%, ' + colors[1] + ' 120%)';
            }
        }
    }
</script>


<template>
    <div class="map-legend-change map-legend">
        <div
            v-for="(section, index) in sections"
            class="map-legend-change__section">
            <div
                :style="{'background': getBackground(index)}"
                class="map-legend-change__color"></div>
            <div class="map-legend-change__label map-legend-change__label--top">
                {{getValue(section.range[0])}}
            </div>
            <div
                v-if="index === sections.length - 1"
                class="map-legend-change__label map-legend-change__label--bottom">
                {{getValue(section.range[1])}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-legend-change {

        .map-legend-change__section {
            display: flex;
            align-items: center;
            margin-bottom: -1px;
            position: relative;

            .map-legend-change__color {
                height: 12px;
                width: 12px;
                border: 1px solid #555;
                margin-right: 4px;
            }

            .map-legend-change__label {
                font-size: 9px;
                position: absolute;
                left: 16px;
                margin-top: -5px;

                &.map-legend-change__label--top {
                    top: 0;
                }

                &.map-legend-change__label--bottom {
                    top: 100%;
                }
            }

            &:first-child,
            &:last-child {

                .map-legend-change__color {
                    height: 24px;
                }
            }
        }
    }
</style>
