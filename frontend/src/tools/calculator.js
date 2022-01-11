export const getIncreaseOfType = (region, start, end, source, relative) => {
    let totalValue = 0;
    const children = region.regions;

    if (!region.report) {
        region.report = { history: [] };
    }
    for (let i = start; i < end; i++) {
        if (region.report.history[i] && region.report.history[i].hasOwnProperty(source)) {
            const day = region.report.history[i];
            totalValue += day[source];
        } else {
            let dayValue = 0;
            for (const child of children) {
                dayValue += child.report.history[i][source];
            }
            region.report.history[i] = {};
            region.report.history[i][source] = dayValue;
            totalValue += dayValue;
        }
    }
    return relative ? (totalValue * 100000 / region.totalPopulation) : totalValue
}


