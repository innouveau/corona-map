<script>
    import View from "@/classes/View";
    import topRelativeWeek from "./top-relative-week";
    import thresholdRegions from "./threshold-regions";
    import thresholdTools from '@/tools/thresholds';
    import citiesWithSewageTreatmentPlant from "./cities-with-sewage-treatment-plant";
    import topAbsolute from "./top-absolute";
    import topRelative from "./top-relative";

    export default {
        name: 'trends',
        components: {
            topRelative,
            topAbsolute,
            citiesWithSewageTreatmentPlant,
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
                thresholds: thresholdTools.getThresholds(),
                show: false
            }
        },
        computed: {
            showTrends() {
                return this.$store.state.ui.menu === 'trends';
            },
            offset() {
                return this.view.offset;
            }
        },
        methods: {},
        watch: {
            offset: {
                handler: function () {
                    if (this.offset === 0) {
                        setTimeout(() => {
                            this.show = true;
                        }, 100)
                    } else {
                        this.show = false;
                    }
                }
            }
        },
        mounted() {
            if (this.offset === 0) {
                setTimeout(() => {
                    this.show = true;
                }, 100)
            }
        }
    }
</script>


<template>
    <div
        :class="{'panel--active': showTrends}"
        class="trends panel">
        <div v-if="show">
            <threshold-regions
                :view="view"/>
            <top-relative-week
                :view="view"/>
            <top-relative
                :view="view"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trends {

    }
</style>