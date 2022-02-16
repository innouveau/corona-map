<script>
    import View from "@/classes/View";
    import numberTools from '@/tools/number';
    import {getAbsoluteValueForDay} from "../../../tools/calculator";

    export default {
        name: 'day-score',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            regions() {
                return this.$store.state.regions.all;
            },
            value() {
                let n = 0;
                for (const region of this.regions) {
                    n += getAbsoluteValueForDay(region, this.view.offset, this.view.currentSource.key);
                }
                return numberTools.format(n, true);
            },
            label() {
                return this.translate(this.view.currentSource.key, true);
            }
        }
    }
</script>


<template>
    <div class="day-score">
        {{value}} {{label}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .day-score {
        position: relative;
        display: flex;
        align-items: center;
        padding: 8px 12px;

        @include header-menu-breakpoint() {
            padding: 4px 8px;
        }
    }
</style>
