let regions, id, printArrayBrackets, keys, titleKey, populationDict;

regions = [];
getInfoFromPopulationFile = true;
id = 1;
printArrayBrackets = true;
titleKey = 'NAME_1';



if (getInfoFromPopulationFile) {
    populationDict = {};
    d3.csv('population.csv')
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
                let dictRegion = getRegionByNuts(item.properties[titleKey]);
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

const getRegionByNuts = function(title) {
    let connection = {
        'Busan': 'Busan',
        'Chungcheongbuk-do': 'Chungbuk',
        'Chungcheongnam-do': 'Chungnam',
        'Daegu': 'Daegu',
        'Daejeon': 'Daejeon',
        'Gangwon-do': 'Gangwon',
        'Gwangju': 'Gwangju',
        'Gyeonggi-do': 'Gyeonggi',
        'Gyeongsangbuk-do': 'Gyeongbuk',
        'Gyeongsangnam-do': 'Gyeongnam',
        'Incheon': 'Incheon',
        'Jeju': 'Jeju',
        'Jeollabuk-do': '',
        'Jeollanam-do': '',
        'Seoul': 'Seoul',
        'Ulsan': 'Ulsan'

        // Jeonbuk
        // Sejong
    };


    //console.log(populationDict[connection[title]]);
    return populationDict[connection[title]];

};