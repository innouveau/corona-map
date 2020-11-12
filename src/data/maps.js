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
                zoom: 0.345,
                ratio: 0.91
            },
            positiveTestGraph: {
                zoomFactor: 0.66
            }
        },
        url: {
            tests: (window.config.dataUrl + 'data/municipality-totals.csv'),
            regions: 'data/maps/nederland/cities.json',
            ageGroups: 'data/maps/nederland/cities-population-agegroup.csv',
            sewageTreatmentPlants: sewageDataUrl
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
                zoom: 3.5,
                ratio: 1.1
            },
            positiveTestGraph: {
                zoomFactor: 0.66
            }
        },
        url: {
            tests: 'data/maps/amsterdam/amsterdam-tests.csv',
            regions: 'data/maps/amsterdam/amsterdam.json',
            ageGroups: '',
            sewageTreatmentPlants: sewageDataUrl
        }
    }, {
        id: 3,
        ready: true,
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
                zoom: 3.2,
                ratio: 0.89
            }
        },
        url: {
            tests: 'data/maps/den-haag/tests-den-haag.csv',
            regions: 'data/maps/den-haag/den-haag.json',
            ageGroups: '',
            sewageTreatmentPlants: sewageDataUrl
        }
    }, {
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
            hasTests: true,
            testDataCumulative: true,
            testDataInterval: 1,
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
        url: {
            tests: casesUrl,
            regions: 'data/maps/europa/europa.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
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
            hasAgeGroups: false,
            hasTests: true,
            hasAdministeredTests: false,
            hasSewageTreatmentPlants: false,
            testDataCumulative: true,
            testDataInterval: 1,
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
        url: {
            tests: casesUrl,
            regions: 'data/maps/world/world.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
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
            hasAgeGroups: false,
            hasTests: true,
            hasAdministeredTests: false,
            hasSewageTreatmentPlants: false,
            testDataCumulative: true,
            testDataInterval: 1,
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
        url: {
            tests: casesUrl,
            regions: 'data/maps/usa/usa.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
        }
    }, {
        id: 7,
        ready: true,
        regionType: 'District',
        module: 'districts',
        title: 'Spain',
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
            testAdapter: standardTestAdapter,
            map: {
                latitude: 40,
                longitude: -3,
                stretch: 0.7,
                zoom: 0.11,
                ratio: 1.18
            }
        },
        url: {
            tests: casesUrl,
            regions: 'data/maps/spain/spain.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
        }
    }, {
        id: 8,
        ready: true,
        regionType: 'District',
        module: 'districts',
        title: 'Belgie',
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
            testAdapter: standardTestAdapter,
            map: {
                latitude: 50.5,
                longitude: 4.5,
                stretch: 0.65,
                zoom: 0.4,
                ratio: 1.22
            }
        },
        url: {
            tests: casesUrl,
            regions: 'data/maps/belgium/belgium.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
        }
    }, {
        id: 10,
        ready: true,
        regionType: 'District',
        module: 'districts',
        title: 'Rotterdam',
        settings: {
            regionTypes: ['district'],
            pathOrigins: [
                {
                    type: 'ggd',
                    paths: 'district'
                }
            ],
            hasAgeGroups: false,
            hasTests: true,
            hasAdministeredTests: false,
            hasSewageTreatmentPlants: true,
            testDataCumulative: true,
            testDataInterval: 7,
            generalInfoHasPopulation: false,
            map: {
                latitude: 51.92,
                longitude: 4.32,
                stretch: 0.62,
                zoom: 5.1,
                ratio: 2
            }
        },
        url: {
            tests: 'data/maps/rotterdam/tests-rotterdam.csv',
            regions: 'data/maps/rotterdam/rotterdam.json',
            ageGroups: '',
            sewageTreatmentPlants: sewageDataUrl
        }
    }, {
        id: 11,
        ready: false,
        regionType: 'District',
        module: 'districts',
        title: 'South Korea',
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
            testAdapter: standardTestAdapter,
            map: {
                latitude: 36.6,
                longitude: 127.7,
                stretch: 0.62,
                zoom: 0.24,
                ratio: 0.7
            }
        },
        url: {
            tests: casesUrl,
            regions: 'data/maps/south-korea/south-korea.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
        }
    }, {
        id: 12,
        ready: false,
        regionType: 'District',
        module: 'districts',
        title: 'Slovakia',
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
            testAdapter: standardTestAdapter,
            map: {
                latitude: 48.65,
                longitude: 19.9,
                stretch: 0.65,
                zoom: 0.5,
                ratio: 2.07
            },
            positiveTestGraph: {
                zoomFactor: 0.4
            }
        },
        url: {
            tests: 'data/maps/slovakia/cases.csv',
            regions: 'data/maps/slovakia/slovakia.json',
            ageGroups: '',
            sewageTreatmentPlants: ''
        }
    }
];

export default maps;