const sewageDataUrl = 'https://raw.githubusercontent.com/innouveau/corona-map/master/public/data/sewage/sewage-measurements-netherlands.json';

const netherlands = {
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
            source: 'data/maps/nederland/cities.json'
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
                    return columns.filter(c => c.indexOf('Hospital_admission.') > -1);
                },
                getDateFromKey(key) {
                    return key.split('Hospital_admission.')[1];
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
                    return columns.filter(c => c.indexOf('Deceased.') > -1);
                },
                getDateFromKey(key) {
                    return key.split('Deceased.')[1];
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
};

export default netherlands;