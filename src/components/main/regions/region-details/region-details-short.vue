<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";

    import regionTrend from "./region-trend";
    import regionDetailsHead from "./region-details-head";
    import regionDetailsNumbers from "./region-details-numbers";

    export default {
        name: 'region-details-short',
        components: {
            regionDetailsNumbers,
            regionDetailsHead,
            regionTrend

        },
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
            showTrend() {
                return this.$store.state.signalingSystems.current.title === 'WHO' && this.currentMap.data.positivePcrTests.interval * this.$store.state.settings.historyLength >= 14 ;
            },
            regionOfFocus() {
                return this.$store.getters['ui/getRegionOfFocus'](this.region);
            },
            currentMap() {
                return this.$store.state.maps.current;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-details">
        <div class="region-card">
            <region-details-head
                :view="view"
                :region="regionOfFocus"/>

            <region-trend
                v-if="showTrend"
                :view="view"
                :region="regionOfFocus"
                :show-verdict="false"/>


            <div class="region-details__info">
                <region-details-numbers
                    :view="view"
                    :region="regionOfFocus"
                    :short="true"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

</style>