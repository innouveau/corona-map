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
        sources.push({ ...settings, key });
    }
    for (const source of sources) {
        addSource(source.key);
        if (source.loadInitially) {
            await loadSource(map, source);
        }
    }
};

const addSource = (key) => {
    const signalingSystem = store.state.signalingSystems.all.find(
        (s) => s.source === key
    );
    const source = {
        key: key,
        title: key,
        signalingSystem_id: signalingSystem.id,
        // todo
        order: store.state.sources.all.length,
    };
    store.commit("sources/create", source);
};

export const loadSource = async (map, source) => {
    return new Promise((resolve, reject) => {
        d3.csv(source.url + dateTool.getTimestamp())
            .then((data) => {
                if (!historyConstructed) {
                    constructTimeline(source, data.columns);
                }

                for (let regionData of data) {
                    addSourceItem(map, source, regionData);
                }
                const sourceItem = store.getters["sources/getItemByProperty"](
                    "title",
                    source.key
                );
                store.commit("sources/updatePropertyOfItem", {
                    item: sourceItem,
                    property: "loaded",
                    value: true,
                });
                if (source.loadInitially) {
                    checkForEmptyData(map, source);
                }
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const checkForEmptyData = () => {
    for (const region of store.state.regions.all) {
        if (region.report.history.length === 0) {
            store.commit("regions/noData", region);
        }
    }
};

const addSourceItem = (map, source, regionData) => {
    const adapter = source.adapter;
    const titleKey = regionData[adapter.titleKey];
    if (store.state.regions.dict[titleKey]) {
        const region = store.state.regions.dict[titleKey];
        if (region) {
            let population;
            if (!map.settings.generalInfoHasPopulation) {
                const populationKey = adapter.hasOwnProperty("populationKey")
                    ? adapter.populationKey
                    : "population";
                population = numberTools.convertToNumber(
                    regionData[populationKey]
                );
                store.commit("regions/updatePropertyOfItem", {
                    item: region,
                    property: "population",
                    value: population,
                });
            } else {
                population = region.population;
            }
            const history = [];

            for (let timelineDay of timeline) {
                const regionDay = {
                    date: timelineDay.dateString,
                    offset: timelineDay.offset,
                    source: {},
                };
                const key = timelineDay.sourceKey;
                if (regionData[key]) {
                    let value = Number(regionData[key]);
                    if (source.percentage) {
                        // 9999 is the code for no info
                        if (value !== 9999) {
                            value = (value / 100) * population;
                        } else {
                            value = null;
                        }
                    }
                    regionDay.source[source.key] = value;
                }
                history.push(regionDay);
            }

            // correct for cumulative input
            if (source.cumulative) {
                const l = history.length;
                const correctedHistory = [];
                for (let i = 0; i < l; i++) {
                    const day = history[i];
                    if (i > 0) {
                        const dayBefore = history[i - 1];
                        const currentValue = day.source[source.key];
                        const dayBeforeValue = dayBefore.source[source.key];
                        const nettoValue = currentValue - dayBeforeValue;
                        correctedHistory.push(nettoValue);
                    } else {
                        correctedHistory.push(null);
                    }
                }
                for (let i = 0; i < l; i++) {
                    const day = history[i];
                    day.source[source.key] = correctedHistory[i];
                }
                // delete the first day, since its cumulative we dont know the netto value
                history.splice(0, 1);
            }

            if (region.report.history.length === 0) {
                store.commit("regions/updatePropertyOfItem", {
                    item: region,
                    property: "report",
                    value: { history },
                });
            } else {
                for (const historyDay of history) {
                    const regionDay = region.report.history.find(
                        (d) => d.offset === historyDay.offset
                    );
                    if (regionDay) {
                        regionDay.source[source.key] =
                            historyDay.source[source.key];
                    }
                }
            }
        } else {
            // console.log('not found ' + titleKey);
        }
    } else {
        if (titleKey.length > 0) {
            // console.log('not found ' + titleKey);
        }
    }
};

const constructTimeline = (source, columns) => {
    const adapter = source.adapter;
    let totalLengthOfTestHistory;
    for (let column of columns) {
        if (adapter.isValueColumn(column)) {
            const dateString = adapter.getDateFromColumn(column);
            timeline.push({
                sourceKey: column,
                dateString,
                ms: new Date(dateString).getTime(),
            });
        }
    }
    // sort to be sure the order is correct
    timeline = timeline.sort((a, b) =>
        a.ms > b.ms ? 1 : b.ms > a.ms ? -1 : 0
    );
    // remove the ms value afterwards
    timeline = timeline.map((day) => {
        const d = { ...day };
        delete d.ms;
        return d;
    });
    // add offset
    for (let day of timeline) {
        let offset = timeline.length - timeline.indexOf(day) - 1;
        day.offset = offset;
        dateTool.addDateOffset(day.dateString, offset);
    }

    // do some administration
    const last = timeline[timeline.length - 1];
    const today = new Date(last.dateString);

    if (source.cumulative) {
        // the first day will be deleted everywhere
        totalLengthOfTestHistory = timeline.length - 1;
    } else {
        totalLengthOfTestHistory = timeline.length;
    }

    store.commit("ui/updateProperty", {
        key: "todayInMs",
        value: today.getTime(),
    });
    store.commit("ui/updateProperty", { key: "today", value: today });
    store.commit("settings/updateProperty", {
        key: "historyLength",
        value: totalLengthOfTestHistory,
    });
    historyConstructed = true;
};
