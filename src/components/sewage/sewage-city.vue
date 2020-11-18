<script>
    import City from "@/classes/region/City";
    import sewageCityPositiveTests from "./sewage-city-positive-tests";
    import sewageCitySewage from "./sewage/sewage-city-sewage";

    export default {
        name: 'sewage-city',
        components: {
            sewageCitySewage,
            sewageCityPositiveTests
        },
        props: {
            city: {
                type: City,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            sewages() {
                return this.$store.state.sewageTreatmentPlants.all.filter(s => {
                    return s.city_code === this.city.identifier;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-city">
        <div class="sewage-city__title">
            {{city.title}}
        </div>
        <div
            v-if="!settings.showOnlyTotals"
            class="sewage-city__content">
            <sewage-city-positive-tests
                    :city="city"
                    :settings="settings"/>

            <div>
                <sewage-city-sewage
                    v-for="sewage in sewages"
                    :sewage="sewage"
                    :city="city"
                    :settings="settings"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city {
        margin-bottom: 16px;
        padding: 8px;
        background: #fff;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
        position: relative;

        .sewage-city__title {
            font-weight: 700;
            margin-bottom: 8px;
        }

        &:last-child {
            border-bottom: 0;
        }
    }
</style>