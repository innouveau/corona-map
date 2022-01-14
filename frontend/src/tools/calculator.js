import store from '@/store/store';


export const getDayForSource = (region, offset, source) => {
    const index = store.state.settings.historyLength - offset;
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
    let totalValue = 0;
    const cachedValue = readCache(region, start, end, source);
    if (cachedValue !== false) {
        return cachedValue;
    } else {
        if (region.totalPopulation > 0) {
            for (let i = start; i < end; i++) {
                totalValue += getAbsoluteValueForDay(region, i, source);
            }
            writeCache(region, start, end, source, totalValue);
            return totalValue;
        } else {
            return 0;
        }
    }

}

export const getRelativeCumulativeForPeriod = (region, start, end, source) => {
    const value = getAbsoluteCumulativeForPeriod(region, start, end, source);
    return value * 100000 / region.totalPopulation
}

export const getRelativeValueForDay = (region, offset, source) => {
    const value = getAbsoluteValueForDay(region, offset, source);
    return value * 100000 / region.totalPopulation
}

export const getAbsoluteValueForDay = (region, offset, source) => {
    const index = store.state.settings.historyLength - offset;
    if (region.report.history[index] && region.report.history[index].hasOwnProperty(source)) {
        const day = region.report.history[index];
        const value = day[source]
        if (!isNaN(value)) {
            return value;
        } else {
            return 0;
        }
    } else {
        let dayValue = 0;
        const children = region.regions;
        for (const child of children) {
            if (child.report.history[index] && child.report.history[index].hasOwnProperty(source)) {
                const value = child.report.history[index][source];
                if (!isNaN(value)) {
                    dayValue += value;
                }
            } else {
                //console.log("key is missing for " + region.title, offset);
            }
        }
        if (!region.report.history[index]) {
            region.report.history[index] = {};
        }
        region.report.history[index].offset = offset;
        region.report.history[index][source] = dayValue;
        return dayValue;
    }
}

export const getChangeOfType = (region, offset, daysBack, source) => {
    const periodNow = getAbsoluteCumulativeForPeriod(region, offset, (offset + daysBack), source, false);
    const periodBefore = getAbsoluteCumulativeForPeriod(region, (offset + daysBack), (offset + 2 * daysBack), source, false);
    return periodNow / periodBefore;
}

export const hasLateReporting = (region, offset) => {

}


