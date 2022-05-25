<script>
import View from "@/classes/View";
import { getBaseRegions } from "@/tools/relations";

export default {
    name: "trend-region",
    props: {
        view: {
            type: View,
            required: true,
        },
        region: {
            type: Object,
            required: true,
        },
    },
    computed: {
        baseRegion() {
            return getBaseRegions(
                this.region,
                this.$store.state.ui.currentRegionType
            )[0];
        },
        isCurrent() {
            return (
                this.view.currentRegion &&
                this.baseRegion === this.view.currentRegion
            );
        },
    },
    methods: {
        select() {
            this.view.currentRegion = this.baseRegion;
            this.$store.commit("ui/updateProperty", {
                key: "searchValue",
                value: "",
            });
        },
    },
};
</script>

<template>
    <div
        @click="select"
        :class="{ 'trend-region--current': isCurrent }"
        class="trend-region"
    >
        <div class="trend-region__title">
            {{ region.title }}
        </div>
        <div class="trend-region__info">
            <slot />
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
