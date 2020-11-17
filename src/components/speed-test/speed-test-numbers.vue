<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";

    export default {
        name: 'speed-test-numbers',
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
    <div class="speed-test-numbers">
        <div class="speed-test-numbers__label">
            Speedtest info
        </div>

        <div
            v-for="frame in frames"
            class="speed-test-numbers__frame">
            <div class="speed-test-numbers__frame-date">
                {{frame.date}}
            </div>

            <div class="speed-test-numbers__frame-positive">
                {{frame.positiveAntigenTests}}
            </div>
            <div class="speed-test-numbers__frame-total">
                {{frame.totalAntigenTests}}
            </div>
            <div class="speed-test-numbers__frame-percentage">
                {{(100 * frame.positiveAntigenTests / frame.totalAntigenTests).toFixed(1)}}%
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .speed-test-numbers {
        color: red;

        .speed-test-numbers__label {
            font-weight: 700;
            margin-bottom: 8px;
        }

        .speed-test-numbers__frame {
            display: flex;
            font-family: $monospace;
            font-size: 12px;

            .speed-test-numbers__frame-date {
                width: 80px;
            }

            .speed-test-numbers__frame-positive {
                width: 40px;
            }

            .speed-test-numbers__frame-total {
                width: 60px;
            }
        }
    }
</style>