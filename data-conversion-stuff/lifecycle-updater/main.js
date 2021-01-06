let url, settings, cities;

// dit zijn de 8 gemeentes die (in hun huidige vorm) aflopen op 2020-12-31
// we lopen door de oude dataset, laten alle gemeentes door, maar voegen op
// deze 8 een lifecycle toe
// in geojson-to-paths adhv source: Netherlands pakken we de 5 gemeentes
// die nieuw zijn (Eemsdelta) of in een nieuwe vorm komen (Oisterwijk,
// Vught, Boxtel en Tilburg) uit de geojson. We voegen daar nog wat custom
// data aan toe, zoals een ggd_code, etc

url = './../../public/data/maps/nederland-bu/cities.json';
settings = {
    'Appingedam': {
        start: "2020-01-01",
        end: "2020-12-31"
    },
    "Delfzijl": {
        start: "2020-01-01",
        end: "2020-12-31"
    },
    "Loppersum": {
        start: "2020-01-01",
        end: "2020-12-31"
    },
    "Haaren": {
        start: "2020-01-01",
        end: "2020-12-31"
    },
    "Oisterwijk": {
        start: "2020-01-01",
        end: "2020-12-31"
    },
    "Vught": {
        start: "2020-01-01",
        end: "2020-12-31"
    },
    "Boxtel": {
        start: "2020-01-01",
        end: "2020-12-31"
    },
    "Tilburg": {
        start: "2020-01-01",
        end: "2020-12-31"
    }
};

cities = [];

const loadFile = function() {
    $.getJSON(url, function( data ) {
        for (let item of data) {
            if (settings[item.title]) {
                item.lifecycle = settings[item.title];
            }
            cities.push(item);
        }
        console.log(cities);
        console.log(JSON.stringify(cities));
    });
};



loadFile();
