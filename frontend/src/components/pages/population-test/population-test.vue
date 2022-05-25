<script>
import View from "@/classes/View";
import headerMenu from "@/components/pages/header/header-menu";
import mapSignaling from "@/components/map/Map";
import searchRegions from "@/components/map/search/search-regions";
import timeSlider from "@/components/time/time-slider/time-slider";
import regionTypePicker from "@/components/elements/region-type/region-type-picker";
import dateTools from "@/tools/date";
import populationTestGroup from "./population-test-group";
import PopulationTestRegion from "./population-test-region";

export default {
    name: "population-test",
    components: {
        PopulationTestRegion,
        populationTestGroup,
        timeSlider,
        searchRegions,
        mapSignaling,
        headerMenu,
        regionTypePicker,
    },
    props: {},
    data() {
        let view = {
            id: 1,
            pcrWeekly: true,
        };
        return {
            view: new View(view),
            groups: [
                {
                    title: "Pilot regions (3 population test rounds)",
                    label: "SK",
                    color: "blue",
                    regions: [
                        {
                            title: "Tvrdošín",
                            position: {
                                x: 40,
                                y: -80,
                            },
                        },
                        {
                            title: "Námestovo",
                            position: {
                                x: 10,
                                y: -90,
                            },
                        },
                        {
                            title: "Dolný Kubín",
                            position: {
                                x: -30,
                                y: -90,
                            },
                        },
                        {
                            title: "Bardejov",
                            position: {
                                x: -20,
                                y: -70,
                            },
                        },
                    ],
                },
                {
                    title: "Czech regions (no population test)",
                    label: "CZ",
                    color: "red",
                    regions: [
                        {
                            title: "Moravian-Silesian Region",
                            position: {
                                x: -10,
                                y: -90,
                            },
                        },
                        {
                            title: "Zlin Region",
                            position: {
                                x: -80,
                                y: -110,
                            },
                        },
                        {
                            title: "South Moravian Region",
                            position: {
                                x: -40,
                                y: -40,
                            },
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        selectionGroup() {
            return {
                title: "Selection",
                label: "X",
                color: "purple",
            };
        },
        countryGroup() {
            return {
                title: "Country",
                label: "◯",
                color: "orange",
            };
        },
        regions() {
            return this.$store.getters["regions/regionsForRegionType"];
        },
        country() {
            return this.$store.state.countries.all.find((c) => {
                return this.regions[0].country_id === c.id;
            });
        },
        currentRegion() {
            return this.view.currentRegion
                ? this.view.currentRegion
                : this.regions.find((region) => region.title === "Tvrdošín");
        },
        currentMap() {
            return this.$store.state.maps.current;
        },
        showMap() {
            return this.$store.state.ui.menu === "map";
        },
        labels() {
            let labels = [];
            for (let group of this.groups) {
                for (let item of group.regions) {
                    let region = this.$store.getters[
                        "regions/getItemByProperty"
                    ]("title", item.title, true);
                    labels.push({
                        region,
                        color: group.color,
                        title: group.label,
                        position: item.position,
                    });
                }
            }
            return labels;
        },
    },
    methods: {
        readQuery() {
            let region, string, offset;
            if (this.$route.query.region) {
                string = decodeURI(this.$route.query.region);
                region = this.$store.getters["regions/getItemByProperty"](
                    "title",
                    string,
                    true
                );
                if (region) {
                    this.view.currentRegion = region;
                }
            }
            if (this.$route.query.date) {
                offset = dateTools.getOffsetByDate(this.$route.query.date);
                this.view.offset = offset;
            }
        },
    },
    mounted() {
        this.readQuery();
    },
};
</script>

<template>
    <div class="standard-view population-test">
        <header-menu :view="view" :editable="true" />

        <div class="content">
            <div
                :class="{ 'panel--active': showMap }"
                class="panel standard-view-map"
            >
                <search-regions :view="view" />

                <map-signaling
                    :view="view"
                    :show-tools="true"
                    :show-legend="true"
                    :offset="view.offset"
                    :labels="labels"
                />

                <div class="standard-view-map__tools">
                    <time-slider v-if="true" :view="view" />
                </div>
            </div>

            <div class="population-test__dashboard">
                <population-test-region
                    :region="country"
                    :view="view"
                    :group="countryGroup"
                />
                <population-test-region
                    v-if="view.currentRegion"
                    :region="view.currentRegion"
                    :view="view"
                    :group="selectionGroup"
                />
                <population-test-group
                    v-for="group in groups"
                    :group="group"
                    :view="view"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

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
