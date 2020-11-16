const standardTestAdapter = {
    titleKey: 'Land/regio',
    positiveTestsKey: '',
    findColumn: function(column) {
        return column.indexOf('20') > -1;
    }
};

const caseSettings = {
    lateReporting: ['FR', 'BE']
};

const sewageDataUrl = 'https://raw.githubusercontent.com/innouveau/corona-map/master/public/data/sewage/sewage-measurements-netherlands.json';
const casesUrl = 'https://raw.githubusercontent.com/Datagraver/Covid-19-base/main/cases.csv';

const maps = [
    {
        id: 1,
        ready: true,
        title: 'Nederland',
        module: 'cities',
        regionLabel: 'gemeentes',
        story_id: 1,
        settings: {
            regionTypes: ['city','ggd', 'safety-region', 'province', 'country'],
            pathOrigins: [
                {
                    type: 'country',
                    paths: 'city'
                }
            ],
            generalInfoHasPopulation: false,
            map: {
                latitude: 52.15,
                longitude: 5.34,
                stretch: 0.62,
                zoom: 0.345,
                ratio: 0.91
            },
            positiveTestGraph: {
                zoomFactor: 0.66
            }
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/nederland/cities.json'
            },
            positivePcrTests: {
                status: true,
                source: (window.config.dataUrl + 'data/municipality-totals.csv'),
                interval: 1,
                cumulative: true
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            ageGroups: {
                status: true,
                source: 'data/maps/nederland/cities-population-agegroup.csv'
            },
            sewageMeasurements: {
                status: true,
                source: sewageDataUrl
            }
        }
    }, {
        id: 2,
        ready: true,
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
            generalInfoHasPopulation: false,
            map: {
                latitude: 52.32,
                longitude: 4.86,
                stretch: 0.62,
                zoom: 3.5,
                ratio: 1.1
            },
            positiveTestGraph: {
                zoomFactor: 0.66
            }
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/amsterdam/amsterdam.json'
            },
            positivePcrTests: {
                status: true,
                source: 'data/maps/amsterdam/amsterdam-tests.csv',
                interval: 7,
                cumulative: false
            },
            administeredPcrTests: {
                status: true,
                source: 'data/maps/amsterdam/amsterdam-tests.csv'
            },
            ageGroups: {
                status: false,
                source: ''
            },
            sewageMeasurements: {
                status: false,
                source: ''
            }
        }
    },
    {
        id: 4,
        ready: true,
        regionType: 'District',
        module: 'districts',
        title: 'NL-DE',
        settings: {
            customRegionLabel: {
                nl: 'Gebieden',
                en: 'Regions'
            },
            regionTypes: ['district'],
            pathOrigins: [],
            hasAgeGroups: false,
            hasTests: true,
            hasAdministeredTests: false,
            hasSewageTreatmentPlants: false,
            testDataCumulative: true,
            testDataInterval: 1,
            generalInfoHasPopulation: true,
            testAdapter: standardTestAdapter,
            map: {
                latitude: 51.29,
                longitude: 10.16,
                stretch: 0.62,
                zoom: 0.12,
                ratio: 1.15
            }
        },
        url: {
            tests: casesUrl,
            regions: 'data/maps/nl-de/nl-de.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
        }
    }, {
        id: 5,
        ready: true,
        regionType: 'District',
        module: 'districts',
        title: 'Europe',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
            testAdapter: standardTestAdapter,
            map: {
                latitude: 53,
                longitude: 5,
                stretch: 0.65,
                zoom: 0.027,
                ratio: 1.04
            },
            positiveTestGraph: {
                zoomFactor: 0.3
            },
            excludeRegions: [],
            caseSettings: caseSettings
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/europa/europa.json'
            },
            positivePcrTests: {
                status: true,
                source: casesUrl,
                interval: 1,
                cumulative: true
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            ageGroups: {
                status: false,
                source: ''
            },
            sewageMeasurements: {
                status: false,
                source: ''
            }
        }
    },
    {
        id: 6,
        regionType: 'District',
        module: 'districts',
        title: 'World',
        ready: false,
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
            testAdapter: standardTestAdapter,
            map: {
                projection: 'robinson',
                shiftY: -5,
                shiftX: -5,
                // ratio: 1.6,
                zoom: 1.1,
                ratio: 2
            }
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/world/world.json'
            },
            positivePcrTests: {
                status: true,
                source: casesUrl,
                interval: 1,
                cumulative: true
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            ageGroups: {
                status: false,
                source: ''
            },
            sewageMeasurements: {
                status: false,
                source: ''
            }
        }
    },
    {
        id: 7,
        ready: true,
        regionType: 'District',
        module: 'districts',
        title: 'USA',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
            testAdapter: standardTestAdapter,
            map: {
                latitude: 38,
                longitude: -100,
                zoom: 0.03,
                ratio: 1.8,
                stretch: 0.7,

            }
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/usa/usa.json'
            },
            positivePcrTests: {
                status: true,
                source: casesUrl,
                interval: 1,
                cumulative: true
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            ageGroups: {
                status: false,
                source: ''
            },
            sewageMeasurements: {
                status: false,
                source: ''
            }
        }
    },
    {
        id: 12,
        ready: true,
        regionType: 'District',
        module: 'cities',
        title: 'Slovakia',
        settings: {
            regionTypes: ['city','country'],
            pathOrigins: [
                {
                    type: 'country',
                    paths: 'city'
                }
            ],
            generalInfoHasPopulation: true,
            testAdapter: standardTestAdapter,
            map: {
                latitude: 48.65,
                longitude: 19.9,
                stretch: 0.65,
                zoom: 0.5,
                ratio: 2.07
            },
            positiveTestGraph: {
                zoomFactor: 0.7
            }
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/slovakia/slovakia.json'
            },
            positivePcrTests: {
                status: true,
                source: 'data/maps/slovakia/cases.csv',
                interval: 1,
                cumulative: true
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            ageGroups: {
                status: false,
                source: ''
            },
            sewageMeasurements: {
                status: false,
                source: ''
            }
        }
    }, {
        id: 13,
        ready: true,
        regionType: 'District',
        module: 'districts',
        title: 'South America',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
            testAdapter: standardTestAdapter,
            map: {
                latitude: -22,
                longitude: -60,
                stretch: 0.8,
                zoom: 0.014,
                ratio: 0.65
            },
            positiveTestGraph: {
                zoomFactor: 0.9
            },
            excludeRegions: [],
            caseSettings: caseSettings
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/south-america/south-america.json'
            },
            positivePcrTests: {
                status: true,
                source: casesUrl,
                interval: 1,
                cumulative: true
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            ageGroups: {
                status: false,
                source: ''
            },
            sewageMeasurements: {
                status: false,
                source: ''
            }
        }
    }
];

export default maps;