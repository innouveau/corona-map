<script>
import cumulativeTools from "@/tools/change";
import { CUMULATIVE_COLOR_SCALE } from "@/data/constants";
import View from "@/classes/View";

export default {
    name: "map-legend-cumulative",
    components: {},
    props: {
        view: {
            type: View,
            required: true,
        },
    },
    computed: {
        sections() {
            return cumulativeTools.sections;
        },
        currentSource() {
            return this.view.currentSource.key;
        },
    },
    methods: {
        getBackground(index) {
            let colors;
            if (index === 0) {
                colors = [CUMULATIVE_COLOR_SCALE[2], CUMULATIVE_COLOR_SCALE[1]];
            } else {
                colors = [CUMULATIVE_COLOR_SCALE[1], CUMULATIVE_COLOR_SCALE[0]];
            }
            return (
                "linear-gradient(180deg, " +
                colors[0] +
                " 0%, " +
                colors[1] +
                " 120%)"
            );
        },
    },
};
</script>

<template>
    <div class="map-legend-cumulative map-legend">
        <div class="map-legend-cumulative__section">
            <div
                :style="{ background: getBackground(0) }"
                class="map-legend-cumulative__color"
            ></div>
            <div
                class="map-legend-cumulative__label map-legend-cumulative__label--top"
            >
                {{ translate("most", true) }} {{ translate(currentSource) }}
                {{ translate("in-period") }}
            </div>
        </div>
        <div class="map-legend-cumulative__section">
            <div
                :style="{ background: getBackground(1) }"
                class="map-legend-cumulative__color"
            ></div>
            <div
                class="map-legend-cumulative__label map-legend-cumulative__label--bottom"
            >
                {{ translate("least", true) }} {{ translate(currentSource) }}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.map-legend-cumulative {
    .map-legend-cumulative__section {
        display: flex;
        align-items: center;
        margin-bottom: -1px;
        position: relative;

        .map-legend-cumulative__color {
            width: 12px;
            border: 1px solid #555;
            margin-right: 4px;
            height: 36px;
        }

        .map-legend-cumulative__label {
            font-size: 9px;
            position: absolute;
            left: 16px;
            margin-top: -5px;
            white-space: nowrap;

            &.map-legend-cumulative__label--top {
                top: 4px;
            }

            &.map-legend-cumulative__label--bottom {
                bottom: 0;
            }
        }

        &:first-child {
            .map-legend-cumulative__color {
                border-bottom: 0;
            }
        }

        &:last-child {
            .map-legend-cumulative__color {
                border-top: 0;
            }
        }
    }
}
</style>
