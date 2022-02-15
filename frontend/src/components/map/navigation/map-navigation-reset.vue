<script>
export default {
    name: 'map-navigation-reset',
    methods: {
        reset() {
            this.$store.commit('settings/resetNavigationZoom');
        }
    }
}
</script>


<template>
    <div class="map-navigation-reset map-navigation__section">
        <button @click="reset">Reset</button>
    </div>
</template>


<style lang="scss">
.map-navigation-reset {

}
</style>
