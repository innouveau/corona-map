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
.map-navigation {

    &__section {
        padding: 8px;
        border: 1px solid #888;
        border-radius: 8px;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        button {
            background: #fff;
            border: 1px solid #888;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
