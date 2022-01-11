<script>
    import translate from "@/components/elements/translate";

    export default {
        name: 'gradient-toggle',
        components: {
            translate
        },
        props: {},
        computed: {
            gradient() {
                return this.$store.state.settings.gradient;
            },
            isActive() {
                return this.$store.state.settings.gradient;
            }
        },
        methods: {
            toggle() {
                this.$store.commit('settings/updateProperty', {key: 'gradient', value: !this.gradient});
                this.$parent.close();
            }
        }
    }
</script>


<template>
    <div
        @click="toggle()"
        :class="{'map-tools-popup__button--active': isActive}"
        class="map-tools-popup__button">
        <div class="map-tools-popup__checkmark">
            <img src="assets/img/tools/checkmark.svg">
        </div>
        <div class="map-tools-popup__title">
            {{translate('gradient', true)}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .gradient-toggle {
        display: flex;
        align-items: center;
        margin-top: 2px;

        input {
            pointer-events: all;
        }
    }
</style>