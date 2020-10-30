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
                thresholds: thresholdTools.getThresholds()
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
        class="trends panel">
        <threshold-regions
            v-if="offset === 0 || showTrends"
            :view="view"/>
        <div v-if="showTrends">

            <top-relative-week
                :view="view"/>
            <top-relative
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