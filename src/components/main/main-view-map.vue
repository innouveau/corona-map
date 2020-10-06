<script>
    import searchRegions from "./regions/search/search-regions";
    import regionTypePicker from "./regions/region-type/region-type-picker";
    import mapTests from "@/components/map/map";
    import timeSlider from "@/components/view/time-slider";
    import embedButton from "./embed-button";
    import View from "@/classes/View";

    export default {
        name: 'main-view-map',
        components: {
            searchRegions,
            regionTypePicker,
            mapTests,
            timeSlider,
            embedButton
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            showMap() {
                return this.$store.state.ui.menu === 'map';
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :class="{'panel--active': showMap}"
        class="panel main-view-map">

        <search-regions
            :view="view"/>

        <region-type-picker
            :view="view"/>

        <map-tests
            :view="view"
            :show-tools="true"
            :show-legend="true"
            :offset="view.offset"/>

        <div class="main-view-map__tools">
            <time-slider
                v-if="true"
                :view="view"/>

            <embed-button/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .main-view-map {
        padding-bottom: 0;

        .search-regions {
            height: 36px;
            margin-bottom: 6px;
        }

        .region-type-picker {
            height: 24px;
        }

        .map {
            height: calc(100% - 106px);
        }

        .main-view-map__tools {
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