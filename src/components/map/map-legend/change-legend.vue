<script>
    import changeTools from '@/tools/change';
    import numberTools from '@/tools/number';

    export default {
        name: 'change-legend',
        components: {},
        props: {},
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            sections() {
                return changeTools.sections;
            },
            top() {
                if (this.hasRegionTypePicker) {
                    return 34;
                } else {
                    return 0;
                }
            },
            hasRegionTypePicker() {
                return this.currentMap.settings.regionTypes && this.currentMap.settings.regionTypes.length > 1;
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
    <div
        :style="{'top': top + 'px'}"
        class="change-legend map-legend">
        <div
            v-for="(section, index) in sections"
            class="change-legend__section">
            <div
                :style="{'background': getBackground(index)}"
                class="change-legend__color"></div>
            <div class="change-legend__label change-legend__label--top">
                {{getValue(section.range[0])}}
            </div>
            <div
                v-if="index === sections.length - 1"
                class="change-legend__label change-legend__label--bottom">
                {{getValue(section.range[1])}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .change-legend {

        .change-legend__section {
            display: flex;
            align-items: center;
            margin-bottom: -1px;
            position: relative;

            .change-legend__color {
                height: 12px;
                width: 12px;
                border: 1px solid #555;
                margin-right: 4px;
            }

            .change-legend__label {
                font-size: 9px;
                position: absolute;
                left: 16px;
                margin-top: -5px;

                &.change-legend__label--top {
                    top: 0;
                }

                &.change-legend__label--bottom {
                    top: 100%;
                }
            }

            &:first-child,
            &:last-child {

                .change-legend__color {
                    height: 24px;
                }
            }
        }
    }
</style>