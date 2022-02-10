<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";
    import numberTools from '@/tools/number';
    import { getRelativeCumulativeForPeriod } from "@/tools/calculator";
    export default {
        name: 'region-head',
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
            currentMap() {
                return this.$store.state.maps.current;
            },
            weekRelative() {
                return getRelativeCumulativeForPeriod(this.region, this.view.offset, (this.view.offset + 7), this.view.currentSource.key);
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
    <div class="region-head">
        <div class="region-head__title">
            {{region.title}}
        </div>
        <div
            v-if="view.currentSource.key !== 'vaccination'"
            class="region-head__increase">
            {{format(weekRelative)}}
            <span class="abs-rel">rel</span>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-head {
        font-size: 20px;
        line-height: 1.2;
        display: flex;
        align-items: flex-start;
        font-family: $serif;
        border-bottom: 2px solid #000;
        padding-bottom: 12px;
        font-weight: 700;
        height: 82px;

        &__title {
            margin-right: 8px;
        }

        &__increase {
            font-size: 12px;
            display: flex;

            .abs-rel {
                margin-left: 2px;
            }
        }
    }
</style>
