const regions = [];
const regionsWithExtraPaths = [];
const extraPathsDict = {};

const settings = {
    file: {
        population: 'population.csv',
        regions: 'regions.json'
    },
    printArrayBrackets: true,
    titleKey: 'NAME_LATN',
}


const countriesWithNuts2Regions = [
    'NL', 'BE', 'DE', 'FR', 'LU', 'CH', 'AT', 'AD', 'LI', 'CZ', 'IT', 'NO', 'SE', 'FI', 'DK',
    'RO', 'SK', 'AL', 'UK'
];

// if you want a country to be found, ad its NUTS_ID in the population.csv table
const countriesAsAWhole = [
    'PT',
    'ES',
    'PL',
    'IS',
    'EE',
    'LV',
    'LT',
    'EL',
    'HU',
    'HR', // (Croatia)
    'RS', // (Serbia)
    'BG',
    'SI', // (Slovenia)
    'ME', // Montenegro
    'CY',
    'IE'
];

const getPopulationDict = async() => {
    return new Promise(resolve => {
        const result = {
            population: {},
            extraRegions: {}
        }
        d3.csv(settings.file.population)
            .then((data) => {
                for (let item of data) {
                    result.population[item.ISO3166_NUTS] = item;
                    if (item.extraRegion.length > 0) {
                        result.extraRegions[item.extraRegion] = item;
                    }
                }
                return resolve(result);
            })
    })
}
const init = async() => {
    const populationData = await getPopulationDict();
    const regions = await loadRegions();
    prepareData(regions, populationData);
    printRegions();
}


const printRegions = () => {
    let string = JSON.stringify(regions);
    console.log(regions);
    if (!settings.printArrayBrackets) {
        string = string.substring(1, string.length - 1);
    }
    console.log(string);
}

const addProperties = (populationData, region, item) => {
    // add properties
    region.title = item.properties[settings.titleKey];
    region.identifier = item.properties[settings.titleKey];
    const sourceOfInfo = getRegionByNuts(populationData.population, item.id);
    if (region.title === 'Spain') {
        console.log(item.id);
    }
    if (!sourceOfInfo) {
        return false;
    } else {
        region.population = Number(sourceOfInfo.population);
        region.nutsCode = item.id;
        region.title = sourceOfInfo.region;
        region.identifier = sourceOfInfo.region;
        region.extraRegion = sourceOfInfo.extraRegion;
        return true;
    }
}

const addPaths = (region, item) => {
    let paths;
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
}

const filter = (item) => {
    return countriesWithNuts2Regions.includes(item.properties.CNTR_CODE) || countriesAsAWhole.includes(item.id)
}


const prepareData = (items, populationData) => {
    for (let item of items) {
        if (filter(item)) {
            const region = {};
            let found = true;

            found = addProperties(populationData, region, item);
            addPaths(region, item);

            // TODO
            // check if this item is an extra region
            // if so we later add its paths to the region it belongs to
            if (extraPathsDict[item.id]) {
                region.parent = extraPathsDict[item.id].ISO3166_NUTS;
                regionsWithExtraPaths.push(region);
            }

            if (!doesExist(region) && found) {
                region.id = regions.length + 1;
                regions.push(region);
            }
        }
    }

    for (let region of extraRegions) {
        region.id = regions.length + 1;
        regions.push(region);
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
}

const loadRegions = async(populationData) => {
    return new Promise(resolve => {
        $.getJSON(settings.file.regions, function (data) {
            resolve(data.features);
        });
    })
};


const getRegionByNuts = function(dict, nutsCode) {
    return dict[nutsCode];
};

const doesExist = function (r) {
    for (let region of regions) {
        if (region.title === r.title) {
            return true;
        }
    }
    return false;
};

    init();

