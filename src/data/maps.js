const maps = [
    {
        id: 1,
        title: 'Nederland',
        regionType: 'Gemeente',
        regionLabel: 'gemeentes',
        settings: {
            regionTypes: ['ggd', 'sr', 'country'],
            hasAgeGroups: true,
            hasTests: true,
            hasSewageTreatmentPlants: false,
            testDataCumulative: true,
            testDataInterval: 1,
            map: {
                latitude: 52.15,
                longitude: 5.34,
                stretch: 0.62,
                zoom: 0.345
            }
        },
        url: {
            tests: (window.config.dataUrl + 'data/municipality-totals.csv'),
            regions: 'data/cities.json',
            ageGroups: 'data/cities-population-agegroup.csv',
            sewageTreatmentPlants: (window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json')
        }
    }, {
        id: 2,
        regionType: 'Stadsdeel',
        regionLabel: 'stadsdelen',
        title: 'Amsterdam',
        settings: {
            //regionTypes: ['ggd'],
            regionTypes: [],
            hasAgeGroups: false,
            hasTests: true,
            hasSewageTreatmentPlants: false,
            testDataCumulative: false,
            testDataInterval: 7,
            map: {
                latitude: 52.32,
                longitude: 4.86,
                stretch: 0.62,
                zoom: 3.5
            }
        },
        url: {
            tests: 'data/amsterdam-positieve-tests.csv',
            regions: 'data/amsterdam.json',
            ageGroups: 'data/cities-population-agegroup.csv',
            sewageTreatmentPlants: (window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json')
        }
    }
];

export default maps;