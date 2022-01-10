<script>
    import View from "@/classes/View";
    import headerMenu from "@/components/_pages/main/header-menu";
    import mapChange from "../map/map-change";
    import regionDetailsChange from "./region-details-change";
    import searchRegions from "@/components/_pages/main/regions/search/search-regions";
    import timeSlider from "../view/time-slider";
    import changeTrends from "./trends/change-trends";
    import dateTools from '@/tools/date';
    import query from '@/components/elements/query'

    export default {
        name: 'change',
        components: {
            changeTrends,
            timeSlider,
            searchRegions,
            regionDetailsChange,
            mapChange,
            headerMenu
        },
        mixins: [query],
        props: {},
        data() {
            return {
                view: new View({id: 1})
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            showMap() {
                return this.$store.state.ui.menu === 'map';
            }
        },
        methods: {
            readQuery() {
                let region, string, offset;
                if (this.$route.query.region) {
                    string = decodeURI(this.$route.query.region);
                    region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', string, true);
                    if (region) {
                        this.view.currentRegion = region;
                    }
                }
                if (this.$route.query.date) {
                    offset = dateTools.getOffsetByDate(this.$route.query.date);
                    this.view.offset = offset;
                }
            }
        },
        mounted() {
            this.readQuery();
        }
    }
</script>


<template>
    <div class="standard-view change">
        <header-menu
            :view="view"
            :editable="true"/>

        <div class="content">
            <div
                :class="{'panel--active': showMap}"
                class="panel standard-view-map">
                <search-regions
                    :view="view"/>

                <map-change
                    :view="view"
                    :show-tools="true"
                    :show-legend="true"
                    :offset="view.offset"
                    :step="15"/>

                <div class="standard-view-map__tools">
                    <time-slider
                        :view="view"/>
                </div>
            </div>

            <region-details-change
                v-if="view.currentRegion"
                :view="view"
                :region="view.currentRegion"/>

            <change-trends
                :view="view"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .change {

    }
</style>
