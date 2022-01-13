<script>
    import View from "@/classes/View";
    import region from "@/components/pages/main/trends/region";
    import trendMixin from "./trend-mixin";
    import { getRelativeCumulativeForPeriod } from "@/tools/calculator";

    export default {
        name: 'top-relative-week',
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
                return 'Top 10 ' + this.translate('relative') + ' ' + this.translate('increase') + ' ' + this.translate('for-7-days');
            }
        },
        methods: {
            getValue(region) {
                return getRelativeCumulativeForPeriod(region, this.view.offset, (this.view.offset + 7), this.view.currentSource.key);
            }
        }
    }
</script>


<template>
    <div class="top-relative-week trends-section">
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

    .section {
        margin-bottom: 20px;

        .section__header {
            margin-bottom: 6px;
            font-weight: 700;
        }
    }
</style>
