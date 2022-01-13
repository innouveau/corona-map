<script>
    import View from "@/classes/View";
    import _Region from "@/classes/region/_Region";
    import swatch from "@/components/region/swatch";

    export default {
        name: 'region',
        components: {
            swatch
        },
        props: {
            region: {
                type: _Region,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            isCurrent() {
                return this.view.currentRegion === this.region;
            }
        },
        methods: {
            selectRegion() {
                if (this.region.regionType === 'city' || this.region.regionType === 'district') {
                    this.view.currentRegion = this.region;
                }
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
            }
        }
    }
</script>


<template>
    <div
        @click="selectRegion()"
        :class="{'region--current': isCurrent}"
        class="region">
        {{region.title}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region {
        cursor: pointer;
        border-bottom: 1px solid transparent;
        margin-right: 4px;
        // font-weight: 700;
        // background: #ddd;

        &--current {
            background: yellow;
        }
    }
</style>
