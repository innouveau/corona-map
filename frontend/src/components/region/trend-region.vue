<script>
import _Region from "@/classes/region/_Region";
import View from "@/classes/View";
import numberTools from '@/tools/number';

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
            return this.view.currentRegion === this.region;
        }
    },
    methods: {
        select() {
            this.view.currentRegion = this.region;
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

    &--current {
        background: yellow;
    }
}
</style>
