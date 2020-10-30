import Measurement from "./Measurement";
import store from '@/store/store';

class SewageTreatmentPlant {
    constructor({
        sewageTreatementPlant_id = null,
        name = '',
        city_code = '',
        district_code = '',
        securityRegion_code = '',
        securityRegion_name = '',
        capacity = 0,
        measurements = []
    }) {
        this.sewageTreatementPlant_id = sewageTreatementPlant_id;
        this.name = name;
        this.city_code = city_code;
        this.district_code = district_code;
        this.securityRegion_code = securityRegion_code;
        this.securityRegion_name = securityRegion_name;
        this.capacity = capacity;
        this.measurements = measurements.map(m => new Measurement(m, this));
    }

    getMeasurementByOffset(offset) {
        return this.measurements.find(m => m.dateOffset === offset);
    }

    get calculatedMeasurements() {
        let length, measurements, lastMeasurement, unreliable;
        lastMeasurement = null;
        measurements = [];
        length = store.state.settings.historyLength;
        for (let i = length; i > -1; i--) {
            let measurement, value;
            measurement = this.getMeasurementByOffset(i);
            if (measurement) {
                value = measurement.value;
                unreliable = measurement.unreliable;
            } else {
                if (!lastMeasurement) {
                    // before first measurement
                    value = null;
                    unreliable = null;
                } else {
                    let range, step, nextMeasurement, share, difference;
                    nextMeasurement = lastMeasurement.next;
                    if (nextMeasurement) {
                        range = lastMeasurement.dateOffset - nextMeasurement.dateOffset;
                        step = i - nextMeasurement.dateOffset;
                        share = step / range;
                        difference = lastMeasurement.value - nextMeasurement.value;
                        value = nextMeasurement.value + share * difference;
                        unreliable = nextMeasurement.unreliable || lastMeasurement.unreliable;
                    } else {
                        // after last measuremtent
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
            });
            if (measurement) {
                lastMeasurement = measurement;
            }
        }
        return measurements;
    }
}

export default SewageTreatmentPlant;