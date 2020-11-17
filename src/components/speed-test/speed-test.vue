<script>
    import speedTestRegion from "./speed-test-region";
    import View from "@/classes/View";
    import headerMenu from "../main/header-menu";
    import mapSignaling from "../map/map-signaling";
    import searchRegions from "../main/regions/search/search-regions";
    import timeSlider from "../view/time-slider";
    import regionTypePicker from "@/components/main/regions/region-type/region-type-picker";
    import dateTools from '@/tools/date';


    export default {
        name: 'speed-test',
        components: {
            timeSlider,
            searchRegions,
            mapSignaling,
            headerMenu,
            regionTypePicker,
            speedTestRegion
        },
        props: {},
        data() {
            return {
                view: new View({id: 1})
            }
        },
        computed: {
            regions() {
                return this.$store.getters['ui/regions'];
            },
            currentRegion() {
                return this.view.currentRegion ? this.view.currentRegion : this.regions[2];
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            showMap() {
                return this.$store.state.ui.menu === 'map';
            }
        },
        methods: {
            readQuery() {
                let region, string, date, offset;
                if (this.$route.query.region) {
                    string = decodeURI(this.$route.query.region);
                    region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', string, true);
                    if (region) {
                        this.view.currentRegion = region;
                    }
                }
                if (this.$route.query.date) {
                    date = new Date(this.$route.query.date);
                    offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, date.getTime());
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
    <div class="standard-view speed-test">
        <header-menu
                :view="view"
                :editable="true"/>

        <div class="content">
            <div
                    :class="{'panel--active': showMap}"
                    class="panel standard-view-map">
                <search-regions
                        :view="view"/>

                <region-type-picker
                        :view="view"/>

                <map-signaling
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

            <div class="speed-test__regions">
                <speed-test-region
                        :region="currentRegion"
                        :view="view"/>
            </div>

        </div>
    </div>

</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .speed-test {

        .speed-test__regions {
            width: 750px;
            height: 100%;
            overflow: auto;
        }
    }
</style>