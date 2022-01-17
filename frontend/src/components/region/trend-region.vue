<script>
import _Region from "@/classes/region/_Region";
import View from "@/classes/View";
import numberTools from '@/tools/number';
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
        },
        value: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },
    computed: {
        formatted() {
            return numberTools.format(Math.round(this.value), true);
        },
        isCurrent() {
            return childRegionToParent(this.view.currentRegion, this.$store.state.ui.currentRegionType) === this.region;
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
            ({{formatted}}
            <span class="abs-rel">
                {{unit}}
            </span>)
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

    &__info {

        .abs-rel {
            color: blue;
            text-transform: uppercase;
            font-size: 75%;
            top: -2px;
            position: relative;
            font-weight: 400;

            &.abs-rel--big {
                margin-left: 2px;
                top: -6px;
                font-size: 60%;
            }
        }
    }

    &--current {
        background: yellow;
    }
}
</style>
