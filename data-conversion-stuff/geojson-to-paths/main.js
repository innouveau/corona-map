let regions, RD, addPopulation, populationDict, id;

regions = [];
addPopulation = true;
id = 29;
// rijksdriehoek
RD = false;

if (addPopulation) {
    populationDict = {};
    d3.csv('population.csv')
        .then((data) => {
            for (let item of data) {
                populationDict[item.region] = Number(item.population)
            }
            //console.log(populationDict);
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
        console.log(data);
        for (let item of data.features) {
            let region, paths;
            region = {};
            region.id = id++;
            region.title = item.properties.NAME_LATN;
            region.identifier = item.properties.NAME_LATN;
            if (addPopulation) {
                region.population = getPopulation(region.title);
            }

            if (item.geometry.type === 'MultiPolygon') {
                paths = [];
                for (let set of item.geometry.coordinates) {
                    for (let path of set) {
                        paths.push(path);
                    }
                }
                // item.geometry.coordinates.map(arr => {
                //     return arr[0];
                // });
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
            if (!doesExist(region) && item.properties.CNTR_CODE === 'ES') {
                regions.push(region);
            }
        }
        console.log(regions);
        console.log(JSON.stringify(regions));
    });
};


const getPopulation = function(title) {
    return populationDict[title];
};

const doesExist = function (r) {
    for (let region of regions) {
        if (region.title === r.title) {
            return true;
        }
    }
    return false;
};