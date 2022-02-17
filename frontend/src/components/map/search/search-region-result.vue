<script>
    import Region from "@/classes/region/Region";
    import View from "@/classes/View";
    import { parentRegionToChild } from "@/tools/region";

    export default {
        name: 'search-region-result',
        props: {
            region: {
                type: Object,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        methods: {
            select() {
                this.view.currentRegion = parentRegionToChild(this.region);
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                this.$store.commit('ui/updateProperty', {key: 'menu', value: 'details'});
            }
        }
    }
</script>


<template>
    <div
        @click="select()"
        class="search-region-result">
        {{region.title}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .search-region-result {
        border-bottom: 1px solid $grey-1;
        padding: 14px 10px;
        cursor: pointer;

        &:hover {
            background: $grey-1;
        }
    }
</style>
