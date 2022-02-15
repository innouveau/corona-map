<script>
export default {
    name: 'bookmark',
    components: {},
    props: {
        bookmark: {
            type: Object,
            required: true
        }
    },
    methods: {
        navigate() {
            this.$emit("close");
            const scaleNavigation = (navigation) => {
                return {
                    zoom: navigation.zoom,
                    position: {
                        // measurement done on screen with scale = 250
                        x: navigation.position.x * (this.$store.state.settings.scale / 250),
                        y: navigation.position.y * (this.$store.state.settings.scale / 250),
                    }
                }
            }

            const navigation = scaleNavigation(this.bookmark.navigation);

            this.$store.commit("settings/navigateTo", navigation)
        }
    }
}
</script>


<template>
    <div
        @click="navigate"
        class="bookmark">
        {{ bookmark.title }}
    </div>
</template>


<style lang="scss">
.bookmark {
    cursor: pointer;
    border-bottom: 1px solid #ddd;
    padding: 4px 8px;

    &:hover {
        background: #ddd;
    }
}
</style>
