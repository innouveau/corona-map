let regions, populationDict, settings, sources, currentSource;

regions = [];

//sources = ['scandinavia', 'china', 'poland', 'france', 'germany', 'spain', 'world', 'usa', 'peru', 'colombia',
//    'brazil', 'canada', 'australia', 'india', 'mexico', 'argentina', 'chile', 'russia', 'venezuela'];
sources = ['southamerica', 'peru', 'colombia', 'brazil', 'argentina', 'chile', 'venezuela'];
currentSource = sources[0];


settings = {
    getInfoFromPopulationFile: true,
    printArrayBrackets: true,
    scaleDownPaths: true,
    removeSmallIslands: true,
    maxIslands: 16,
    addPathsIfExists: true,
    threshold: 0.04 // smaller is more detail
    //threshold: 0.005 // 0.005 for south america
};


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

const removeSmallIslands = function(paths) {
    let numberOfPaths, maxPaths;
    maxPaths = settings.maxIslands;
    numberOfPaths = paths.length;
    if (numberOfPaths > maxPaths) {
        return paths
            .sort((a,b) => (a.length > b.length) ? -1 : ((b.length > a.length) ? 1 : 0)).slice(0,maxPaths);
    } else {
        return paths;
    }
};

const loadRegions = function() {
    $.getJSON(geoSettings[currentSource].geo, function( data ) {

        // if (currentSource === 'venezuela') {
        //     console.log(data);
        // }

        if (geoSettings[currentSource].ready) {
            for (let item of data) {
                let filteredPaths;
                delete item.id;

                if (settings.removeSmallIslands) {
                    filteredPaths =removeSmallIslands(item.paths);
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

        } else {
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

                    if (settings.getInfoFromPopulationFile) {

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

        next();
    });
};

const scaleDownPath = function(path) {
    let filtered, pathLength, lastPointAdded;
    filtered = [];
    lastPointAdded = null;
    pathLength = path.length;
    if (pathLength > 50) {
        for (let i = 0, l = path.length; i < l; i++) {
            let point, distance;
            point = path[i];
            // exclude first and last point
            if (lastPointAdded && i < (l - 1)) {
                distance = Math.pow((point[0] - lastPointAdded[0]), 2) + Math.pow((point[1] - lastPointAdded[1]), 2);
                if (distance > settings.threshold) {
                    filtered.push(point);
                    lastPointAdded = point;
                }
            } else {
                filtered.push(point);
                lastPointAdded = point;
            }
        }
        return filtered;
    } else {
        return path;
    }
};

const scaleDownPathRough = function(path, scaleDown) {
    let filtered, l;
    l = path.length;
    if (l > 50) {
        scaleDown = Math.round(Math.pow(l, 0.99) / 800);
        if (scaleDown > 0) {
            filtered = [];
            for (let i = 0, l = path.length; i < l; i++) {
                let c = path[i];
                if (i === 0 || i === (l - 1) || i % scaleDown === 0) {
                    filtered.push(c);
                }
            }
            console.log(l + ' with scaledown ' + scaleDown + '. To ' + filtered.length);
            return filtered;
        } else {
            return path;
        }
    } else {
        return path;
    }
};


function init() {
    if (settings.getInfoFromPopulationFile) {

        populationDict = {};
        d3.csv('data/regions.csv')
            .then((data) => {
                for (let item of data) {
                    populationDict[item.region] = item;
                }
                loadRegions();
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        loadRegions();
    }
}

init();
