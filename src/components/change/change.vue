<script>
    import View from "@/classes/View";
    import headerMenu from "../main/header-menu";
    import mapChange from "../map/map-change";
    import regionDetailsChange from "./region-details-change";
    import searchRegions from "../main/regions/search/search-regions";
    import timeSlider from "../view/time-slider";
    import regionTypePicker from "@/components/main/regions/region-type/region-type-picker";
    import changeTrends from "./trends/change-trends";

    export default {
        name: 'change',
        components: {
            changeTrends,
            timeSlider,
            searchRegions,
            regionDetailsChange,
            mapChange,
            headerMenu,
            regionTypePicker
        },
        props: {},
        data() {
            return {
                view: new View({id: 1})
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="standard-view change">
        <header-menu
            :view="view"
            :editable="true"/>

        <div class="content">
            <div class="panel standard-view-map">
                <search-regions
                    :view="view"/>

                <region-type-picker
                    :view="view"/>

                <map-change
                    :view="view"
                    :show-tools="true"
                    :show-legend="true"
                    :offset="view.offset"/>

                <div class="standard-view-map__tools">
                    <time-slider
                        v-if="true"
                        :view="view"/>
                </div>
            </div>


            <change-trends
                :view="view"/>

            <region-details-change
                v-if="view.currentRegion"
                :view="view"
                :region="view.currentRegion"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .change {

    }
</style>