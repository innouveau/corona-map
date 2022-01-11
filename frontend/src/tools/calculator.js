import store from '@/store/store';

export const getCumulativeForPeriod = (region, start, end, source, relative) => {
    let totalValue = 0;
    if (!region.report) {
        region.report = { history: [] };
    }
    for (let i = start; i < end; i++) {
        totalValue += getAbsoluteValueForDay(region, i, source);
    }
    return relative ? (totalValue * 100000 / region.totalPopulation) : totalValue
}

export const getAbsoluteValueForDay = (region, offset, source) => {
    const index = store.state.settings.historyLength - offset;
    if (region.report.history[index] && region.report.history[index].hasOwnProperty(source)) {
        const day = region.report.history[index];
        return day[source];
    } else {
        let dayValue = 0;
        const children = region.regions;
        for (const child of children) {
            dayValue += child.report.history[index][source];
        }
        region.report.history[index] = {};
        region.report.history[index][source] = dayValue;
        return dayValue;
    }
}

export const getChangeOfType = (region, offset, daysBack, source) => {
    const periodNow = getCumulativeForPeriod(region, offset, (offset + daysBack), source, false);
    const periodBefore = getCumulativeForPeriod(region, (offset + daysBack), (offset + 2 * daysBack), source, false);
    return periodNow / periodBefore;
}


