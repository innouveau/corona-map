<script>
export default {
    name: "map-navigation-zoom",
    methods: {
        zoomIn() {
            this.$store.commit("settings/zoomIn");
        },
        zoomOut() {
            this.$store.commit("settings/zoomOut");
        },
        handleScroll(event) {
            const max = 400;
            const scrollDistance = Math.min(Math.abs(event.deltaY), max);
            const scrollDirection = Math.sign(event.deltaY);
            const factor = 1 - (scrollDirection * scrollDistance) / (max * 1.1);
            this.$store.commit("settings/zoom", factor);
        },
    },
    mounted() {
        this.$el.addEventListener("wheel", this.handleScroll);
    },
    destroyed() {
        this.$el.removeEventListener("wheel", this.handleScroll);
    },
};
</script>

<template>
    <div class="map-navigation-zoom map-navigation__section">
        <h3>Zoom</h3>
        <button @click="zoomIn">+</button>
        <button @click="zoomOut">-</button>
        <div class="map-navigation__hint">Or use<br />scroll wheel</div>
    </div>
</template>

<style lang="scss">
.map-navigation-zoom {
}
</style>
