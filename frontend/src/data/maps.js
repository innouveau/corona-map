const standardPcrTestAdapter = {
    titleKey: 'Land/regio',
    positiveTestsKey: '',
    findColumn: function(column) {
        return column.indexOf('20') > -1;
    }
};

const caseSettings = {
    lateReporting: ['FR', 'BE', 'PL', 'SE', 'UK']
};

const sewageDataUrl = 'https://raw.githubusercontent.com/innouveau/corona-map/master/frontend/public/data/sewage/sewage-measurements-netherlands.json';
const casesUrl = 'https://raw.githubusercontent.com/Datagraver/Covid-19-base/main/cases.csv';

const maps = [
    {
        id: 1,
        ready: true,
        block: false,
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
                source: 'data/maps/nederland/cities.json?version=3'
            },
            positivePcrTests: {
                status: true,
                source: (window.config.dataUrl + 'data/municipality-totals.csv'),
                interval: 1,
                cumulative: true
            },
            positiveAntigenTests: {
                status: false
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            hospitalisations: {
                status: true,
                source: (window.config.dataUrl + 'data/municipality-hospitalisations.csv'),
                interval: 1,
                cumulative: true,
                adapter: {
                    getKeys(columns) {
                        return columns.filter(c => c.indexOf('20') > -1);
                    },
                    getDateFromKey(key) {
                        return key;
                    },
                    regionKey: 'Municipality_name'
                }
            },
            deceased: {
                status: true,
                source: (window.config.dataUrl + 'data/municipality-deaths.csv'),
                interval: 1,
                cumulative: true,
                adapter: {
                    getKeys(columns) {
                        return columns.filter(c => c.indexOf('20') > -1);
                    },
                    getDateFromKey(key) {
                        return key;
                    },
                    regionKey: 'Municipality_name'
                }
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
        block: false,
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
                cumulative: false,
                adapter: {
                    titleKey: 'Municipality_code',
                    positiveTestsKey: 'Total_reported.',
                    administeredTestsKey: 'Total_administered.',
                    findColumn: function(column) {
                        return column.indexOf('Total_reported.') > -1;
                    }
                }
            },
            positiveAntigenTests: {
                status: false
            },
            hospitalisations: {
                status: false
            },
            deceased: {
                status: false
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
        block: false,
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
            generalInfoHasPopulation: true,
            map: {
                latitude: 51.29,
                longitude: 10.16,
                stretch: 0.62,
                zoom: 0.12,
                ratio: 1.15
            }
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/nl-de/nl-de.json'
            },
            positivePcrTests: {
                status: true,
                source: casesUrl,
                interval: 1,
                cumulative: true,
                adapter: standardPcrTestAdapter
            },
            positiveAntigenTests: {
                status: false
            },
            hospitalisations: {
                status: false
            },
            deceased: {
                status: false
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
        id: 5,
        ready: true,
        block: false,
        regionType: 'District',
        module: 'districts',
        title: 'Europe',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
            map: {
                latitude: 53,
                longitude: 5,
                stretch: 0.65,
                zoom: 0.027,
                ratio: 1.04
            },
            positiveTestGraph: {
                zoomFactor: 1
            },
            excludeRegions: [],
            caseSettings: caseSettings
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/europa/europa.json?version=3'
            },
            positivePcrTests: {
                status: true,
                source: casesUrl,
                interval: 1,
                cumulative: true,
                adapter: standardPcrTestAdapter
            },
            positiveAntigenTests: {
                status: false
            },
            hospitalisations: {
                status: false
            },
            deceased: {
                status: false
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
        ready: true,
        block: false,
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
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
                source: 'data/maps/world/world.json?version=3'
            },
            positivePcrTests: {
                status: true,
                source: casesUrl,
                interval: 1,
                cumulative: true,
                adapter: standardPcrTestAdapter
            },
            positiveAntigenTests: {
                status: false
            },
            hospitalisations: {
                status: false
            },
            deceased: {
                status: false
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
        block: false,
        regionType: 'District',
        module: 'districts',
        title: 'USA',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
            map: {
                latitude: 38,
                longitude: -100,
                zoom: 0.03,
                ratio: 1.8,
                stretch: 0.7,
            },
            positiveTestGraph: {
                zoomFactor: 0.3
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
                cumulative: true,
                adapter: standardPcrTestAdapter
            },
            positiveAntigenTests: {
                status: false
            },
            hospitalisations: {
                status: false
            },
            deceased: {
                status: false
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
        block: false,
        regionType: 'District',
        module: 'cities',
        title: 'Slovakia',
        settings: {
            regionTypes: ['city', 'country'],
            pathOrigins: [
                {
                    type: 'country',
                    paths: 'city'
                }
            ],
            generalInfoHasPopulation: true,
            map: {
                latitude: 48.95,
                longitude: 19.3,
                stretch: 0.65,
                zoom: 0.235,
                ratio: 1.5,
                discreteRegions: []
            },
            positiveTestGraph: {
                zoomFactor: 0.2
            }
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/slovakia/slovakia.json'
            },
            positivePcrTests: {
                status: true,
                source: 'data/maps/slovakia/positive-pcr-tests.csv',
                interval: 1,
                cumulative: true,
                adapter: standardPcrTestAdapter
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            positiveAntigenTests: {
                status: true,
                source: 'data/maps/slovakia/positive-antigen-tests.csv',
                adapter: {
                    titleKey: 'region',
                    getPositiveKeys: function(column) {
                        return column.indexOf('positive') > -1;
                    },
                    getTotalKeyFromDate:function(date) {
                        return date + '_total';
                    },
                    getDateFromKey: function(column) {
                        return column.split('_')[0];
                    }
                }
            },
            hospitalisations: {
                status: false
            },
            deceased: {
                status: false
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
        block: false,
        regionType: 'District',
        module: 'districts',
        title: 'South America',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
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
                cumulative: true,
                adapter: standardPcrTestAdapter
            },
            positiveAntigenTests: {
                status: false
            },
            hospitalisations: {
                status: false
            },
            deceased: {
                status: false
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