<script>
    import sewageCityMeasurement from "./../sewage/sewage-city-measurement";
    import sewageGraphDates from "../sewage-graph-dates";

    export default {
        name: 'sewage-totals-sewage',
        components: {
            sewageGraphDates,
            sewageCityMeasurement
        },
        props: {
            sewages: {
                type: Array,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            measurements() {
                let desiredIntegrity, administration;
                desiredIntegrity = 0.4;
                administration = this.getAdministration();

                const updateAdministration = function(measurement, sewage) {
                    let frame, absoluteValue;
                    if (measurement.value) {
                        frame = administration.find(f => f.offset === measurement.offset);
                        if (frame) {
                            absoluteValue = measurement.value / (100000 / sewage.population);
                            frame.totalPopulation += sewage.population;
                            frame.totalMeasurements++;
                            frame.totalAbsoluteValue += absoluteValue
                        }
                    }
                };

                for (let sewage of this.sewages) {
                    let filteredMeasurements, measurementIndex;
                    measurementIndex = 0;
                    filteredMeasurements = sewage.calculatedMeasurementsFlowPer100000.filter(measurement => {
                        return measurement.offset <= this.settings.start && measurement.offset >= this.settings.end;
                    });

                    for (let measurement of filteredMeasurements) {
                        updateAdministration(measurement, sewage);
                    }
                }

                return administration.map(frame => {
                    let integrity = frame.totalMeasurements / this.sewages.length;
                    return {
                        value: frame.totalAbsoluteValue * (100000 / frame.totalPopulation),
                        unreliable: integrity < desiredIntegrity,
                        offset: frame.offset
                    }
                });
            },
            length() {
                return 1 + this.settings.start - this.settings.end
            }
        },
        methods: {
            getAdministration() {
                let administration = [];
                for (let i = 0; i < this.length; i++) {
                    administration.push({
                        totalPopulation: 0,
                        totalMeasurements: 0,
                        totalAbsoluteValue: 0,
                        offset: this.settings.start - i
                    })
                }
                return administration;
            }
        }
    }
</script>


<template>
    <div class="sewage-totals-sewage sewage-city-sewage">
        <div class="sewage-city-sewage__graph">

            <sewage-city-measurement
                v-for="measurement in measurements"
                :measurement="measurement"
                :settings="settings"
                :size="3"/>
        </div>
        <sewage-graph-dates
            :measurements="measurements"
            :settings="settings"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city-sewage__graph {
        height: 100%;
    }

</style>