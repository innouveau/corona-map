<script>
    import sewageTreatmentPlant from "./sewage-treatment-plant";
    import _Region from "@/classes/region/_Region";
    import View from "@/classes/View";

    export default {
        name: 'sewage-treatment-plants',
        components: {
            sewageTreatmentPlant
        },
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            sewageTreatmentPlants() {
                return this.$store.state.sewageTreatmentPlants.all.filter(s => {
                    let key = this.region.regionType === 'city' ? 'city_code' : 'district_code';
                    return s[key] === this.region.identifier;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-treatment-plants">
        <div class="city-details__section-header">
            Rioolmetingen RIVM (RNA/ml)
        </div>
        <div class="sewage-treatment-plants__list">
            <sewage-treatment-plant
                v-for="sewageTreatmentPlant in sewageTreatmentPlants"
                :view="view"
                :sewage-treatment-plant="sewageTreatmentPlant"/>
        </div>

        <div
            v-if="sewageTreatmentPlants.length === 0"
            class="sewage-treatment-plants__note">
            Nog geen riooldata voor deze locatie.
        </div>

    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-treatment-plants {

        .sewage-treatment-plants__list {
            margin-bottom: 10px;
        }

        .sewage-treatment-plants__note {
            margin-bottom: 8px;
            font-style: italic;
            font-size: 11px;
        }
    }
</style>