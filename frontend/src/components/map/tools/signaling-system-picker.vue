<script>
import View from "@/classes/View";

export default {
    name: "signaling-system-picker",
    components: {},
    props: {
        view: {
            type: View,
            required: true,
        },
    },
    computed: {
        currentSource() {
            return this.view.currentSource;
        },
        signalingSystems() {
            return this.$store.state.signalingSystems.all.filter(
                (s) => s.source === this.currentSource.key
            );
        },
    },
    methods: {
        select(signalingSystem) {
            this.$store.commit("sources/updatePropertyOfItem", {
                item: this.currentSource,
                property: "signalingSystem_id",
                value: signalingSystem.id,
            });
            this.$parent.close();
        },
        isActive(signalingSystem) {
            return this.currentSource.signalingSystem_id === signalingSystem.id;
        },
    },
};
</script>

<template>
    <div class="signaling-system-picker">
        <div class="map-tools-popup__head">
            {{ translate("signaling-system", true) }}
        </div>
        <div class="map-tools-popup__body">
            <div
                v-for="(signalingSystem, index) in signalingSystems"
                :key="index"
                @click="select(signalingSystem)"
                :class="{
                    'map-tools-popup__button--active':
                        isActive(signalingSystem),
                }"
                class="map-tools-popup__button"
            >
                <div class="map-tools-popup__checkmark">
                    <img src="assets/img/tools/checkmark.svg" />
                </div>
                <div class="map-tools-popup__title">
                    {{ signalingSystem.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.signaling-system-picker {
}
</style>
