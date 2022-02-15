<script>
export default {
    name: 'map-navigation-position',
    methods: {
        togglePanModus() {
            this.$store.commit("settings/togglePanModus")
        }
    },
    computed: {
        panModus() {
            return this.$store.state.settings.panModus;
        }
    }
}
</script>


<template>
    <div class="map-navigation-position map-navigation__section">
        <h3>
            Move
        </h3>
        <button
            @click="togglePanModus"
            :class="{ 'button--active': panModus }">
            Move mode
        </button>

        <div class="map-navigation__hint">
            Drag map<br>when mode active
        </div>
    </div>
</template>


<style lang="scss">
.map-navigation-position {
    .button--active {
        background: #7ab6ff;
    }
}
</style>
