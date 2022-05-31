<script>
import View from "@/classes/View";
import graphSignaling from "@/components/graphs/graph-signaling";
import regionDetailsNumbers from "./region-details-numbers";
import { getCurrentRegion } from "@/tools/relations";

export default {
    name: "region-details",
    components: {
        regionDetailsNumbers,
        graphSignaling,
    },
    props: {
        view: {
            type: View,
            required: true,
        },
        region: {
            type: Object,
            required: true,
        },
    },
    computed: {
        regionOfFocus() {
            return getCurrentRegion(this.region);
        },
        showDetails() {
            return this.$store.state.ui.menu === "city";
        },
        caseDataLoaded() {
            return this.$store.state.ui.caseDataLoaded;
        },
        caseDataRequested() {
            return this.$store.state.ui.caseDataRequested;
        },
        date() {
            return this.$store.getters["ui/dateString"]();
        },
        currentMap() {
            return this.$store.state.maps.current;
        },
        weeks() {
            return this.$store.state.settings.weeks;
        },
        framesBefore() {
            return (this.weeks * 7) / this.currentMap.settings.interval;
        },
        step() {
            return (
                this.$store.state.settings.step *
                this.currentMap.settings.interval
            );
        },
        sourceIsPositiveTests() {
            return this.view.currentSource.key === "positiveTests";
        },
    },
    methods: {},
};
</script>

<template>
    <div :class="{ 'panel--active': showDetails }" class="region-details">
        <div class="region-details__section">
            <graph-signaling
                :view="view"
                :region="regionOfFocus"
                :frames-before="framesBefore"
                :step="step"
                :height="300"
            />
        </div>

        <div class="region-details__info">
            <region-details-numbers :view="view" :region="regionOfFocus" />
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.region-details {
    font-size: 15px;
    position: relative;

    .age-distribution-graph__container {
        height: 352px;
        position: relative;
        background: #fff;
        margin-bottom: 12px;
    }

    @include mobile() {
        font-size: 12px;

        .region-details__header {
            margin-top: 16px;
        }

        .region-details__info {
            .region-details__row {
                .region-details__label {
                    width: 160px;
                }

                .region-details__value {
                    font-size: 18px;
                    width: calc(100% - 160px);
                }
            }
        }
    }
}

.region-details__section {
    border-bottom: 2px solid #000;
    padding: 10px 0;

    .region-details__section-head {
        font-family: $serif;
        margin-bottom: 16px;
        font-weight: 700;
        font-size: 16px;
    }

    .region-details__section-header {
        font-weight: 700;
        margin-bottom: 4px;
    }

    .region-details__row {
        display: flex;
        padding: 8px 0;
        border-bottom: 1px dashed #555;
        line-height: 1.1;

        &:last-child {
            border-bottom: 0;
        }

        .region-details__label {
            width: 250px;
            display: flex;
            align-items: center;
        }

        .region-details__value {
            font-weight: 700;
            font-family: $monospace;
            font-size: 20px;
            width: calc(100% - 250px);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }

    &:last-child {
        border-bottom: 0;
    }
}
</style>
