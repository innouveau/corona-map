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
        title: 'Nederland',
        story_id: 1,
        settings: {
            regionTypes: ['municipality','ggd', 'safety-region', 'province', 'country'],
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
        title: 'Vaccinatie',
        settings: {
            regionTypes: ['district', 'municipality', 'ggd', 'province', 'country'],
            pathOrigins: [],
            generalInfoHasPopulation: false,
            map: {
                latitude: 52.15,
                longitude: 5.34,
                stretch: 0.62,
                zoom: 0.345,
                ratio: 0.91,
                bookmarks: [
                    {
                        title: "Amsterdam",
                        navigation: { "zoom": 9, "position": { "x": 626, "y": 479 } }
                    },
                    {
                        title: "Den Haag",
                        navigation: { "zoom": 11, "position": { "x": 1802, "y": -286 } }
                    },
                    {
                        title: "Rotterdam",
                        navigation: { "zoom": 11, "position": { "x": 1479, "y": -710 } }
                    },
                    {
                        title: "Utrecht",
                        navigation: { "zoom": 12, "position": { "x": 436, "y": -283 } }
                    },
                    {
                        title: "Urk",
                        navigation: { "zoom": 6, "position": { "x": -450, "y": 726 } }
                    }
                ]
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
                    url: window.config.dataUrl + 'data/vaccination-neighborhood-completed.csv',
                    cumulative: false,
                    percentage: true,
                    adapter: {
                        titleKey: 'Region_code',
                        populationKey: 'Populatie_merged',
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
        title: 'World',
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
    {
        id: 13,
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
        title: 'South-East Asia',
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
