let url, sewerageDict, sewerageAreas, dateReversed;
dateReversed = false;
url = 'https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.json';
sewerageAreas = [];
sewerageDict = {};

const getDistrictCode = function(measurement) {
    if (measurement.RWZI_AWZI_name === 'Amsterdam-West') {
        return 'West';
    } else {
        return '';
    }
};

const getCityByPostalCode = function(postalCode) {
    let letters = postalCode.substring(0, 4);
    if (window.postcodes[letters]) {
        // GM is the convention already used in municipality-today.csv
        let code = window.postcodes[letters].city_code;
        if (code < 10) {
            return 'GM000' + code;
        } else if (code < 100) {
            return 'GM00' + code;
        } else if (code < 1000) {
            return 'GM0' + code;
        } else  {
            return 'GM' + code;
        }
    } else {
        return null;
    }
};

const getCapacity = function(measurementent) {
    let title = measurementent.RWZI_AWZI_name.toLowerCase();
    // console.log(measurementent.RWZI_AWZI_code);
    for (let rwzi of window.rwzis) {
        //console.log(rwzi.code);
        if (rwzi.title.toLowerCase().indexOf(title) > -1) {
            return rwzi.capacity;
        }
    }
    console.log('not found ', measurementent.RWZI_AWZI_name);
    return 0;
};

$.getJSON(url, function(measurements) {
    //measurements = measurements.slice(0,20);
    for (let measurementent of measurements) {
        let sewerageArea_code, postalCode, city_code, district_code, capacity, date;
        postalCode = measurementent.Postal_code;
        sewerageArea_code = measurementent.RWZI_AWZI_code;

        if (!sewerageDict[sewerageArea_code]) {
            city_code = getCityByPostalCode(postalCode);
            district_code = getDistrictCode(measurementent);
            capacity = getCapacity(measurementent);
            sewerageDict[sewerageArea_code] = {
                sewerageArea_code,
                city_code,
                district_code,
                capacity,
                name: measurementent.RWZI_AWZI_name,
                security_region_code: measurementent.Security_region_code,
                security_region_name: measurementent.Security_region_name,
                measurements: []
            }
        }
        date = formatDate(measurementent.Date_measurement);
        sewerageDict[sewerageArea_code].measurements.push({
            date,
            RNA_per_ml: measurementent.RNA_per_ml,
            RNA_flow_per_100000: measurementent['RNA_flow_per_100.000'],
            representative_measurement: measurementent.Representative_measurement
        });
    }
    // dict to array
    for (let key in sewerageDict) {
        let sewerage = sewerageDict[key];
        sewerageAreas.push(sewerage);
    }
    //console.log(sewerageAreas);
    console.log(JSON.stringify(sewerageAreas));
});

const formatDate = function(string) {
    if (dateReversed) {
        let day, month, year;
        month = Number(string.split('-')[1]);
        year = Number(string.split('-')[2]);
        day = Number(string.split('-')[0]);
        return year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);
    } else {
        return string;
    }
};


