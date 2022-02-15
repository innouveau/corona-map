<script>
export default {
    name: 'map-navigation-position',
    methods: {
        up() {
            this.$store.commit('settings/navigateUp');
        },
        down() {
            this.$store.commit('settings/navigateDown');
        },
        left() {
            this.$store.commit('settings/navigateLeft');
        },
        right() {
            this.$store.commit('settings/navigateRight');
        }
    }
}
</script>


<template>
    <div class="map-navigation-position map-navigation__section">
        <button @click="up">↑</button>
        <button @click="down">↓</button>
        <button @click="left">←</button>
        <button @click="right">→</button>
    </div>
</template>


<style lang="scss">
.map-navigation-position {

}
</style>
