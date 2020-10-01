const maps = [
    {
        id: 1,
        title: 'Nederland',
        module: 'cities',
        regionLabel: 'gemeentes',
        settings: {
            regionTypes: ['city','ggd', 'safety-region', 'province', 'country'],
            pathOrigins: [
                {
                    type: 'country',
                    paths: 'city'
                }
            ],
            hasAgeGroups: true,
            hasTests: true,
            hasAdministeredTests: false,
            hasSewageTreatmentPlants: true,
            testDataCumulative: true,
            testDataInterval: 1,
            generalInfoHasPopulation: false,
            map: {
                latitude: 52.15,
                longitude: 5.34,
                stretch: 0.62,
                zoom: 0.345
            }
        },
        url: {
            tests: (window.config.dataUrl + 'data/municipality-totals.csv'),
            regions: 'data/maps/nederland/cities.json',
            ageGroups: 'data/maps/nederland/cities-population-agegroup.csv',
            sewageTreatmentPlants: (window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json')
        }
    }, {
        id: 2,
        regionType: 'District',
        module: 'districts',
        title: 'Amsterdam',
        settings: {
            regionTypes: ['district', 'ggd'],
            pathOrigins: [
                {
                    type: 'ggd',
                    paths: 'district'
                }
            ],
            hasAgeGroups: false,
            hasTests: true,
            hasAdministeredTests: true,
            hasSewageTreatmentPlants: true,
            testDataCumulative: false,
            testDataInterval: 7,
            generalInfoHasPopulation: false,
            map: {
                latitude: 52.32,
                longitude: 4.86,
                stretch: 0.62,
                zoom: 3.5
            }
        },
        url: {
            tests: 'data/maps/amsterdam/amsterdam-tests.csv',
            regions: 'data/maps/amsterdam/amsterdam.json',
            ageGroups: '',
            sewageTreatmentPlants: (window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json')
        }
    }, {
        id: 3,
        regionType: 'District',
        module: 'districts',
        title: 'Den Haag',
        settings: {
            regionTypes: ['district', 'ggd'],
            pathOrigins: [
                {
                    type: 'ggd',
                    paths: 'district'
                }
            ],
            hasAgeGroups: false,
            hasTests: true,
            hasAdministeredTests: true,
            hasSewageTreatmentPlants: false,
            testDataCumulative: false,
            testDataInterval: 7,
            generalInfoHasPopulation: false,
            map: {
                latitude: 52.05,
                longitude: 4.34,
                stretch: 0.62,
                zoom: 3.2
            }
        },
        url: {
            tests: 'data/maps/den-haag/tests-den-haag.csv',
            regions: 'data/maps/den-haag/den-haag.json',
            ageGroups: '',
            sewageTreatmentPlants: (window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json')
        }
    }, {
        id: 4,
        regionType: 'District',
        module: 'districts',
        title: 'NL DE',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            hasAgeGroups: false,
            hasTests: true,
            hasAdministeredTests: false,
            hasSewageTreatmentPlants: false,
            testDataCumulative: true,
            testDataInterval: 1,
            generalInfoHasPopulation: true,
            testAdapter: {
                titleKey: 'Land/regio',
                positiveTestsKey: '',
                findColumn: function(column) {
                    return column.indexOf('20') > -1;
                }
            },
            map: {
                latitude: 51.29,
                longitude: 10.16,
                stretch: 0.62,
                zoom: 0.1
            }
        },
        url: {
            tests: 'data/maps/europa/cases.csv',
            regions: 'data/maps/nl-de/nl-de.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
        }
    }, {
        id: 5,
        regionType: 'District',
        module: 'districts',
        title: 'Europa',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            hasAgeGroups: false,
            hasTests: true,
            hasAdministeredTests: false,
            hasSewageTreatmentPlants: false,
            testDataCumulative: true,
            testDataInterval: 1,
            generalInfoHasPopulation: true,
            testAdapter: {
                titleKey: 'Land/regio',
                positiveTestsKey: '',
                findColumn: function(column) {
                    return column.indexOf('20') > -1;
                }
            },
            map: {
                latitude: 51.29,
                longitude: 10.16,
                stretch: 0.62,
                zoom: 0.1
            }
        },
        url: {
            tests: 'data/maps/europa/cases.csv',
            regions: 'data/maps/europa/europa.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
        }
    }
];

export default maps;