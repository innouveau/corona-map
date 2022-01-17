<script>
import _Region from "@/classes/region/_Region";
import View from "@/classes/View";
import { parentRegionToChild, childRegionToParent } from "@/tools/region";

export default {
    name: 'trend-region',
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
        isCurrent() {
            return this.view.currentRegion && childRegionToParent(this.view.currentRegion, this.$store.state.ui.currentRegionType) === this.region;
        },
    },
    methods: {
        select() {
            this.view.currentRegion = parentRegionToChild(this.region);
            this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
        }
    }
}
</script>


<template>
    <div
        @click="select"
        :class="{'trend-region--current': isCurrent }"
        class="trend-region">
        <div class="trend-region__title">
            {{region.title}}
        </div>
        <div class="trend-region__info">
            <slot/>
        </div>
    </div>
</template>


<style lang="scss">
.trend-region {
    display: flex;
    cursor: pointer;

    &__title {
        margin-right: 4px;
    }

    &--current {
        background: yellow;
    }
}
</style>
