let regions, RD, getInfoFromPopulationFile, populationDict, id, printArrayBrackets, filter, keys, titleKey;

regions = [];
getInfoFromPopulationFile = true;
id = 1;
// rijksdriehoek
RD = false;
printArrayBrackets = true;
filter = false;
titleKey = 'NAME_LATN';
keys = ['RU', 'BE', 'ES', 'IT', 'AT', 'PL', 'SK', 'UK', 'SE', 'NO', 'CH', 'FI', 'CZ', 'PT', 'FR', 'NL', 'DE', 'IS', 'IS', 'DK'];
//keys = ['BE'];

if (getInfoFromPopulationFile) {
    populationDict = {};
    d3.csv('population.csv')
        .then((data) => {
            for (let item of data) {
                populationDict[item.ISO3166_NUTS] = item
            }
            loadRegions();
        })
        .catch((error) => {
            console.error(error);
        });
} else {
    loadRegions();
}

const loadRegions = function() {
    $.getJSON( "regions.json", function( data ) {
        for (let item of data.features) {
            let region, paths, found;

            if (item.id.indexOf('RU') > -1) {
                console.log(item);
            }

            if (!filter || keys.indexOf(item.properties.CNTR_CODE) > -1) {
                found = true;
                region = {};

                // add properties
                region.title = item.properties[titleKey];
                region.identifier = item.properties[titleKey];
                if (getInfoFromPopulationFile) {
                    let dictRegion = getRegionByNuts(item.id);
                    if (!dictRegion) {
                        found = false;
                    } else {
                        region.population = Number(dictRegion.population);
                        region.nutsCode = item.id;
                        region.title = dictRegion.region;
                        region.identifier = dictRegion.region;
                    }
                }

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

                region.paths = paths.map(path => {
                    return path.map(coordinate => {
                        if (RD) {
                            return RdToGws(...coordinate);
                        } else {
                            return {
                                x: coordinate[0],
                                y: coordinate[1]
                            }
                        }
                    })
                });
                if (!doesExist(region) && found) {
                    region.id = id++;
                    regions.push(region);
                }
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


const getRegionByNuts = function(nutsCode) {
    return populationDict[nutsCode];
};

const doesExist = function (r) {
    for (let region of regions) {
        if (region.title === r.title) {
            return true;
        }
    }
    return false;
};