<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import numberTools from '@/tools/number';

    export default {
        name: 'population-test-numbers',
        components: {},
        props: {
            region: {
                type: _Region,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            frames() {
                return this.region.report.history.filter(frame => {
                    return frame.positiveAntigenTests > 0;
                })
            }
        },
        methods: {
            format(value) {
                return numberTools.format(Math.round(value), false);
            }
        }
    }
</script>


<template>
    <div
        v-if="frames.length > 0"
        class="population-test-numbers">
        <div class="population-test-numbers__label">
            Population test info
            <div class="population-test__icon">
                <div class="population-test__bar"></div>
                <div class="population-test__bar"></div>
                <div class="population-test__bar"></div>
            </div>
        </div>

        <div class="population-test-numbers__table">
            <div class="population-test-numbers__head">
                <div class="population-test-numbers__row">
                    <div class="population-test-numbers__cell population-test-numbers__frame-date">
                        Date
                    </div>
                    <div class="population-test-numbers__cell population-test-numbers__frame-positive">
                        Positive
                    </div>
                    <div class="population-test-numbers__cell population-test-numbers__frame-total">
                        Total tests
                    </div>
                    <div class="population-test-numbers__cell population-test-numbers__frame-percentage">
                        % pos
                    </div>
                </div>
            </div>
            <div class="population-test-numbers__body">

            </div>
            <div
                    v-for="frame in frames"
                    class="population-test-numbers__row">
                <div class="population-test-numbers__cell population-test-numbers__frame-date">
                    {{frame.date}}
                </div>

                <div class="population-test-numbers__cell population-test-numbers__frame-positive">
                    {{format(frame.positiveAntigenTests)}}
                </div>
                <div class="population-test-numbers__cell population-test-numbers__frame-total">
                    {{format(frame.totalAntigenTests)}}
                </div>
                <div class="population-test-numbers__cell population-test-numbers__frame-percentage">
                    {{(100 * frame.positiveAntigenTests / frame.totalAntigenTests).toFixed(1)}}%
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .population-test-numbers {
        margin-top: 12px;

        .population-test-numbers__label {
            font-weight: 700;
            margin-bottom: 8px;
            display: flex;
            align-items: center;

            .population-test__icon {
                display: flex;
                align-items: flex-end;
                margin-left: 8px;
                margin-top: -5px;

                .population-test__bar {
                    width: 3px;
                    height: 12px;
                    margin-right: 2px;
                    background: red;

                    &:nth-child(1) {
                        height: 14px;
                    }

                    &:nth-child(2) {
                        height: 10px;
                    }
                }
            }
        }

        .population-test-numbers__table {
            border: 1px solid #ddd;
            text-align: right;

            .population-test-numbers__head {
                background: #ddd;
            }

            .population-test-numbers__row {
                display: flex;
                font-family: $monospace;
                font-size: 12px;
                border-bottom: 1px solid #ddd;

                .population-test-numbers__cell {
                    border-right: 1px solid #ddd;
                    padding: 6px;

                    &:last-child {
                        border-right: 0;
                    }
                }

                .population-test-numbers__frame-date {
                    width: 100px;
                }

                .population-test-numbers__frame-positive {
                    width: 100px;
                }

                .population-test-numbers__frame-total {
                    width: 100px;
                }

                .population-test-numbers__frame-percentage {
                    width: calc(100% - 300px);
                }
            }

            &:last-child {
                border-bottom: 0;
            }
        }
    }
</style>