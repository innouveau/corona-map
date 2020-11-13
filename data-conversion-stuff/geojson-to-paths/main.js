let regions,  populationDict, geoSettings, settings;

regions = [];


settings = {
    getInfoFromPopulationFile: true,
    printArrayBrackets: true,
    scaleDownPaths: false,
    removeSmallIslands: false,
    addPathsIfExists: true,
    currentMap: 'russia'
};

geoSettings = {
    mexico: {
        geo: 'data/mexico/geo.json',
        titleKey: 'state_name',
        getNutsKey: function(item) {
            return item.properties.STATE_NAME;
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    india: {
        geo: 'data/india/geo.json',
        titleKey: 'NAME_1',
        getNutsKey: function(item) {
            return item.properties.STATE_NAME;
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    australia: {
        geo: 'data/australia/geo.json',
        titleKey: 'STATE_NAME',
        getNutsKey: function(item) {
            return item.properties.STATE_NAME;
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    china: {
        geo: 'data/china/geo.json',
        titleKey: 'name_1',
        getNutsKey: function(item) {
            return item.properties.name;
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    canada: {
        geo: 'data/canada/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return item.properties.name;
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    brazil: {
        geo: 'data/brazil/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return 'BR_' + item.properties.sigla;
        },
        getRegion: function(item, nutsCode, title) {
            return populationDict[nutsCode];
        },
        addCountryCode: null
    },
    russia: {
        geo: 'data/russia/geo.json',
        titleKey: 'NAME_1',
        getNutsKey: function(item) {
            return 'BR_' + item.properties.sigla;
        },
        getRegion: function(item, nutsCode, title) {
            let translateTable, theTitle;
            translateTable = {
                "Khanty-Mansiy": "Khanty-Mansi Avtonomnyy Okrug",
                "Adygey": "Adygea",
                "Altay": "Altai Krai",
                "Arkhangel'sk": "Arkhangelsk Oblast",
                "Astrakhan'": "Astrakhan Oblast",
                "City of St. Petersburg": "Saint Petersburg",
                "Gorno-Altay": "Altai Republic",
                "Kabardin-Balkar": "Kabardino-Balkaria",
                "Maga Buryatdan": "Buryatia",
                "Mariy-El": "Mari El",
                "Moscow City": "Moscow",
                "Moskva": "Moscow Oblast",
                "Nizhegorod": "Nizhny Novgorod Oblast",
                "Orel": "Russia",
                "Primor'ye": "Primorsky Krai",
                "Ryazan'": "Ryazan Oblast",
                "Stavropol'": "Stavropol Krai",
                "Tver'": "Tver Oblast",
                "Tyumen'": "Tyumen Oblast",
                "Ul'yanovsk": "Ulyanovsk Oblast",
                "Yamal-Nenets": "Yamalo-Nenets Avtonomnyy Okrug",
                "Yaroslavl'": "Yaroslavl Oblast",
                "Yevrey": "Jewish Avtonomnyy Okrug",
                //"Sevastopol'": "",
                "Zabaikalskiy Krai": "Zabaykalsky",
                "Perm'": "Perm Krai"
            };
            if (translateTable[title]) {
                theTitle = translateTable[title];
            } else {
                theTitle = title;
            }
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(theTitle) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    }
};


const loadRegions = function() {
    $.getJSON(geoSettings[settings.currentMap].geo, function( data ) {
        for (let item of data.features) {
            let region, paths, found, titleKey, nutsKey, title, filteredPaths;
            found = true;
            region = {};
            //console.log(item);

            // add properties
            titleKey = geoSettings[settings.currentMap].titleKey;
            nutsKey = geoSettings[settings.currentMap].getNutsKey(item);
            region.title = item.properties[titleKey];
            region.identifier = item.properties[titleKey];



            if (settings.getInfoFromPopulationFile) {
                title = item.properties[titleKey];
                let dictRegion = geoSettings[settings.currentMap].getRegion(item, nutsKey, title);
                if (!dictRegion) {
                    console.error('NOT FOUND ' + item.properties[titleKey]);
                    found = false;
                } else {
                    region.population = Number(dictRegion.population.replace(/,/g, ''));
                    region.nutsCode = nutsKey;
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

            if (settings.removeSmallIslands) {
                let numberOfPaths, maxPaths;
                maxPaths = 7;
                numberOfPaths = paths.length;
                if (numberOfPaths > maxPaths) {
                    filteredPaths = paths
                        .sort((a,b) => (a.length > b.length) ? -1 : ((b.length > a.length) ? 1 : 0)).slice(0,maxPaths);
                } else {
                    filteredPaths = paths;
                }
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
                if (geoSettings[settings.currentMap].addCountryCode) {
                    region.country_id = geoSettings[settings.currentMap].addCountryCode;
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

        console.log(regions);
        let string = JSON.stringify(regions);
        if (!settings.printArrayBrackets) {
            string = string.substring(1, string.length-1);
        }
        console.log(string);
    });
};

const scaleDownPath = function(path) {
    let filtered, pathLength, threshold, lastPointAdded;
    filtered = [];
    threshold = 0.1;
    lastPointAdded = null;
    pathLength = path.length;
    if (pathLength > 50) {
        for (let i = 0, l = path.length; i < l; i++) {
            let point, distance;
            point = path[i];
            // exclude first and last point
            if (lastPointAdded && i < (l - 1)) {
                distance = Math.pow((point[0] - lastPointAdded[0]), 2) + Math.pow((point[1] - lastPointAdded[1]), 2);
                if (distance > threshold) {
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