let regions, id, printArrayBrackets, keys, titleKey, populationDict,
    addPathsIfExists,
    currentMap, settings;

regions = [];
id = 373;

currentMap = 'mexico';
settings = {
    mexico: {
        geo: 'data/mexico/geo.json',
        titleKey: 'state_name',
        scaleDownPaths: true,
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
        scaleDownPaths: true,
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
        scaleDownPaths: false,
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
        scaleDownPaths: false,
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
        scaleDownPaths: false,
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
        scaleDownPaths: false,
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
        scaleDownPaths: true,
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

// settings for export
getInfoFromPopulationFile = true;
printArrayBrackets = false;
addPathsIfExists = true;


const loadRegions = function() {
    $.getJSON(settings[currentMap].geo, function( data ) {
        for (let item of data.features) {
            let region, paths, found, titleKey, nutsKey, title;
            found = true;
            region = {};
            console.log(item);

            // add properties
            titleKey = settings[currentMap].titleKey;
            nutsKey = settings[currentMap].getNutsKey(item);
            region.title = item.properties[titleKey];
            region.identifier = item.properties[titleKey];

            if (getInfoFromPopulationFile) {
                title = item.properties[titleKey];
                let dictRegion = settings[currentMap].getRegion(item, nutsKey, title);
                if (!dictRegion) {
                    console.log(item.properties[titleKey]);
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




            region.paths = paths.map(path => {
                let thePath;
                if (settings[currentMap].scaleDownPaths) {
                    let l = path.length;
                    if (l > 1000) {
                        thePath = scaleDownPath(path, 10);
                    } else if (l > 100) {
                        thePath = scaleDownPath(path, 4);
                    } else if (l > 50) {
                        thePath = scaleDownPath(path, 2);
                    } else {
                        thePath = path;
                    }
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
                region.id = id++;
                if (settings[currentMap].addCountryCode) {
                    region.country_id = settings[currentMap].addCountryCode;
                }

                if (addPathsIfExists) {
                    let exists = regions.find(r => r.title === region.title);
                    if (exists) {
                        for (let path of region.paths) {
                            exists.paths.push(path);
                        }
                    } else {
                        regions.push(region);
                    }
                } else {
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

const scaleDownPath = function(path, scaleDown) {
    let filtered = [];
    for (let i = 0, l = path.length; i < l; i++) {
        let c = path[i];
        if (i === 0 || i === (l - 1) || i % scaleDown === 0) {
            filtered.push(c);
        }
    }
    return filtered;
};



if (getInfoFromPopulationFile) {

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