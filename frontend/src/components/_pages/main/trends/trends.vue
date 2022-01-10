<script>
    import View from "@/classes/View";
    import topRelativeWeek from "./top-relative-week";
    import thresholdRegions from "./threshold-regions";
    import thresholdTools from '@/tools/thresholds';
    import citiesWithSewageTreatmentPlant from "./cities-with-sewage-treatment-plant";
    import topRelativeDay from "./top-relative-day";
    import TopAbsoluteDay from "./top-absolute-day";

    export default {
        name: 'trends',
        components: {
            TopAbsoluteDay,
            topRelativeDay,
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
            showTrends() {
                return this.$store.state.ui.showTrends;
            },
            hasDays() {
                return this.$store.state.maps.current.data.positivePcrTests.interval === 1;
            }
        },
        methods: {
            doShowTrends(){
                this.$store.commit('ui/updateProperty', {key: 'showTrends', value: true});
            }
        },
        watch: {
            offset: {
                handler: function () {
                    this.$store.commit('ui/updateProperty', {key: 'showTrends', value: false});
                }
            }
        }
    }
</script>


<template>
    <div
        :class="{'panel--active': isTrendPanel}"
        class="trends">

        <div v-if="showTrends">

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
        <div v-else>
            <p>
                {{translate('show-notification')}}
            </p>
            <div class="buttons">
                <div
                        @click="doShowTrends()"
                        class="button">
                    {{translate('show-trend')}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trends {

    }
</style>
