<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import populationTestGraph from "./population-test-graph";
    import populationTestNumbers from "./population-test-numbers";

    export default {
        name: 'population-test-region',
        components: {
            populationTestNumbers,
            populationTestGraph
        },
        props: {
            region: {
                type: _Region,
                required: true
            },
            view: {
                type: View,
                required: true
            },
            group: {
                type: Object,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="population-test-region">
        <population-test-graph
            :view="view"
            :region="region"
            :weeks="3"
            :weeks-after="3"
            :padding-right="20"
            :height="250"/>

        <div class="population-test-region__info">
            <div
                :style="{'border-left': '4px solid ' + group.color}"
                class="population-test-region__title">
                <div class="population-test-region__label">
                    {{group.label}}
                </div>
                <div class="population-test-region__region">
                    {{region.title}}
                </div>

            </div>
            <population-test-numbers
                    :view="view"
                    :region="region"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .population-test-region {
        border-bottom: 1px solid #ddd;
        padding: 12px;
        display: flex;

        .population-test-graph {
        }

        .population-test-region__info {

            .population-test-region__title {
                padding: 4px;
                margin-bottom: 24px;
                border: 1px solid #ddd;
                display: flex;

                .population-test-region__label {
                    display: flex;
                    align-items: center;
                    padding: 4px;
                    font-weight: 700;
                    border-right: 1px solid #ddd;
                }

                .population-test-region__region {
                    display: flex;
                    align-items: center;
                    padding: 4px;
                }
            }
        }

        &:last-child {
            border-bottom: 0;
        }
    }
</style>