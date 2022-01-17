<script>
    import regionType from "./region-type";
    import View from "@/classes/View";

    export default {
        name: 'region-type-picker',
        components: {
            regionType
        },
        props: {
            view: {
                type: View,
                required: true
            },
            typeAsRegionTitle: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            types() {
                return this.$store.state.maps.current.settings.regionTypes;
            }
        }
    }
</script>


<template>
    <div class="region-type-picker">
        <div
            v-if="types.length > 1"
            class="region-type-picker__container">
            <region-type
                v-for="type in types"
                :view="view"
                :type="type"
                :type-as-region-title="typeAsRegionTitle"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-type-picker {

        .region-type-picker__container {
            display: flex;
            flex-wrap: wrap;
            //border-bottom: 1px solid $map-color-dark;
            //border-top: 1px solid $map-color-dark;
            //border-left: 1px solid $map-color-dark;
        }
    }
</style>
