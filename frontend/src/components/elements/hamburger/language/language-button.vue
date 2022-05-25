<script>
import Language from "@/classes/Language";

export default {
    name: "language-button",
    components: {},
    props: {
        language: {
            type: Language,
            required: true,
        },
    },
    computed: {
        isCurrent() {
            return this.$store.state.languages.current === this.language;
        },
    },
    methods: {
        select() {
            this.$store.commit("languages/setCurrent", this.language);
            this.$store.commit("ui/updateProperty", {
                key: "hamburgerMenu",
                value: false,
            });
        },
    },
};
</script>

<template>
    <div
        @click="select()"
        :class="{ 'language-button--current': isCurrent }"
        class="language-button"
    >
        {{ language.iso_code }}
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.language-button {
    position: relative;
    padding: 2px 2px;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    text-transform: uppercase;
    margin: 0 2px;

    &:last-child {
        border-right: 0;
    }

    &.language-button--current {
        border-bottom: 1px solid #000;
    }
}
</style>
