<script>
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";

    import regionDetailsHead from "./region-details-head";
    import regionDetailsNumbers from "./region-details-numbers";

    export default {
        name: 'region-details-short',
        components: {
            regionDetailsNumbers,
            regionDetailsHead
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