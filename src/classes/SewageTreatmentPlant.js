import Measurement from "./Measurement";

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
}

export default SewageTreatmentPlant;