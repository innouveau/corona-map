let safetyRegion_id, numberOfSafetyRegions, rszi_regions;

date = '2020-08-19';
numberOfSafetyRegions = 25;
// zeeland
safetyRegion_id = 19;
rszi_regions = [];


const sewerageAreasDict = [
    {
        rwzi_awzi_code: 18006,
        title: 'Westerschouwen',
        safetyRegion_id: 19,
        city_codes: ['GM1676']
    }, {
        rwzi_awzi_code: 21001,
        title: 'Walcheren',
        safetyRegion_id: 19,
        city_codes: ['GM0654', 'GM0664', 'GM1695', 'GM0717', 'GM0687', 'GM0718']
    }, {
        rwzi_awzi_code: 23002,
        title: 'Terneuzen',
        safetyRegion_id: 19,
        city_codes: ['GM1714', 'GM0715', 'GM0677']
    }, {
        rwzi_awzi_code: 25021,
        title: 'Bath',
        safetyRegion_id: 19,
        city_codes: ['GM0703', 'GM0678']
    }
];


const init = function() {
    let promises = Array.from(Array(numberOfSafetyRegions), (_, i) => i + 1).map(id => {
        if (id < 10) {
            id = '0' + id;
        }
        return new Promise((resolve, reject) => {
            readJson(id).then(result => {
                resolve(result);
            })
        });
    });

    Promise.all(promises).then((result) => {
        for (let item of result) {
            rszi_regions = rszi_regions.concat(item);
        }
        console.log(rszi_regions);
        console.log(JSON.stringify(rszi_regions));
    });
};

const readJson = function(id) {
    return new Promise((resolve, reject) => {
        let url = 'https://raw.githubusercontent.com/boisei0/corona-dashboard-data/master/data/' + date + '_2/VR' + id + '.json';
        $.getJSON(url, function(result) {
            resolve(getSewerageAreas(result.results_per_sewer_installation_per_region.values));
        });
    });
};

const getSewerageAreas = function(sewerageAreas) {
    let set = [];
    for (let sewerageArea of sewerageAreas) {
        let item, measurements;
        item = {
            rwzi_awzi_code: Number(sewerageArea.rwzi_awzi_code),
            title: sewerageArea.values[0].rwzi_awzi_name,
            safetyRegion_id: Number(sewerageArea.values[0].vrcode.substr(2)),
            sewerageMeasurements: [],
            city_codes: []
        };
        item.city_codes = getCityCodes(item.rwzi_awzi_code);
        // apparently measurements are not ordered chronologically
        measurements = sewerageArea.values.sort((a,b) => (a.date_measurement_unix > b.date_measurement_unix) ? 1 : ((b.date_measurement_unix > a.date_measurement_unix) ? -1 : 0));

        for (let measurement of measurements) {
            let date, month, day, dateString, rnaLevel;
            date = new Date(measurement.date_measurement_unix * 1000);
            month = date.getMonth() + 1;
            day = date.getDate();
            dateString = date.getFullYear() + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);
            rnaLevel = measurement.rna_per_ml;
            item.sewerageMeasurements.push({
                date: dateString,
                dateMs: (measurement.date_measurement_unix * 1000),
                rnaLevel
            })
        }

        set.push(item);
        //
    }
    return set;
};

const getCityCodes = function(rwzi_awzi_code) {
    for (let sewerageArea of sewerageAreasDict) {
        if (sewerageArea.rwzi_awzi_code === rwzi_awzi_code) {
            return sewerageArea.city_codes;
        }
    }
    return [];
};

init();