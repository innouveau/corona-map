<script>
export default {
    name: 'map-navigation-position',
    methods: {
        up() {
            this.$store.commit('maps/up');
        },
        down() {
            this.$store.commit('maps/down');
        },
        left() {
            this.$store.commit('maps/left');
        },
        right() {
            this.$store.commit('maps/right');
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
