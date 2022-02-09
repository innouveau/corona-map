import store from "@/store/store";
import * as d3 from "d3";
import dateTool from "@/tools/date";
import numberTools from "@/tools/number";

let historyConstructed = false;
let timeline = [];

export const loadSources = async (map) => {
    const sources = [];
    for (const key in map.data.sources) {
        const settings = map.data.sources[key];
        sources.push({ key, settings });
    }
    for (const source of sources) {
        addSource(source.key);
        if (source.settings.loadInitially) {
            await loadSource(map, source);
        }
    }
}

const addSource = (key) => {
    const signalingSystem = store.state.signalingSystems.all.find(s => s.source === key);
    const source = {
        key: key,
        title: key,
        signalingSystem_id: signalingSystem.id,
        // todo
        order: store.state.sources.all.length
    };
    store.commit('sources/create', source);
}

const getAdapter = (source) => {
    if (source.settings.adapter) {
        return source.settings.adapter;
    } else {
        return {
            titleKey: 'Municipality_code',
            positiveTestsKey: '',
            administeredTestsKey: 'Total_administered.',
            findColumn: function(column) {
                return column.indexOf('20') > -1;
            }
        }
    }
}

const loadSource = async(map, source) => {
    return new Promise((resolve, reject) => {
        d3.csv(source.settings.url + dateTool.getTimestamp())
            .then((data) => {
                const adapter = getAdapter(source);

                if (!historyConstructed) {
                    constructTimeline(data.columns, adapter);
                }

                for (let regionData of data) {
                    addSourceItem(map, source, regionData, adapter);
                }
                const sourceItem = store.getters["sources/getItemByProperty"]("title", source.key);
                store.commit('sources/updatePropertyOfItem', {item: sourceItem, property: 'loaded', value: true});
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    })
}

const addSourceItem = (map, source, regionData, adapter) => {
    const titleKey = regionData[adapter.titleKey];
    if (store.state[map.module].dict[titleKey]) {
        const region = store.state[map.module].dict[titleKey];
        if (region) {
            const report = {
                history: []
            };

            for (let timelineDay of timeline) {
                const regionDay = {
                    date: timelineDay.dateString,
                    offset: timelineDay.offset,
                    source: {}
                };
                const key = timelineDay.sourceKeys.positiveTests;

                if (regionData[key]) {
                    regionDay.source.positiveTests = Number(regionData[key]);
                }
                report.history.push(regionDay);
            }

            // correct for cumulative input
            if (source.cumulative) {
                const l = report.history.length;
                for (let i = 0; i < l; i++) {
                    const day = report.history[i];
                    if (i > 0) {
                        const dayBefore = report.history[i - 1]
                        day.source[source.key] = day.source[source.key] - dayBefore.source[source.key];
                    } else {
                        day.source[source.key] = null;
                    }
                }
            }
            store.commit(map.module + '/updatePropertyOfItem', {item: region, property: 'report', value: report});
            if (!map.settings.generalInfoHasPopulation) {
                store.commit(map.module + '/updatePropertyOfItem', {item: region, property: 'population', value: numberTools.convertToNumber(regionData.population)});
            }
        } else {
            console.log('not found ' + titleKey);
        }
    } else {
        if (titleKey.length > 0) {
            console.log('not found ' + titleKey);
        }
    }
}

const constructTimeline = (columns, adapter) => {
    for (let column of columns) {
        if (adapter.findColumn(column)) {
            let dateString;
            if (adapter.positiveTestsKey.length > 0) {
                dateString = column.split(adapter.positiveTestsKey)[1];
            } else {
                dateString = column;
            }
            timeline.push({
                sourceKeys: {
                    // todo improve this
                    positiveTests: column,
                },
                dateString,
                ms: new Date(dateString).getTime()
            });
        }
    }
    // sort to be sure the order is correct
    timeline = timeline.sort((a,b) => (a.ms > b.ms) ? 1 : ((b.ms > a.ms) ? -1 : 0));
    // remove the ms value afterwards
    timeline = timeline.map((day) => {
        const d = { ...day };
        delete d.ms;
        return d;
    })
    // add offset
    for (let day of timeline) {
        let offset = timeline.length - timeline.indexOf(day) - 1;
        day.offset = offset;
        dateTool.addDateOffset(day.dateString, offset)
    }

    // do some administration
    const first = timeline[0];
    const last = timeline[timeline.length - 1];
    const today = new Date(last.dateString);
    const totalLengthOfTestHistory = first.offset;
    store.commit('ui/updateProperty', {key: 'todayInMs', value: today.getTime()});
    store.commit('ui/updateProperty', {key: 'today', value: today});
    store.commit('settings/updateProperty', {key: 'historyLength', value: totalLengthOfTestHistory});
}
