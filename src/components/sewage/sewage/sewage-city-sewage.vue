<script>
    import City from "@/classes/City";
    import SewageTreatmentPlant from "@/classes/SewageTreatmentPlant";
    import sewageCityMeasurement from "./sewage-city-measurement";

    export default {
        name: 'sewage-city-sewage',
        components: {
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
        <div
            :class="{'sewage-city-sewage__graph--old-style':correctedByCapacity}"
            class="sewage-city-sewage__graph">
            <div class="sewage-city-sewage__title">
                {{sewage.name}} ({{sewage.capacity}})
            </div>

            <sewage-city-measurement
                v-for="measurement in measurements"
                :measurement="measurement"
                :settings="settings"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city-sewage {
        display: flex;
        margin-bottom: 2px;

        .sewage-city-sewage__graph {
            position: relative;
            border-bottom: 1px solid #000;
            background: #ddd;
            display: flex;
            align-items: flex-end;
            padding-top: 8px;

            .sewage-city-sewage__title {
                position: absolute;
                left: 4px;
                top: 4px;
            }

            &.sewage-city-sewage__graph--old-style {
                background: pink;
            }
        }
    }
</style>