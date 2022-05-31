<script>
import View from "@/classes/View";

export default {
    name: "map-source-picker",
    components: {},
    props: {
        view: {
            type: View,
            required: true,
        },
    },
    computed: {
        sources() {
            return this.$store.state.sources.all;
        },
        currentSource() {
            return this.view.currentSource;
        },
        currentMap() {
            return this.$store.state.maps.current;
        },
    },
    methods: {
        pickSource(source) {
            this.view.currentSource = source;
        },
        isActive(source) {
            return source === this.currentSource;
        },
    },
};
</script>

<template>
    <div class="map-source-picker">
        <div
            v-for="(source, index) in sources"
            :key="index"
            @click="pickSource(source)"
            :class="{ 'map-source-picker__button--active': isActive(source) }"
            class="map-source-picker__button"
        >
            {{ translate(source.key, true) }}
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.map-source-picker {
    font-size: 10px;
    display: flex;

    .map-source-picker__button {
        margin-right: 12px;
        cursor: pointer;
        border-bottom: 1px solid transparent;
        position: relative;

        &:after {
            content: "/";
            position: absolute;
            right: -8px;
            top: 1px;
        }

        &.map-source-picker__button--active {
            border-bottom: 1px solid $map-color-super-dark;
        }

        &:last-child {
            margin-right: 0;

            &:after {
                display: none;
            }
        }
    }
}
</style>
