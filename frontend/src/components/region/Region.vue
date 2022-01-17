<script>
import View from "@/classes/View";
import regionHead from "./region-head";
import regionTypePicker from "@/components/elements/region-type/region-type-picker";

export default {
    name: 'Region',
    props: {
        view: {
            type: View,
            required: true
        }
    },
    components: {
        regionTypePicker,
        regionHead
    },
    computed: {
        regionOfFocus() {
            return this.$store.getters['ui/getRegionOfFocus'](this.view.currentRegion);
        }
    }
}
</script>


<template>
    <div class="Region">
        <region-head
            :view="view"
            :region="regionOfFocus"/>

        <div class="region-details__section">
            <region-type-picker
                :view="view"
                :type-as-region-title="true"/>
        </div>

        <slot/>
    </div>
</template>


<style lang="scss"></style>
