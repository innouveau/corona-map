let regions, id, printArrayBrackets, keys, titleKey;

regions = [];
getInfoFromPopulationFile = true;
id = 1;
printArrayBrackets = true;
titleKey = 'name';

const fb = ['Botlek', 'Rozenburg', 'Vondelingenplaat', 'Waalhaven', 'Spaanse Polder', 'Bedrijventerrein Schieveen', 'Bedrijvenpark Noord-West', 'Rivium', 'Nieuw Mathenesse'];


const loadRegions = function() {
    $.getJSON( "regions.json", function( data ) {
        for (let item of data.features) {
            let region, paths;
            console.log(item);
            region = {};

            // add properties
            region.title = item.properties[titleKey];
            region.identifier = item.properties[titleKey];

            // transform paths
            if (item.geometry.type === 'MultiPolygon') {
                paths = [];
                for (let set of item.geometry.coordinates) {
                    for (let path of set) {
                        paths.push(path);
                    }
                }
            } else {
                paths = item.geometry.coordinates;
            }

            if (region.extraRegion) {
                console.log(region.id);
            }

            region.paths = paths.map(path => {
                return path.map(coordinate => {
                    return {
                        x: coordinate[0],
                        y: coordinate[1]
                    }
                })
            });
            if (!doesExist(region) && fb.indexOf(region.title) === -1) {
                region.id = id++;
                regions.push(region);
            }


        }

        console.log(regions);
        let string = JSON.stringify(regions);
        if (!printArrayBrackets) {
            string = string.substring(1, string.length-1);
        }
        console.log(string);
    });
};



const doesExist = function (r) {
    for (let region of regions) {
        if (region.title === r.title) {
            return true;
        }
    }
    return false;
};

loadRegions();