import Measurement from "./Measurement";
import store from "@/store/store";

class SewageTreatmentPlant {
    constructor({
        sewageTreatementPlant_id = null,
        name = "",
        city_code = "",
        district_code = "",
        securityRegion_code = "",
        securityRegion_name = "",
        capacity = 0,
        measurements = [],
    }) {
        this.sewageTreatementPlant_id = sewageTreatementPlant_id;
        this.name = name;
        this.city_code = city_code;
        this.district_code = district_code;
        this.securityRegion_code = securityRegion_code;
        this.securityRegion_name = securityRegion_name;
        this.capacity = capacity;
        this.measurements = measurements.map((m) => new Measurement(m, this));
    }

    get city() {
        return store.state.cities.all.find(
            (c) => c.identifier === this.city_code
        );
    }

    get population() {
        let totalCapacity, share, siblings;
        totalCapacity = 0;
        siblings = this.siblings;
        if (siblings.length === 1) {
            return this.city.population;
        } else {
            for (let sibling of this.siblings) {
                totalCapacity += sibling.capacity;
            }
            if (this.capacity === 0) {
                share = 1 / siblings.length;
            } else {
                share = this.capacity / totalCapacity;
            }
            return Math.round(this.city.population * share);
        }
    }

    get siblings() {
        return store.state.sewageTreatmentPlants.all.filter((s) => {
            return s.city_code === this.city_code;
        });
    }

    getMeasurementByOffset(offset) {
        return this.measurements.find((m) => m.dateOffset === offset);
    }

    get calculatedMeasurementsCalculatedPerCapacity() {
        return this.getCalculatedMeasurements(true);
    }

    get calculatedMeasurementsFlowPer100000() {
        return this.getCalculatedMeasurements(false);
    }

    getCalculatedMeasurements(calculatedPerCapacity) {
        let length, measurements, lastMeasurement, unreliable;
        lastMeasurement = null;
        measurements = [];
        length = store.state.settings.historyLength;
        for (let i = length; i > -1; i--) {
            let measurement, value;
            measurement = this.getMeasurementByOffset(i);
            if (measurement) {
                if (calculatedPerCapacity) {
                    value = measurement.valueCalculatedPerCapacity;
                } else {
                    value = measurement.valueFlowPer100000;
                }

                unreliable = measurement.unreliable;
            } else {
                if (!lastMeasurement) {
                    // before first measurement
                    value = null;
                    unreliable = null;
                } else {
                    let range,
                        step,
                        nextMeasurement,
                        share,
                        difference,
                        nextValue,
                        lastMeasurementValue;
                    nextMeasurement = lastMeasurement.next;
                    if (nextMeasurement) {
                        if (calculatedPerCapacity) {
                            nextValue =
                                nextMeasurement.valueCalculatedPerCapacity;
                            lastMeasurementValue =
                                lastMeasurement.valueCalculatedPerCapacity;
                        } else {
                            nextValue = nextMeasurement.valueFlowPer100000;
                            lastMeasurementValue =
                                lastMeasurement.valueFlowPer100000;
                        }

                        range =
                            lastMeasurement.dateOffset -
                            nextMeasurement.dateOffset;
                        step = i - nextMeasurement.dateOffset;
                        share = step / range;
                        difference = lastMeasurementValue - nextValue;
                        value = nextValue + share * difference;
                        unreliable =
                            nextMeasurement.unreliable ||
                            lastMeasurement.unreliable;
                    } else {
                        // after last measurement
                        value = null;
                        unreliable = null;
                    }
                }
            }

            measurements.push({
                offset: i,
                value,
                interpreted: !measurement,
                unreliable: unreliable,
                source: measurement,
            });
            if (measurement) {
                lastMeasurement = measurement;
            }
        }
        return measurements;
    }
}

export default SewageTreatmentPlant;
