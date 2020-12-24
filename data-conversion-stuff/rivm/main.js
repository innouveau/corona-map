let url, urlPopulation, cities;
url = 'rivm_municipality_perday_2020-12-24.csv';
urlPopulation = 'population.csv';

cities = [];

function createCities(rows) {
    let ignore = ['Netherlands', 'Unknown'];
    for (let row of rows) {
        let city = {
            code: row.Municipality_code,
            name: row.Municipality_name,
            population: Number(row.population),
            dates: []
        };
        if (ignore.indexOf(city.name) === -1) {
            cities.push(city);
        }
    }
}

function getCity(cityName) {
    for (let city of cities) {
        if (city.name === cityName) {
            return city;
        }
    }
    return null;
}

function findDate(city, dateString) {
    for (let date of city.dates) {
        if (date.date === dateString) {
            return date;
        }
    }
    return null;
}

function addRow(row) {
    let cityName, city, date, dateString;
    cityName = row.Municipality_name;
    dateString = row.Date_of_publication;

    //if (cityName === 'Amsterdam') {
    city = getCity(cityName);
    if (city) {
        date = findDate(city, dateString);
        if (!date) {
            city.dates.push({
                date: dateString,
                cases: Number(row.Total_reported)
            })
        } else {
            // doubles
        }
    }

    //}


}

function exportFile() {
    let csv, dates;
    csv = 'name,code,population,';
    dates = cities[0].dates.map(d => d.date);
    csv += dates.join(',') + '\n';
    for (let city of cities) {
        let n;
        csv += city.name + ',' + city.code + ',' + city.population + ',';
        n = city.dates.map(d => d.cases);
        csv += n.join(',') + '\n';
    }
    console.log(csv);
    //console.log(cities.find(c => c.name === 'Amsterdam'));

}

d3.csv(urlPopulation)
    .then((data1) => {
        createCities(data1);
        d3.csv(url)
            .then((data) => {
                console.log(data);
                for (let row of data) {
                    addRow(row);
                }
                exportFile();
            })
            .catch((error) => {
                console.error(error);
            });
    })
    .catch((error) => {
        console.error(error);
    });