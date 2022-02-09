const datagraverAdapter = {
    titleKey: 'Land/regio',
    valuePrefix: '',
    isValueColumn: function(column) {
        return column.indexOf('20') > -1;
    },
    getDateFromColumn: function(column) {
        return column;
    }
};

const mzelstAdapter = {
    titleKey: 'Municipality_code',
    valuePrefix: '',
    isValueColumn: function(column) {
        return column.indexOf('20') > -1;
    },
    getDateFromColumn: function(column) {
        return column;
    }
}

const casesUrl = 'https://raw.githubusercontent.com/Datagraver/Covid-19-base/main/cases.csv';

const standardSources = {
    positiveTests: {
        loadInitially: true,
            status: true,
            url: casesUrl,
            cumulative: true,
            adapter: datagraverAdapter
    }
}

const caseSettings = {
    lateReporting: ['FR', 'BE', 'PL', 'SE', 'UK']
};

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
                zoomFactor: 0.075
            },
            interval: 1
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/nederland/cities.json?version=2022'
            },
            sources: {
                positiveTests: {
                    loadInitially: true,
                    url: (window.config.dataUrl + 'data/municipality-totals.csv'),
                    interval: 1,
                    cumulative: true,
                    adapter: mzelstAdapter
                },
                hospitalisations: {
                    loadInitially: false,
                    url: (window.config.dataUrl + 'data/municipality-hospitalisations.csv'),
                    interval: 1,
                    cumulative: true,
                    adapter: mzelstAdapter
                },
                deceased: {
                    loadInitially: false,
                    url: (window.config.dataUrl + 'data/municipality-deaths.csv'),
                    interval: 1,
                    cumulative: true,
                    adapter: mzelstAdapter
                }
            }
        }
    },
    {
        id: 15,
        ready: true,
        block: false,
        title: 'Vaccinatie',
        module: 'districts',
        regionLabel: 'wijken',
        story_id: null,
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: false,
            map: {
                latitude: 52.15,
                longitude: 5.34,
                stretch: 0.62,
                zoom: 0.345,
                ratio: 0.91
            },
            positiveTestGraph: {
                zoomFactor: 7
            },
            interval: 7
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/nederland/districts.json?version=1'
            },
            sources: {
                vaccination: {
                    loadInitially: true,
                    url: 'data/maps/nederland/vaccination-data.csv',
                    cumulative: false,
                    adapter: {
                        titleKey: 'regionCode',
                        valuePrefix: '',
                        isValueColumn: function(column) {
                            return column.indexOf('20') > -1;
                        },
                        getDateFromColumn: function(column) {
                            return column;
                        }
                    }
                },
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
            },
            interval: 1
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/nl-de/nl-de.json'
            },
            sources: standardSources
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
                zoomFactor: 0.15
            },
            caseSettings: caseSettings,
            interval: 1
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/europa/europa.json?version=5'
            },
            sources: standardSources
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
            },
            positiveTestGraph: {
                zoomFactor: 0.2
            },
            interval: 1
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/world/world.json?version=5'
            },
            sources: standardSources
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
            },
            interval: 1
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/usa/usa.json'
            },
            sources: standardSources
        }
    },
    // {
    //     id: 12,
    //     ready: true,
    //     block: false,
    //     regionType: 'District',
    //     module: 'cities',
    //     title: 'Slovakia',
    //     settings: {
    //         regionTypes: ['city', 'country'],
    //         pathOrigins: [
    //             {
    //                 type: 'country',
    //                 paths: 'city'
    //             }
    //         ],
    //         generalInfoHasPopulation: true,
    //         map: {
    //             latitude: 48.95,
    //             longitude: 19.3,
    //             stretch: 0.65,
    //             zoom: 0.235,
    //             ratio: 1.5,
    //             discreteRegions: []
    //         },
    //         positiveTestGraph: {
    //             zoomFactor: 0.2
    //         }
    //     },
    //     data: {
    //         geo: {
    //             status: true,
    //             source: 'data/maps/slovakia/slovakia.json'
    //         },
    //         positivePcrTests: {
    //             status: true,
    //             source: 'data/maps/slovakia/positive-pcr-tests.csv',
    //             interval: 1,
    //             cumulative: true,
    //             adapter: datagraverAdapter
    //         },
    //         administeredPcrTests: {
    //             status: false,
    //             source: ''
    //         },
    //         positiveAntigenTests: {
    //             status: true,
    //             source: 'data/maps/slovakia/positive-antigen-tests.csv',
    //             adapter: {
    //                 titleKey: 'region',
    //                 getPositiveKeys: function(column) {
    //                     return column.indexOf('positive') > -1;
    //                 },
    //                 getTotalKeyFromDate:function(date) {
    //                     return date + '_total';
    //                 },
    //                 getDateFromKey: function(column) {
    //                     return column.split('_')[0];
    //                 }
    //             }
    //         },
    //     }
    // },
    {
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
            caseSettings: caseSettings,
            interval: 1
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/south-america/south-america.json?version=2'
            },
            sources: standardSources
        }
    },
    {
        id: 14,
        regionType: 'District',
        module: 'districts',
        title: 'South-East Asia',
        ready: true,
        block: false,
        settings: {
            regionTypes: ['district'],
            pathOrigins: [],
            generalInfoHasPopulation: true,
            map: {
                latitude: 20,
                longitude: 110,
                stretch: 0.8,
                zoom: 0.014,
                ratio: 1
            },
            positiveTestGraph: {
                zoomFactor: 1
            },
            interval: 1
        },
        data: {
            geo: {
                status: true,
                source: 'data/maps/south-east-asia/south-east-asia.json?version=2'
            },
            sources: standardSources
        }
    },
];

export default maps;
