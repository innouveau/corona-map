let regions, id, printArrayBrackets, keys, titleKey, populationDict;

regions = [];
getInfoFromPopulationFile = true;
id = 1;
printArrayBrackets = true;
titleKey = 'TXT';

const getRegionByTitle = function(title) {
    for (let item of populationDict) {
        if (title.indexOf(item.region) > -1) {
            return item;
        }
    }
    return null;
};

const loadRegions = function() {
    $.getJSON( "regions.json", function( data ) {
        for (let item of data.features) {
            let region, paths, found;
            found = true;
            region = {};


            // add properties
            region.title = item.properties[titleKey];
            region.identifier = item.properties[titleKey];

            if (getInfoFromPopulationFile) {
                let dictRegion = getRegionByTitle(item.properties[titleKey]);
                if (!dictRegion) {
                    found = false;
                } else {
                    region.population = Number(dictRegion.population.replace(/,/g, ''));
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
                    return {
                        x: coordinate[0],
                        y: coordinate[1]
                    }
                })
            });
            if (found) {
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


if (getInfoFromPopulationFile) {
    populationDict = [];
    d3.csv('population.csv')
        .then((data) => {
            for (let item of data) {
                populationDict.push(item);
                //populationDict[item.region] = item;
            }
            console.log(populationDict);
            loadRegions();
        })
        .catch((error) => {
            console.error(error);
        });
} else {
    loadRegions();
}