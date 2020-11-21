<script>
    import View from "@/classes/View";
    import headerMenu from "../main/header-menu";
    import mapSignaling from "../map/map-signaling";
    import searchRegions from "../main/regions/search/search-regions";
    import timeSlider from "../view/time-slider";
    import regionTypePicker from "@/components/main/regions/region-type/region-type-picker";
    import dateTools from '@/tools/date';
    import populationTestGroup from "./population-test-group";
    import query from '@/components/elements/query'

    export default {
        name: 'population-test',
        components: {
            populationTestGroup,
            timeSlider,
            searchRegions,
            mapSignaling,
            headerMenu,
            regionTypePicker
        },
        props: {},
        mixins: [query],
        data() {
            return {
                view: new View({id: 1}),
                groups: [
                    {
                        title: 'Pilot regions',
                        label: 'A',
                        color: 'blue',
                        regions: [
                            {
                                title: 'Tvrdošín',
                                position: {
                                    x: 40,
                                    y: -80
                                }
                            }, {
                                title: 'Námestovo',
                                position: {
                                    x: 10,
                                    y: -90
                                }
                            }, {
                                title: 'Dolný Kubín',
                                position: {
                                    x: -40,
                                    y: -90
                                }
                            }, {
                                title: 'Bardejov',
                                position: {
                                    x: 80,
                                    y: -60
                                }
                            }
                        ]
                    },
                    {
                        title: 'Adjacent regions',
                         label: 'B',
                        color: 'red',
                        regions: [
                            {
                                title: 'Liptovský Mikuláš',
                                position: {
                                    x: 80,
                                    y: -80
                                }
                            }
                            , {
                                title: 'Ružomberok',
                                position: {
                                    x: -130,
                                    y: -50
                                }
                            }, {
                                title: 'Martin',
                                position: {
                                    x: -120,
                                    y: -20
                                }
                            }, {
                                title: 'Sabinov',
                                position: {
                                    x: 40,
                                    y: -110
                                }
                            }
                        ]
                    }
                ]
            }
        },
        computed: {
            regions() {
                return this.$store.getters['ui/regions'];
            },
            currentRegion() {
                return this.view.currentRegion ? this.view.currentRegion : this.regions.find(region => region.title === 'Tvrdošín');
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            showMap() {
                return this.$store.state.ui.menu === 'map';
            },
            labels() {
                let labels = [];
                for (let group of this.groups) {
                    for (let item of group.regions) {
                        let region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', item.title, true);
                        labels.push({
                            region,
                            color: group.color,
                            title: group.label,
                            position: item.position
                        })
                    }
                }
                return labels;
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
    <div class="standard-view population-test">
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
                    :offset="view.offset"
                    :labels="labels"/>

                <div class="standard-view-map__tools">
                    <time-slider
                        v-if="true"
                        :view="view"/>
                </div>
            </div>

            <div class="population-test__dashboard">
                <population-test-group
                    v-for="group in groups"
                    :group="group"
                    :view="view"/>
            </div>
        </div>
    </div>

</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .population-test {

        .content {

            .standard-view-map {
                width: calc(100% - 670px);
            }

            .population-test__dashboard {
                width: 670px;
                height: 100%;
                overflow: auto;
            }
        }


    }
</style>