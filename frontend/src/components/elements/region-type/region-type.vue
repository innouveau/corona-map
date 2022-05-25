<script>
import swatch from "@/components/region/swatch";
import View from "@/classes/View";
import { getRegionFromBaseRegion } from "@/tools/relations";

export default {
    name: "region-type",
    components: {
        swatch,
    },
    props: {
        view: {
            type: View,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        typeAsRegionTitle: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        isActive() {
            return this.$store.state.ui.currentRegionType === this.type;
        },
        title() {
            if (this.typeAsRegionTitle) {
                const baseRegion = this.view.currentRegion;
                const region = getRegionFromBaseRegion(baseRegion, this.type);
                return region ? region.title : "";
            } else {
                return this.translate(this.type, true);
            }
        },
    },
    methods: {
        select() {
            this.$store.commit("ui/updateProperty", {
                key: "currentRegionType",
                value: this.type,
            });
        },
    },
};
</script>

<template>
    <div
        @click="select"
        :class="{
            'region-type--current': isActive,
        }"
        class="region-type"
    >
        {{ title }}
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.region-type {
    position: relative;
    cursor: pointer;
    margin-right: 16px;
    height: 16px;
    font-size: 10px;

    &:after {
        content: "»";
        position: absolute;
        right: -11px;
        top: calc(50% - 1px);
        transform: translateY(-50%);
    }

    &:last-child {
        margin-right: 0;

        &:after {
            display: none;
        }
    }

    &.region-type--current {
        border-bottom: 1px solid $map-color-dark;
    }
}
</style>
