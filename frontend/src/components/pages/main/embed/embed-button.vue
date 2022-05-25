<script>
export default {
    name: "embed-button",
    components: {},
    props: {},
    computed: {},
    methods: {
        openEmbedPopup() {
            this.$store.commit("ui/updateProperty", {
                key: "embedPopup",
                value: true,
            });
        },
    },
};
</script>

<template>
    <div @click="openEmbedPopup()" class="embed-button icon-button">
        <img src="assets/img/tools/embed.svg" />
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.embed-button {
}
</style>
