<script>
    import View from "@/classes/View";
    import topRelativeWeek from "./top-relative-week";
    import thresholdRegions from "./threshold-regions";
    import thresholdTools from '@/tools/thresholds';
    import topRelativeDay from "./top-relative-day";
    import TopAbsoluteDay from "./top-absolute-day";

    export default {
        name: 'trends',
        components: {
            TopAbsoluteDay,
            topRelativeDay,
            thresholdRegions,
            topRelativeWeek,
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        data() {
            return {
                thresholds: thresholdTools.getThresholds(this.view.currentSource)
            }
        },
        computed: {
            isTrendPanel() {
                return this.$store.state.ui.menu === 'trends';
            },
            offset() {
                return this.view.offset;
            },
            hasDays() {
                return this.$store.state.maps.current.data.positivePcrTests.interval === 1;
            }
        },
    }
</script>


<template>
    <div class="trends">
        <threshold-regions
            :view="view"/>
        <top-relative-week
            :view="view"/>
        <top-relative-day
            v-if="hasDays"
            :view="view"/>
        <top-absolute-day
            v-if="hasDays"
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trends {

    }
</style>
