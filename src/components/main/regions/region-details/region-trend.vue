<script>
    import _Region from "@/classes/_Region";
    import View from "@/classes/View";
    import PositiveTests from "./tests/positive-tests";
    import thresholdTool from "@/tools/thresholds";

    export default {
        name: 'region-trend',
        components: {PositiveTests},
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            },
            showVerdict: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                verdicts: [
                    {
                        id: 1,
                        title: 'Stabiel'
                    }, {
                        id: 2,
                        title: 'Waakzaam'
                    }, {
                        id: 3,
                        title: 'Ernstig, alle zeilen bijzetten om tij te keren'
                    }, {
                        id: 4,
                        title: 'Zeer ernstig'
                    }, {
                        id: 5,
                        title: 'Situatie lijkt onomkeerbaar, lockdown onafwendbaar'
                    },

                    // {
                    //     id: 6,
                    //     title: 'Grote problemen, maar dalende trend'
                    // }, {
                    //     id: 7,
                    //     title: 'Ernstig, maar dalende trend'
                    // },

                    {
                        id: 8,
                        title: 'NNB'
                    }
                ]
            }
        },
        computed: {
            verdict() {
                switch (this.thresholdIndex) {
                    case 0:
                        return this.verdicts[0];
                    case 1:
                        return this.verdicts[1];
                    case 2:
                        if (this.citySize === 3) {
                            return this.verdicts[2];
                        } else {
                            return this.verdicts[1];
                        }
                    case 3:
                        if (this.citySize === 3) {
                            return this.verdicts[3];
                        } else {
                            return this.verdicts[2];
                        }
                    case 4:
                        switch (this.change) {
                            case 0:
                                if (this.citySize === 3) {
                                    return this.verdicts[4];
                                } else {
                                    return this.verdicts[3];
                                }
                            // stijgend of dalend
                            default:
                                if (this.citySize === 3) {
                                    return this.verdicts[3];
                                } else {
                                    return this.verdicts[2];
                                }
                        }
                }
            },
            citySize() {
                let population = this.region.getTotalPopulation();
                if (population < 50000) {
                    return 1;
                } else if (population < 200000) {
                    return 2;
                } else {
                    return 3;
                }
            },
            thresholds() {
                return thresholdTool.getThresholds();
            },
            threshold() {
                return this.region.getThreshold(0, this.view.offset);
            },
            thresholdIndex() {
                return this.thresholds.indexOf(this.threshold);
            },
            thresholdPreviousWeekIndex() {
                return this.thresholds.indexOf(this.region.getThreshold(7));
            },
            change() {
                return this.thresholdIndex - this.thresholdPreviousWeekIndex;
            },
            background() {
                return this.region.color;
            },
            isNl() {
                return this.$store.state.languages.current.iso_code === 'nl';
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-trend">
        <div class="region-trend__container">
            <div class="region-trend__positive-tests">
                <positive-tests
                    :view="view"
                    :region="region"
                    :weeks="2"
                    :height="50"
                    :zoom="0.75"
                    :thresholds="false"
                    :padding-bottom="0"
                    :padding-right="0"/>
            </div>

            <div
                v-if="showVerdict && isNl"
                class="region-trend__verdict">
                {{verdict.title}}
                <div class="region-trend__note">
                    Deze kwalificatie is nog experimenteel
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-trend {

        .region-trend__container {
            display: flex;

            .region-trend__positive-tests {
                margin-bottom: 8px;
                margin-right: 12px;

                .positive-tests {

                }
            }

            .region-trend__verdict {
                font-weight: 700;
                line-height: 1.2;
            }
        }

        .region-trend__note {
            margin-top:3px;
            font-size: 11px;
            font-style: italic;
            font-weight: 400;
        }
    }
</style>