<script>
    import changeTools from '@/tools/change';
    import numberTools from '@/tools/number';

    export default {
        name: 'change-legend',
        components: {},
        props: {},
        computed: {
            sections() {
                return [
                    {
                        range: [changeTools.max, changeTools.margin]
                    }, {
                        range: [changeTools.margin, -changeTools.margin],
                    }, {
                        range: [-changeTools.margin, -changeTools.max],
                    }
                ]
            }
        },
        methods: {
            getValue(factor) {
                let change = changeTools.getChangeForFactor(factor);
                return numberTools.formatChange(change);
            },
            getBackground(index) {
                let color1, color2;
                switch (index) {
                    case 0:
                        color1 = changeTools.colors[0];
                        color2 = changeTools.colors[1];
                    break;
                    case 1:
                        color1 = changeTools.colors[1];
                        color2 = changeTools.colors[1];
                        break;
                    case 2:
                        color1 = changeTools.colors[1];
                        color2 = changeTools.colors[2];
                        break;
                }
                return 'linear-gradient(180deg, ' + color1 + ' 0%, ' + color2 + ' 120%)';
            }
        }
    }
</script>


<template>
    <div class="change-legend map-legend">
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
                left: 14px;
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