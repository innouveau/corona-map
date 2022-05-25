<script>
import d3SignalingGraphMixin from "@/mixins/d3-signaling-graph-mixin.js";

export default {
    name: "population-test-graph",
    components: {},
    props: {},
    mixins: [d3SignalingGraphMixin],
    data() {
        return {
            mapType: "population-test-graph",
        };
    },
    computed: {
        title() {
            return "Population tests";
        },
    },
    methods: {
        redraw() {
            this.clear();
            this.drawBackground("#f5eedc");
            this.drawGrid();
            if (this.days.length > 0) {
                this.drawSignalingBars("positiveTests", "rgba(0,0,0,0.15)");
                this.drawAntigenTestsBars("rgba(255,0,0,0.5)");
                // this.drawSignalingLine('positiveAntigenTests', true, false, '#ff0000');
                // this.drawSignalingLine('positiveTests', true, false, '#000');
            }
            this.drawDates();
        },
    },
    mounted() {
        this.redraw();
    },
    watch: {
        offset: {
            handler: function (newValue) {
                setTimeout(() => {
                    this.redraw();
                });
            },
        },
    },
};
</script>

<template>
    <div class="population-test-graph">
        <div ref="container" class="administered-tests__container">
            <svg
                :style="{
                    width: canvasWidth + 'px',
                    height: canvashHeight + 'px',
                }"
            ></svg>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.population-test-graph {
}
</style>
