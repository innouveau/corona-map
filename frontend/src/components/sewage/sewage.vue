<script>
    import sewageTools from "./tools/sewage-tools";
    import sewageCity from "./sewage-city";
    import sewageTotals from "./totals/sewage-totals";
    import $ from "jquery";
    import dateTool from "@/tools/date";

    export default {
        name: 'sewage',
        components: {
            sewageTotals,
            sewageCity,
            sewageTools
        },
        props: {},
        data() {
            return {
                loaded: false,
                settings: {
                    width: 2,
                    margin: 4,
                    start: 56,
                    end: 0,
                    calibration: 50,
                    minPopulation: 0,
                    maxPopulation: 1000000,
                    search: '',
                    ignoreOutliers: true,
                    //provinces: ["PV20", "PV21", "PV22", "PV27"],
                    regios: ["Noord", "Niet-Noord"],
                    //regios: ["Noord"],
                    provinces: ["PV20", "PV21", "PV22", "PV23", "PV24", "PV25", "PV26", "PV27", "PV28", "PV29", "PV30", "PV31"],
                    //provinces: ['PV20'],
                    ignoreAmsterdam: false,
                    ignoreWoerden: true,
                    showOnlyTotals: true
                }
            }
        },
        computed: {
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            cities() {
                return this.$store.state.cities.all.filter(city => {
                    return this.matchesSearch(city)
                        && this.matchesProvinces(city)
                        && this.matchesPopulation(city)
                        && this.matchesRegio(city)
                        && this.matchesAmsterdamIgnoring(city)
                        && this.matchesWoerdenIgnoring(city)
                        && this.hasMeasurementsInPeriod(city);
                })
                //.sort((a,b) => (a.getRelativeIncreaseWeek() > b.getRelativeIncreaseWeek()) ? -1 : ((b.getRelativeIncreaseWeek() > a.getRelativeIncreaseWeek()) ? 1 : 0));
            },
            currentMap() {
                return this.$store.state.maps.current;
            }
        },
        methods: {
            matchesWoerdenIgnoring(city) {
                return city.title !== 'Woerden' || !this.settings.ignoreWoerden;
            },
            matchesAmsterdamIgnoring(city) {
                return city.title !== 'Amsterdam' || !this.settings.ignoreAmsterdam;
            },
            matchesProvinces(city) {
                return this.settings.provinces.indexOf(city.province_code) > -1;
            },
            matchesRegio(city) {
                return this.settings.regios.indexOf(city.regio_title) > -1;
            },
            hasMeasurementsInPeriod(city) {
                let sewageTreatmentPlants, sewageTreatmentPlantsMatchingDate;
                sewageTreatmentPlants = this.$store.state.sewageTreatmentPlants.all.filter(s => {
                    return s.city_code === city.identifier;
                });
                sewageTreatmentPlantsMatchingDate = sewageTreatmentPlants.filter(s => {
                    return s.measurements.filter(measurement => {
                        return measurement.dateOffset <= this.settings.start && measurement.dateOffset >= this.settings.end;
                    }).length > 0;
                });
                return sewageTreatmentPlantsMatchingDate.length > 0;
            },
            matchesSearch(city) {
                let search, cityTitle;
                search = this.settings.search.toLowerCase();
                cityTitle = city.title.toLowerCase();
                return search.length === 0 || cityTitle.indexOf(search) > -1
            },
            matchesPopulation(city) {
                return city.population >= this.settings.minPopulation && city.population <= this.settings.maxPopulation;
            },
            loadSewageTreatmentPlants() {
                return new Promise((resolve, reject) => {
                    $.getJSON(this.currentMap.data.sewageMeasurements.source + dateTool.getTimestamp(), (sewageTreatmentPlants) => {
                        this.$store.commit('sewageTreatmentPlants/init', sewageTreatmentPlants);
                        resolve();
                    });
                })
            },
        },
        mounted() {
            this.loadSewageTreatmentPlants().then(() => {
                this.loaded = true;
            });
        }
    }
</script>


<template>
    <div
        v-if="loaded"
        class="sewage">
        <sewage-tools
            :settings="settings"/>
        <div class="sewage__cities">
            <sewage-city
                v-for="city in cities"
                :city="city"
                :settings="settings"/>
        </div>
        <sewage-totals
            :cities="cities"
            :settings="settings"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage {
        height: 100%;
        display: flex;

        .sewage-tools {
            border-right: 1px solid #ddd;
            width: 200px;
            height: 100%;
            position: relative;
            z-index: 1;
            background: #fff;
            box-shadow: 2px 0 8px rgba(0,0,0,0.2);
            overflow: auto;
        }

        .sewage__cities {
            width: calc(50% - 10px);
            border-right: 1px solid #ddd;
            overflow: auto;
            height: 100%;
            padding: 16px;
        }

        .sewage-totals {
            width: calc(50% - 100px);
            overflow: auto;
            height: 100%;
        }
    }
</style>