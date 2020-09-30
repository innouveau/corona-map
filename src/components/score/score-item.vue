<script>
    import View from "@/classes/View";
    import mapTests from "@/components/main/map/map";
    import regionDetailsShort from "@/components/main/regions/region-details/region-details-short";
    import scoreNumber from "./score-number";

    export default {
        name: 'score-item',
        components: {
            scoreNumber,
            regionDetailsShort,
            mapTests,
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
        },
        methods: {

        }
    }
</script>


<template>
    <div class="score-item">
        <div class="score__header">
            {{view.parent.title}}
        </div>
        <score-number
            :view="view"/>
        <div class="score__body">
            <map-tests
                :show-tools="false"
                :show-legend="false"
                :view="view"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .score-item {
        border-right: 1px solid #ddd;

        &:last-child {
            border-right: 0;
        }

        .score__header {
            height: 48px;
            font-weight: 900;
            font-size: 32px;
            text-align: center;
        }

        .score__number {
            height: 64px;
        }

        .score__body {
            height: calc(100% - 112px);
            padding: 8px;

            .map {
                height: 100%;
            }
        }

        @include mobile() {

        }
    }
</style>