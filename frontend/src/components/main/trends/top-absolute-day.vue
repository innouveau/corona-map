<script>
    import View from "@/classes/View";
    import region from "./region";

    import trendMixin from './trend-mixin'

    export default {
        name: 'top-absolute-day',
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
        computed: {
            title() {
                return 'Top 10 ' + this.translate('absolute') + ' ' + this.translate('increase') + ' ' + this.translate('today');
            }
        },
        methods: {
            getValue(region) {
                return region.getTotalIncreaseOfType(this.view.offset, 1, this.view.currentSource.key, false);
            }
        }
    }
</script>


<template>
    <div class="section top-absolute-day">
        <div class="section__header">
            {{title}}:
        </div>
        <div class="section__body">
            <div class="regions__list">
                <div
                    v-for="item in list"
                    class="region__container">
                    <region
                        :view="view"
                        :region="item.region"/>
                    <div class="region__info">
                        ({{format(item.value)}} <span class="abs-rel">abs</span>)
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .top-absolute-day {

    }
</style>