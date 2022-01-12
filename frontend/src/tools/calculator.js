import store from '@/store/store';


export const getDayForSource = (region, offset, source) => {
    const index = store.state.settings.historyLength - offset;
    // trigger the function to calculate the value in case it is a sum of childrens values
    getAbsoluteValueForDay(region, offset, source);
    return region.report.history[index];
}

export const getAbsoluteCumulativeForPeriod = (region, start, end, source) => {
    let totalValue = 0;
    if (region.totalPopulation > 0) {
        for (let i = start; i < end; i++) {
            totalValue += getAbsoluteValueForDay(region, i, source);
        }
        return totalValue;
    } else {
        return 0;
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
        region.report.history[index] = {};
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


