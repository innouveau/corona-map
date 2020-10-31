<script>
    import sewageTools from "./sewage-tools";
    import sewageCity from "./sewage-city";
    import sewageTotals from "./totals/sewage-totals";

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
                settings: {
                    width: 4,
                    margin: 1,
                    start: 56,
                    end: 0,
                    calibration: 100,
                    minPopulation: 0,
                    maxPopulation: 1000000,
                    search: 'Amsterdam',
                    ignoreOutliers: true
                }
            }
        },
        computed: {
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            cities() {
                return this.$store.state.cities.all.filter(city => {
                    let sewageTreatmentPlants, sewageTreatmentPlantsMatchingDate, cityTitle, search;
                    cityTitle = city.title.toLowerCase();
                    search = this.settings.search.toLowerCase();
                    if (search.length > 0 && cityTitle.indexOf(search) === -1) {
                        return false;
                    } else {
                        sewageTreatmentPlants = this.$store.state.sewageTreatmentPlants.all.filter(s => {
                            return s.city_code === city.identifier;
                        });
                        sewageTreatmentPlantsMatchingDate = sewageTreatmentPlants.filter(s => {
                            return s.measurements.filter(measurement => {
                                return measurement.dateOffset <= this.settings.start && measurement.dateOffset >= this.settings.end;
                            }).length > 0;
                        });
                        return city.population >= this.settings.minPopulation && city.population <= this.settings.maxPopulation && (search.length === 0 || cityTitle.indexOf(search) > -1) && sewageTreatmentPlantsMatchingDate.length > 0;
                    }

                }).sort((a,b) => (a.getRelativeIncreaseWeek() > b.getRelativeIncreaseWeek()) ? -1 : ((b.getRelativeIncreaseWeek() > a.getRelativeIncreaseWeek()) ? 1 : 0));
            },
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage">
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
            padding: 16px;
        }
    }
</style>