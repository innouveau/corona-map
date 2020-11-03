<script>
    import sewageCityMeasurement from "./../sewage/sewage-city-measurement";

    export default {
        name: 'sewage-totals-sewage',
        components: {
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
                let measurements, sewageIndex, nOfMeasurementsPerDay, maxMeasurementsPerDay, acceptedShare;
                measurements = [];
                sewageIndex = 0;
                nOfMeasurementsPerDay = [];
                acceptedShare = 0.4;


                for (let sewage of this.sewages) {
                    let filteredMeasurements, measurementIndex;
                    measurementIndex = 0;
                    filteredMeasurements = sewage.calculatedMeasurementsFlowPer100000.filter(measurement => {
                        return measurement.offset <= this.settings.start && measurement.offset >= this.settings.end;
                    });

                    for (let measurement of filteredMeasurements) {
                        if (sewageIndex === 0) {
                            nOfMeasurementsPerDay.push(0);
                            if (measurement.unreliable) {
                                measurements.push({
                                    value: 0
                                });
                            } else {
                                measurements.push({
                                    value: measurement.value
                                });
                            }
                        } else {
                            if (!measurement.unreliable) {
                                measurements[measurementIndex].value += measurement.value;
                            }
                        }

                        if (measurement.value !== null && !measurement.unreliable) {
                            nOfMeasurementsPerDay[measurementIndex]++;
                        }
                        measurementIndex++;
                    }
                    sewageIndex++;
                }
                maxMeasurementsPerDay = Math.max.apply(null, nOfMeasurementsPerDay);

                for (let measurement of measurements) {
                    let index, measurementsThatDay;
                    index = measurements.indexOf(measurement);
                    measurementsThatDay = nOfMeasurementsPerDay[index];
                    measurement.value /= measurementsThatDay;
                    measurement.unreliable = (measurementsThatDay / maxMeasurementsPerDay < acceptedShare);
                    // scale for totals
                    measurement.value *= 5;
                }
                return measurements;
            },
            // old style
            // measurements() {
            //     let measurements, sewageIndex, totalCapacity, maxCapacity, acceptedCapacity;
            //     measurements = [];
            //     sewageIndex = 0;
            //     totalCapacity = [];
            //     acceptedCapacity = 0.4;
            //
            //
            //     for (let sewage of this.sewages) {
            //         let filteredMeasurements, measurementIndex;
            //         measurementIndex = 0;
            //         filteredMeasurements = sewage.calculatedMeasurementsFlowPer100000.filter(measurement => {
            //             return measurement.offset <= this.settings.start && measurement.offset >= this.settings.end;
            //         });
            //
            //         for (let measurement of filteredMeasurements) {
            //             if (sewageIndex === 0) {
            //                 if (measurement.unreliable) {
            //                     measurements.push({
            //                         value: 0
            //                     });
            //                 } else {
            //                     measurements.push({
            //                         value: measurement.value * sewage.capacity
            //                     });
            //                 }
            //
            //                 // initialis total capacity
            //                 totalCapacity.push(0);
            //             } else {
            //                 if (!measurement.unreliable) {
            //                     measurements[measurementIndex].value += measurement.value * sewage.capacity;
            //                 }
            //             }
            //
            //             if (measurement.value !== null && !measurement.unreliable) {
            //                 totalCapacity[measurementIndex] += sewage.capacity;
            //             }
            //             measurementIndex++;
            //         }
            //         sewageIndex++;
            //     }
            //     maxCapacity = Math.max.apply(null, totalCapacity);
            //
            //     for (let measurement of measurements) {
            //         let index, capacityForDay;
            //         index = measurements.indexOf(measurement);
            //         capacityForDay = totalCapacity[index];
            //         measurement.value /= capacityForDay;
            //         measurement.unreliable = (capacityForDay / maxCapacity < acceptedCapacity);
            //         // scale for totals
            //         measurement.value *= 2.5;
            //     }
            //
            //     return measurements;
            // }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-totals-sewage sewage-city-sewage">
        <div class="sewage-city-sewage__graph">

            <sewage-city-measurement
                v-for="measurement in measurements"
                :measurement="measurement"
                :settings="settings"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city-sewage__graph {
        height: 100%;
    }

</style>