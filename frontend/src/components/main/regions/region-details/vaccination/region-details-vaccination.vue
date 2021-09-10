<script>
    import RegionDetailsVaccinationAgeGroup from "./region-details-vaccination-age-group";
    export default {
        name: 'region-details-vaccination',
        components: {RegionDetailsVaccinationAgeGroup},
        props: {
            vaccination: {
                type: Array,
                required: true
            }
        },
        computed: {
            ageGroup() {
                return this.vaccination.find(a => a.ageGroup === '12+');
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-details-vaccination">
        <region-details-vaccination-age-group
            v-for="ageGroup of vaccination"
            :age-group="ageGroup"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-vaccination {

    }
</style>