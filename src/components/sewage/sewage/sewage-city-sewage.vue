<script>
    import City from "@/classes/region/City";
    import SewageTreatmentPlant from "@/classes/SewageTreatmentPlant";
    import sewageCityMeasurement from "./sewage-city-measurement";
    import sewageGraphDates from "../sewage-graph-dates";

    export default {
        name: 'sewage-city-sewage',
        components: {
            sewageGraphDates,
            sewageCityMeasurement
        },
        props: {
            sewage: {
                type: SewageTreatmentPlant,
                required: true
            },
            city: {
                type: City,
                required: true
            },
            settings: {
                type: Object,
                required: true
            },
            correctedByCapacity: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            width() {
                return (this.settings.start - this.settings.end + 1) * (this.settings.width + this.settings.margin);
            },
            measurements() {
                if (this.correctedByCapacity) {
                    return this.sewage.calculatedMeasurementsCalculatedPerCapacity.filter(measurement => {
                        return measurement.offset <= this.settings.start && measurement.offset >= this.settings.end;
                    })
                } else {
                    return this.sewage.calculatedMeasurementsFlowPer100000.filter(measurement => {
                        return measurement.offset <= this.settings.start && measurement.offset >= this.settings.end;
                    })
                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-city-sewage">
        <div class="sewage-city-sewage__title">
            RWZI: {{sewage.name}}
        </div>
        <div
            :class="{'sewage-city-sewage__graph--old-style':correctedByCapacity}"
            class="sewage-city-sewage__graph">

            <sewage-city-measurement
                v-for="measurement in measurements"
                :measurement="measurement"
                :settings="settings"/>
        </div>
        <sewage-graph-dates
            :measurements="measurements"
            :settings="settings"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city-sewage {
        margin-bottom: 2px;
        margin-top: 4px;

        .sewage-city-sewage__title {
            padding-bottom: 8px;

        }

        .sewage-city-sewage__graph {
            border-bottom: 1px solid #888;
            padding-bottom: 2px;
            display: flex;
            align-items: flex-end;

            &.sewage-city-sewage__graph--old-style {
                background: pink;
            }
        }
    }
</style>