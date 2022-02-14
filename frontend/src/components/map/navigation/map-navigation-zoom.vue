<script>
export default {
    name: 'map-navigation-zoom',
    methods: {
        zoomIn() {
            this.$store.commit('maps/zoomIn');
        },
        zoomOut() {
            this.$store.commit('maps/zoomOut');
        }
    }
}
</script>

<template>
    <div class="map-navigation-zoom map-navigation__section">
        <button @click="zoomIn">+</button>
        <button @click="zoomOut">-</button>
    </div>
</template>


<style lang="scss">
.map-navigation-zoom {

}
</style>
