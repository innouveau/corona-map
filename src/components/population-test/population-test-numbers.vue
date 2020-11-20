<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";

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
        methods: {}
    }
</script>


<template>
    <div class="population-test-numbers">
        <div class="population-test-numbers__label">
            Population test info
        </div>

        <div class="population-test-numbers__tabel">
            <div
                    v-for="frame in frames"
                    class="population-test-numbers__row">
                <div class="population-test-numbers__cell population-test-numbers__frame-date">
                    {{frame.date}}
                </div>

                <div class="population-test-numbers__cell population-test-numbers__frame-positive">
                    {{frame.positiveAntigenTests}}
                </div>
                <div class="population-test-numbers__cell population-test-numbers__frame-total">
                    {{frame.totalAntigenTests}}
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

        .population-test-numbers__label {
            font-weight: 700;
            margin-bottom: 8px;
        }

        .population-test-numbers__tabel {
            border: 1px solid #ddd;

            .population-test-numbers__row {
                display: flex;
                font-family: $monospace;
                font-size: 12px;
                border-bottom: 1px solid #ddd;

                .population-test-numbers__cell {
                    border-right: 1px solid #ddd;
                    padding: 6px;
                    text-align: right;

                    &:last-child {
                        border-right: 0;
                    }
                }

                .population-test-numbers__frame-date {
                    width: 74px;
                }

                .population-test-numbers__frame-positive {
                    width: 40px;
                }

                .population-test-numbers__frame-total {
                    width: 40px;
                }
            }

            &:last-child {
                border-bottom: 0;
            }
        }
    }
</style>