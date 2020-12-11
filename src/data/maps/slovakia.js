import {standardPcrTestAdapter} from "./adapters"

const slovakia = {
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
};

export default slovakia;