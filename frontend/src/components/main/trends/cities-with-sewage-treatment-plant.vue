<script>
    import View from "@/classes/View";
    import region from "@/components/main/trends/region";

    export default {
        name: 'cities-with-sewage-treatment-plant',
        components: {
            region
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        data() {
            return {
                dateOffsetMin: 7,
                dateOffsetMax: 7
            }
        },
        computed: {
            regions() {
                return this.$store.state.cities.all.filter(city => {
                    let sewageTreatmentPlants, sewageTreatmentPlantsMatchingDate;
                    sewageTreatmentPlants = this.$store.state.sewageTreatmentPlants.all.filter(s => {
                        return s.city_code === city.identifier;
                    });
                    sewageTreatmentPlantsMatchingDate = sewageTreatmentPlants.filter(s => {
                        return s.measurements.filter(measurement => {
                            return measurement.dateOffset <= this.overallOffset + this.dateOffsetMin && measurement.dateOffset >= this.overallOffset - this.dateOffsetMax;
                        }).length > 0;
                    });
                    return sewageTreatmentPlantsMatchingDate.length > 0;
                }).sort((a,b) => (a.getRelativeIncreaseWeek() > b.getRelativeIncreaseWeek()) ? -1 : ((b.getRelativeIncreaseWeek() > a.getRelativeIncreaseWeek()) ? 1 : 0));
            },
            overallOffset: {
                get() {
                    return this.$store.state.settings.currentDateOffset;
                },
                set(value) {
                    this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: Number(value)});
                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="section cities-with-sewage-treatment-plant">
        <div class="section__header">
            Gemeentes met een rioolmeting tussen
        </div>
        <div class="section__body">
            <p>
                Algeheel dagen terug in de tijd
                <input
                    type="number"
                    v-model="overallOffset"><br>
                (160 is ongeveer maart/april)
            </p>
            <p>
                Toon gemeentes met een meting:<br>
                <input
                    type="number"
                    v-model="dateOffsetMin">
                Dagen ervoor<br>
                <input
                    type="number"
                    v-model="dateOffsetMax">
                Dagen erna
            </p>
        </div>
        <div class="section__body">
            <div class="cities__list">
                <region
                    v-for="region in regions"
                    :view="view"
                    :region="region"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities-with-sewage-treatment-plant {

        input {
            width: 50px;
            padding: 4px;
        }
    }
</style>