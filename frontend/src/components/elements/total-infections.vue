<script>
    import View from "@/classes/View";
    import numberTools from '@/tools/number';

    export default {
        name: 'total-infections',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            regions() {
                return this.$store.state[this.currentMap.module].all;
            },
            n() {
                let n = 0;
                for (let region of this.regions) {
                    n += region.getIncreaseOfType(this.view.offset, 1, 'positiveTests', false);
                }
                return numberTools.format(n, true);
            },
            perWeek() {
                return this.currentMap.data.positivePcrTests.interval === 7;
            },
            intervalText() {
                return this.translate('per') + ' 7 ' + this.translate('days');
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="total-infections">
        <div class="total-infections__n">
            {{n}}
        </div>
        <div
            v-if="perWeek"
            class="total-infections__interval">
            {{intervalText}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .total-infections {
        position: relative;

        .total-infections__interval {
            font-size: 12px;
            margin-top: -2px;
            margin-left: 4px;
            white-space: nowrap;
        }

        @include mobile() {

            .total-infections__interval {
                position: absolute;
                top: calc(100% + 2px);
                left: 0;
                font-size: 9px;
            }
        }
    }
</style>