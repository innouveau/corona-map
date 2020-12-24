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
                source: 'data/maps/nederland/cities.json?version=2'
            },
            positivePcrTests: {
                status: true,
                source: 'data/maps/nederland/nederland-cases.csv',
                interval: 1,
                cumulative: false,
                adapter: {
                    titleKey: 'code',
                    positiveTestsKey: '',
                    findColumn: function(column) {
                        return column.indexOf('20') > -1;
                    }
                }
            },
            positiveAntigenTests: {
                status: false
            },
            administeredPcrTests: {
                status: false,
                source: ''
            },
            hospitalisations: {
                status: false,
                source: ''
            },
            deceased: {
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