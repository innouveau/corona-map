<script>
    import searchRegions from "./regions/search/search-regions";
    import mapSignaling from "@/components/map/map-signaling";
    import timeSlider from "@/components/view/time-slider";
    import embedButton from "./embed-button";
    import View from "@/classes/View";

    export default {
        name: 'main-view-map',
        components: {
            mapSignaling,
            searchRegions,
            timeSlider,
            embedButton
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        data() {
            return {
                initialised: false
            }
        },
        computed: {
            showMap() {
                return this.$store.state.ui.menu === 'map';
            },
            currentSource() {
                return this.view.currentSource;
            },
            showEmbedButton() {
                return this.$store.state.ui.presets !== 'radio1';
            }
        },
        methods: {
            init(){
                // this does render all other components
                // 1 callstack before the map, so there is
                // already a feeling something is there to see
                setTimeout(() => {
                    this.initialised = true;
                })
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            currentSource: function () {
                this.$store.commit('ui/updateProperty', {key: 'showTrends', value: false});
            }
        }
    }
</script>


<template>
    <div
        :class="{'panel--active': showMap}"
        class="panel main-view-map standard-view-map">

        <search-regions
            :view="view"/>

        <map-signaling
            v-if="initialised"
            :view="view"
            :show-tools="true"
            :show-legend="true"
            :offset="view.offset"/>


        <div class="standard-view-map__tools">
            <time-slider
                v-if="true"
                :view="view"/>

            <embed-button
                v-if="showEmbedButton"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .standard-view-map {
        padding-bottom: 0;
        background: $map-color;
        position: relative;

        .search-regions {
            height: 36px;
            margin-bottom: 6px;
        }

        .map,
        .map-change {
            height: calc(100% - 82px);
        }


        .standard-view-map__tools {
            height: 40px;
            display: flex;
            align-items: center;

            .time-slider {
                width: calc(100% - 34px);
            }

            .embed-button {
                margin-left: 8px;
            }
        }
    }
</style>