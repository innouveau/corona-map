import {standardPcrTestAdapter} from "./adapters";

const caseSettings = {
    lateReporting: ['FR', 'BE', 'PL', 'SE']
};
const casesUrl = 'https://raw.githubusercontent.com/Datagraver/Covid-19-base/main/cases.csv';



const europe = {
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
            zoomFactor: 0.3
        },
        excludeRegions: [],
        caseSettings: caseSettings
    },
    data: {
        geo: {
            status: true,
            source: 'data/maps/europa/europa.json?version=2'
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
};

export default europe;