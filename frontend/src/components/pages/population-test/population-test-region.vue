<script>
import Region from "@/classes/region/Region";
import View from "@/classes/View";
import populationTestGraph from "./population-test-graph";
import populationTestNumbers from "./population-test-numbers";
import numberTools from "@/tools/number";

export default {
    name: "population-test-region",
    components: {
        populationTestNumbers,
        populationTestGraph,
    },
    props: {
        region: {
            type: Object,
            required: true,
        },
        view: {
            type: View,
            required: true,
        },
        group: {
            type: Object,
            required: true,
        },
    },
    computed: {},
    methods: {
        format(value, addPlus) {
            return numberTools.format(Math.round(value), addPlus);
        },
    },
};
</script>

<template>
    <div class="population-test-region">
        <population-test-graph
            :view="view"
            :region="region"
            :frames-before="3"
            :frames-after="3"
            :step="40"
            :padding-right="20"
            :height="380"
        />

        <div class="population-test-region__info">
            <div class="population-test-region__title">
                <div
                    :style="{ background: group.color }"
                    class="population-test-region__label"
                >
                    {{ group.label }}
                </div>
                <div class="population-test-region__region">
                    {{ region.title }}
                </div>
            </div>

            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        {{ translate("population", true) }}
                    </div>
                    <div class="region-details__value">
                        {{ format(region.totalPopulation, false) }}
                    </div>
                </div>
                <div class="region-details__row">
                    <div class="region-details__label">
                        {{ translate("relative", true) }}
                        {{ translate("increase") }}
                        {{ translate("last-7-days") }} ({{
                            translate("per")
                        }}
                        100.000 {{ translate("inhabitants-short") }})
                    </div>
                    <div class="region-details__value">
                        {{
                            format(
                                region.getTotalIncreaseOfType(
                                    view.offset,
                                    7,
                                    "positiveTests",
                                    true
                                ),
                                true
                            )
                        }}
                    </div>
                </div>
            </div>

            <population-test-numbers
                v-if="region.report"
                :view="view"
                :region="region"
            />
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.population-test-region {
    border-bottom: 1px solid #ddd;
    padding: 24px;
    display: flex;

    .population-test-graph {
    }

    .population-test-region__info {
        width: calc(100% - 260px);

        .population-test-region__title {
            display: flex;
            font-weight: 700;
            padding-bottom: 4px;
            border-bottom: 2px solid #000;

            .population-test-region__label {
                display: flex;
                align-items: center;
                padding: 4px 6px;
                color: #fff;
                font-size: 11px;
                margin-right: 8px;
            }

            .population-test-region__region {
                display: flex;
                align-items: center;
                font-size: 16px;
                font-family: $serif;
            }
        }

        .region-details__section {
            border-bottom: 2px solid #ddd;

            .region-details__value {
                font-size: 16px;
            }
        }
    }

    &:last-child {
        border-bottom: 0;
    }
}
</style>
