let url, settings, cities;

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
                cities.push(item);
            }
        }
        console.log(cities);
        console.log(JSON.stringify(cities));
    });
};



loadFile();
