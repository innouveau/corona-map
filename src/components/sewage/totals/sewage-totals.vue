<script>
    import sewageTotalsSewage from "./sewage-totals-sewage";
    export default {
        name: 'sewage-totals',
        components: {
            sewageTotalsSewage
        },
        props: {
            cities: {
                type: Array,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            sewages() {
                let sewages = [];
                for (let city of this.cities) {
                    let s = this.$store.state.sewageTreatmentPlants.all.filter(s => {
                        return s.city_code === city.identifier;
                    });
                    sewages = sewages.concat(s);
                }
                return sewages;
            },
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-totals sewage-totals sewage-city">
        <div class="sewage-city__content">

            <sewage-totals-sewage
                :sewages="sewages"
                :settings="settings"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-totals {

        .sewage-city__content {
            height: 100%;

            .sewage-totals-sewage {
                height: 100%;
            }
        }
    }
</style>