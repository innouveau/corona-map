<script>
import mapNavigationZoom from "./map-navigation-zoom";
import mapNavigationPosition from "./map-navigation-position";
import mapNavigationReset from "./map-navigation-reset";

export default {
    name: 'map-navigation',
    components: {
        mapNavigationReset, mapNavigationZoom, mapNavigationPosition
    }
}
</script>


<template>
    <div class="map-navigation">
        <map-navigation-zoom />
        <map-navigation-position />
        <map-navigation-reset />
    </div>
</template>


<style lang="scss">
@import '@/styles/variables.scss';

.map-navigation {
    display: flex;
    align-items: center;
    padding: 4px 0;

    &__hint {
        margin-left: 4px;
        line-height: 1.1;
        font-style: italic;
    }

    &__section {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0 12px;
        border-right: 1px solid #888;
        height: 100%;

        h3 {
            margin: 0 8px 0 0;
        }

        button {
            background: #fff;
            border: 1px solid #888;
            color: #555;
            font-size: 11px;
            cursor: pointer;
            white-space: nowrap;
            padding: 4px 8px;
        }

        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            border-right: 0;
        }
    }

    @include mobile() {

        &__hint {
            display: none;
        }
    }
}
</style>
