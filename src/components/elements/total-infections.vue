<script>
    import View from "@/classes/View";
    import numberTools from '@/tools/number';

    console.log(numberTools);

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
                    n += region.getIncreaseDay(0, this.view.offset);
                }
                return numberTools.format(n, true);
            },
            perWeek() {
                return this.currentMap.settings.testDataInterval === 7;
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
            (per 7 dagen)
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .total-infections {

        .total-infections__interval {
            font-size: 12px;
            margin-top: -2px;
            margin-left: 4px;
            white-space: nowrap;
        }
    }
</style>