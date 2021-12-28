const regions = [];

const sources = sourcesSouthEastAsia;

const settings = {
    printArrayBrackets: true,
    scaleDownPaths: true,
    removeSmallIslands: true,
    maxIslands: 16,
    addPathsIfExists: true,
    threshold: 0.04 // smaller is more detail
    //threshold: 0.005 // 0.005 for south america
};
let currentSource = sources[0];
let populationDict = null;

const next = function() {
    let index;
    index = sources.indexOf(currentSource);
    if (index === sources.length - 1) {
        finish();
    } else {
        currentSource = sources[index + 1];
        loadRegions();
    }
};

const finish = function() {
    console.log(regions);
    let string = JSON.stringify(regions);
    if (!settings.printArrayBrackets) {
        string = string.substring(1, string.length-1);
    }
    console.log(string);
};

const shouldExclude = function (title) {
    return geoSettings[currentSource].exclude.indexOf(title.toLowerCase()) > -1 ||
        geoSettings[currentSource].exclude.indexOf(title) > -1
};


const loadSource = async(source) => {
    return new Promise((resolve, reject) => {
        $.getJSON(source, (data) => {
            resolve(data);
        })
    })
}

const handleRegionReady = (data) => {
    for (let item of data) {
        let filteredPaths;
        delete item.id;

        if (settings.removeSmallIslands) {
            filteredPaths = removeSmallIslands(item.paths);
        } else {
            filteredPaths = item.paths;
        }



        item.paths = filteredPaths.map(path => {
            let pathToArray, thePath;
            pathToArray = path.map(coordinate => [coordinate.x, coordinate.y]);

            if (settings.scaleDownPaths) {
                thePath = scaleDownPath(pathToArray);
            } else {
                thePath = pathToArray;
            }

            return thePath.map(coordinate => {
                return {
                    x: coordinate[0],
                    y: coordinate[1]
                }
            })
        });

        regions.push(item);
    }
}

const handleRegionNotReady = (data) => {
    for (let item of data.features) {
        let region, paths, found, titleKey, title, filteredPaths;
        found = true;
        region = {};


        // add properties
        titleKey = geoSettings[currentSource].titleKey;
        region.title = item.properties[titleKey];
        region.identifier = item.properties[titleKey];
        title = item.properties[titleKey];



        if (!shouldExclude(title)) {

            let dictRegion = geoSettings[currentSource].getRegion(item, title);
            if (!dictRegion) {
                // regions we want to add to the map
                // but are not present in regions.csv
                // therefor dont have data and will appear
                // grey on the map
                if (geoSettings[currentSource].include.indexOf(title) > -1) {
                    found = true;
                } else {
                    console.error('NOT FOUND ' + item.properties[titleKey] + ' ' + currentSource);
                    found = false;
                }
            } else {
                region.population = Number(dictRegion.population.replace(/,/g, ''));
                region.title = dictRegion.region;
                region.identifier = dictRegion.region;
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

            if (settings.removeSmallIslands) {
                filteredPaths =removeSmallIslands(paths);
            } else {
                filteredPaths = paths;
            }

            region.paths = filteredPaths.map(path => {
                let thePath;
                if (settings.scaleDownPaths) {
                    thePath = scaleDownPath(path);
                } else {
                    thePath = path;
                }

                return thePath.map(coordinate => {
                    return {
                        x: coordinate[0],
                        y: coordinate[1]
                    }
                })
            });
            if (found) {
                if (geoSettings[currentSource].addCountryCode) {
                    region.country_id = geoSettings[currentSource].addCountryCode;
                }
                if (settings.addPathsIfExists) {
                    let exists = regions.find(r => r.title === region.title);
                    if (exists) {
                        for (let path of region.paths) {
                            exists.paths.push(path);
                        }
                    } else {
                        regions.push(region);
                    }
                } else {
                    if (region.title === 'Nizhny Novgorod Oblast') {
                        console.log(item);
                        console.log(region);
                    }
                    regions.push(region);
                }
            }
        }
    }
}


const loadRegions = async() => {
    const source = geoSettings[currentSource].geo;
    const data = await loadSource(source);
    if (geoSettings[currentSource].ready) {
        handleRegionReady(data);
    } else {
        handleRegionNotReady(data);
    }
    next();
};





const getPopulationDict = async() => {
    return new Promise((resolve, reject) => {
        const populationDict = {};
        d3.csv('data/regions.csv')
            .then((data) => {
                for (let item of data) {
                    populationDict[item.region] = item;
                }
                resolve(populationDict);

            })
            .catch((error) => {
                reject(error);
            });
    })
}


const init = async() => {
    populationDict = await getPopulationDict();
    loadRegions(populationDict);

}

init();
