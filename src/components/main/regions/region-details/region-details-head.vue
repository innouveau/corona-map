<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import numberTools from '@/tools/number';

    export default {
        name: 'region-details-head',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            increaseThisWeek() {
                return this.region.getTotalIncreaseOfType(this.view.offset, 7, 'positiveTests', true);
            }
        },
        methods: {
            format(value) {
                return numberTools.format(Math.round(value), true);
            }
        }
    }
</script>


<template>
    <div class="region-details-head">
        <div
            :style="{'background': region.getColor(view.offset, view.currentSource)}"
            class="dot"></div>
        <div
            :title="region.nutsCode"
            class="region-details__title">
            {{region.title}}
        </div>
        <div class="region-details__increase">
            {{format(increaseThisWeek)}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-head {
        font-weight: 700;
        font-size: 20px;
        line-height: 1.2;
        margin-bottom: 12px;
        display: flex;
        align-items: center;

        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 10px;
            flex-grow: 0;
            flex-shrink: 0;
        }

        .region-details__title {
            margin-right: 8px;
        }

        .region-details__increase {
            font-size: 12px;
            display: flex;
        }
    }
</style>