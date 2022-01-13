<script>
    import View from "@/classes/View";
    import region from "./region";
    import trendMixin from "./trend-mixin";
    import { getRelativeValueForDay} from "@/tools/calculator";

    export default {
        name: 'top-relative-day',
        components: {
            region
        },
        mixins: [trendMixin],
        props: {
            view: {
                type: View,
                required: true
            }
        },
        data() {
            return {
                list: []
            }
        },
        computed: {
            title() {
                return 'Top 10 ' + this.translate('relative') + ' ' + this.translate('increase') + ' ' + this.translate('today');
            }
        },
        methods: {
            getValue(region) {
                return getRelativeValueForDay(region, this.view.offset, this.view.currentSource.key);
            }
        }
    }
</script>


<template>
    <div class="trends-section top-relative-day">
        <div class="trends-section__head">
            {{title}}
        </div>
        <div class="trends-section__body">
            <div class="regions__list">
                <div
                    v-for="item in list"
                    class="region__container">
                    <region
                        :view="view"
                        :region="item.region"/>
                    <div class="region__info">
                        ({{format(item.value)}} <span class="abs-rel">rel</span>)
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .top-relative-day {

    }
</style>
