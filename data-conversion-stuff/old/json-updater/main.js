let url, settings, cities, remove;

url = './../../public/data/maps/europa/europa.json';
cities = [];
remove = ['HU', 'PL'];

const keepItem = function(item) {
    if (item.nutsCode) {
        for (let chunk of remove) {
            if (item.nutsCode.indexOf(chunk) > -1) {
                return false;
            }
        }
        return true;
    } else {
        return true;
    }
};

const loadFile = function() {
    $.getJSON(url, function( data ) {
        for (let item of data) {
            if (keepItem(item)) {
                cities.push(item);
            }
        }
        console.log(JSON.stringify(cities));
    });
};

loadFile();
