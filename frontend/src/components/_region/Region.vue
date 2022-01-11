<script>
import View from "@/classes/View";
import regionDetailsHead from "@/components/pages/main/details/region-details-head";
import regionRelations from "@/components/_map/region-type/region-relations";

export default {
    name: 'Region',
    props: {
        view: {
            type: View,
            required: true
        }
    },
    components: {
        regionRelations,
        regionDetailsHead
    },
    computed: {
        regionOfFocus() {
            return this.$store.getters['ui/getRegionOfFocus'](this.view.currentRegion);
        },
    },
    methods: {}
}
</script>


<template>
    <div class="Region">
        <region-details-head
            :view="view"
            :region="regionOfFocus"/>

        <div class="region-details__section">
            <region-relations
                :view="view"
                :region="view.currentRegion"/>
        </div>

        <slot/>
    </div>
</template>


<style lang="scss">
.Region {

}
</style>
