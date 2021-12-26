let url, sewerageDict, sewerageAreas, dateReversed;

dateReversed = true;

url = 'https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.json';


$.getJSON(url, function(measurements) {
    let text = '';
    for (let measurement of measurements) {
        let year, month, day, value, postal, city, date;

        month = Number(measurement.Date_measurement.split('-')[1]);


        if (dateReversed) {
            year = Number(measurement.Date_measurement.split('-')[2]);
            day = Number(measurement.Date_measurement.split('-')[0]);
            date = year + '-' + (month < 10) ? '0' + month : month + '-' + (day < 10) ? '0' + day : day;
        } else {
            year = Number(measurement.Date_measurement.split('-')[0]);
            day = Number(measurement.Date_measurement.split('-')[2]);
            date = measurement.Date_measurement;
        }
        console.log(date);

        if (month < 5 && day < 15) {
            value = measurement.RNA_per_ml;
            if (value > 2000) {
                postal = measurement.Postal_code.substring(0, 4);
                city = window.postcodes[postal].city;
                text += (city + '\t' + date + '\t' + value + '\n');
            }
        }
    }
    console.log(text);
});


