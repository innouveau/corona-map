<script>
import View from "@/classes/View";
import regionHead from "./region-head";
import regionRelations from "@/components/map/region-type/region-relations";

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
        regionHead
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
        <region-head
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
