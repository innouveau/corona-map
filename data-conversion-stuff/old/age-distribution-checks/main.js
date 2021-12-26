//let url = 'https://data.rivm.nl/covid-19/COVID-19_casus_landelijk.csv';
let url, settings, count, dateObj;
url = 'COVID-19_casus_landelijk.csv';
count = 0;
dateObj = {};
settings = {
    ggd: 'GGD Amsterdam',
    ageGroup: '60-69',
    dateMin: new Date('2020-07-31').getTime(),
    dateMax: new Date('2020-08-06').getTime(),
};


function isInDateRange(date) {
    let ms = new Date(date).getTime();
    return ms >= settings.dateMin && ms <= settings.dateMax;
}


d3.csv(url)
    .then((result) => {
        //result = result.slice(0,10);
        let key = 'Date_file;Date_statistics;Date_statistics_type;Agegroup;Sex;Province;Hospital_admission;Deceased;Week_of_death;Municipal_health_service';
        for (let item of result) {
            let values, set, ggd, ageGroup, date;
            // workaround for colon seperated setup
            for (let key in item) {
                values = item[key];
                set = values.split(';');
                ggd = set[9];
                ageGroup = set[3];
                date = set[1];

                if (ggd === settings.ggd && ageGroup === settings.ageGroup && isInDateRange(date)) {
                    if (!dateObj[date]) {
                        dateObj[date] = 0;
                    }
                    dateObj[date]++;
                    count++;
                }
            }
        }
        console.log(count);
        console.log(dateObj);
    })
    .catch((error) => {
        console.error(error);
    });