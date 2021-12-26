let regions, RD, getInfoFromPopulationFile, populationDict, id, printArrayBrackets, filter, countries, titleKey, addExtra, extraPathsDict, regionsWithExtraPaths;

regions = [];
regionsWithExtraPaths = [];
getInfoFromPopulationFile = true;
id = 1;
// rijksdriehoek
RD = false;
printArrayBrackets = true;
filter = false;
addExtra = true;
titleKey = 'NAME_LATN';
// North-West Europe
countries = ['NL', 'BE', 'DE', 'FR', 'LU', 'CH', 'AT', 'AD', 'LI', 'CZ'];
specificRegions = ['ES51', 'ES24', 'ES22', 'ES21', 'ITC1', 'ITC4', 'ITH3', 'ITH2', 'ITH1', 'ITC2', 'ITH5', 'ITI1', 'ITI3', 'ITI2', 'ITG2', 'ITI4', 'ITF1', 'ITF2', 'ITF3', 'ITF4', 'ITF5'];
//keys = ['BE'];

if (getInfoFromPopulationFile) {
    populationDict = {};
    extraPathsDict = {};
    d3.csv('population.csv')
        .then((data) => {
            for (let item of data) {
                populationDict[item.ISO3166_NUTS] = item;
                if (item.extraRegion.length > 0) {
                    extraPathsDict[item.extraRegion] = item;
                }
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

            if (item.id.indexOf('ES') > -1) {
                console.log(item.id + ' ' + item.properties.NAME_LATN);
            }


            if (!filter || countries.indexOf(item.properties.CNTR_CODE) > -1 || specificRegions.indexOf(item.id) > -1) {
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
                        region.extraRegion = dictRegion.extraRegion;
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

                // check if this item is an extra region
                // if so we later add its paths to the region it belongs to
                if (extraPathsDict[item.id]) {
                    region.parent = extraPathsDict[item.id].ISO3166_NUTS;
                    regionsWithExtraPaths.push(region);
                }

                if (!doesExist(region) && found) {
                    region.id = id++;
                    regions.push(region);
                }
            }
        }
        if (addExtra) {
            for (let region of extraRegions) {
                region.id = id++;
                regions.push(region);
            }
        }

        for (let region of regionsWithExtraPaths) {
            let parent = regions.find(r => r.nutsCode === region.parent);
            if (parent) {
                for (let path of region.paths) {
                    parent.paths.push(path);
                }
            } else {
                console.error('parent not found');
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