<script>
import thresholdTools from "@/tools/thresholds";
import colorSetPicker from "./color-set-picker";
import signalingSystemPicker from "./signaling-system-picker";
import mapLegend from "@/components/map/legend/map-legend";
import gradientToggle from "./gradient-toggle";

export default {
    name: "map-tools",
    components: {
        gradientToggle,
        mapLegend,
        signalingSystemPicker,
        colorSetPicker,
    },
    props: {
        showTools: {
            type: Boolean,
            required: true,
        },
        showLegend: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        colorSetting() {
            return this.$store.state.ui.color;
        },
        thresholds() {
            return this.$store.state.signalingSystems.current.thresholds;
        },
    },
    methods: {
        getNumber(threshold) {
            return thresholdTools.getNumber(threshold);
        },
    },
};
</script>

<template>
    <div class="map-tools">
        <map-legend v-if="showLegend" />
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.map-tools {
    pointer-events: none;
}
</style>
