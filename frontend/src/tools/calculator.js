import store from '@/store/store';


export const getDayForSource = (region, offset, source, ) => {
    const index = store.state.settings.historyLength - 1 - offset;
    // trigger the function to calculate the value in case it is a sum of childrens values
    getAbsoluteValueForDay(region, offset, source);
    return region.report.history[index];
}

const readCache = (region, start, end, source) => {
    const key = String(start + "-" + end);
    if (region.report.cache && region.report.cache[source] && region.report.cache[source].hasOwnProperty(key)) {
        return region.report.cache[source][key];
    } else {
        return false
    }
}

const writeCache = (region, start, end, source, value) => {
    if (!region.report.hasOwnProperty("cache")) {
        region.report.cache = {};
    }
    if (!region.report.cache.hasOwnProperty(source)) {
        region.report.cache[source] = {};
    }
    const key = String(start + "-" + end);
    region.report.cache[source][key] = value;
}

export const getAbsoluteCumulativeForPeriod = (region, start, end, source) => {
    const reportingDelay = getReportingDelay(region, start);
    const start_adj = reportingDelay > 0 ? start + reportingDelay : start;
    const end_adj = reportingDelay > 0 ? Math.min(end + reportingDelay, store.state.settings.historyLength - 1) : end;
    let totalValue = 0;
    const cachedValue = readCache(region, start_adj, end_adj, source);
    if (cachedValue !== false) {
        return cachedValue;
    } else {
        if (region.totalPopulation > 0) {
            for (let i = start_adj; i < end_adj; i++) {
                totalValue += getAbsoluteValueForDay(region, i, source);
            }
            writeCache(region, start_adj, end_adj, source, totalValue);
            return totalValue;
        } else {
            return 0;
        }
    }

}

export const getRelativeCumulativeForPeriod = (region, start, end, source) => {
    if (region.totalPopulation > 0) {
        const value = getAbsoluteCumulativeForPeriod(region, start, end, source);
        return value * 100000 / region.totalPopulation;
    } else {
        return 0;
    }
}

export const getRelativeValueForDay = (region, offset, source) => {
    if (region.totalPopulation > 0) {
        const value = getAbsoluteValueForDay(region, offset, source);
        return value * 100000 / region.totalPopulation;
    } else {
        return 0;
    }
}

export const getAbsoluteValueForDay = (region, offset, source, updateHistory = true) => {
    const index = store.state.settings.historyLength - 1 - offset;
    if (region.report.history[index] && region.report.history[index].source.hasOwnProperty(source)) {
        const day = region.report.history[index];
        const value = day.source[source];
        if (!isNaN(value)) {
            return value;
        } else {
            return 0;
        }
    } else {
        // todo
        return 0;
        // let dayValue = 0;
        // const children = region.regions;
        // for (const child of children) {
        //     if (child.report.history[index] && child.report.history[index].source.hasOwnProperty(source)) {
        //         const value = child.report.history[index].source[source];
        //         if (!isNaN(value)) {
        //             dayValue += value;
        //         }
        //     } else {
        //         //console.log("key is missing for " + region.title, offset);
        //     }
        // }
        // if (updateHistory) {
        //     if (!region.report.history[index]) {
        //         region.report.history[index] = {
        //             offset: 0,
        //             source: {}
        //         };
        //     }
        //     region.report.history[index].offset = offset;
        //     region.report.history[index].source[source] = dayValue;
        // }
        // return dayValue;
    }
}

export const getChangeOfType = (region, offset, daysBack, source) => {
    const periodNow = getAbsoluteCumulativeForPeriod(region, offset, (offset + daysBack), source, false);
    const periodBefore = getAbsoluteCumulativeForPeriod(region, (offset + daysBack), (offset + 2 * daysBack), source, false);
    return periodNow / periodBefore;
}

export const getReportingDelay = (region, offset) => {
    if (window.config.enableLateReportingCorrection && region.hasLateReporting && offset < 7) {
        let value = 0;
        let i = 0;
        while (value === 0 && i < 7) {
            value = getAbsoluteValueForDay(region, offset + i, "positiveTests");
            i++;
        }
        return i - 1;
    } else {
        return 0;
    }
}

// this can do the total report in one callstack
// other functions might trigger watchers on a region
// multiple times
export const getHistory = (region, source) => {
    // TODO
    return region.report.history;

    // // meaning it is a city
    // // (instead of an aggregated region like a province)
    // if (region === region.regions[0]) {
    //     return region.report.history;
    // } else {
    //     const values = [];
    //     const l = store.state.settings.historyLength;
    //     for (let i = 0; i < l; i++) {
    //         const offset = l - 1 - i;
    //         const v = getAbsoluteValueForDay(region, offset, source, false);
    //         values.push(v);
    //     }
    //     for (let i = 0; i < l; i++) {
    //         if (!region.report.history[i]) {
    //             region.report.history[i] = {};
    //         }
    //         region.report.history[i].offset = l - 1 - i;
    //         region.report.history[i].source[source] = values[i];
    //     }
    //     return region.report.history;
    // }
}


