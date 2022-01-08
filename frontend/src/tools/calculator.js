export const getIncreaseOfType = (parent, start, end, source, relative) => {
    let totalValue = 0;
    const regions = parent.regions;

    if (!parent.report) {
        parent.report = { history: [] };
    }
    for (let i = start; i < end; i++) {
        if (parent.report.history[i] && parent.report.history[i].hasOwnProperty(source)) {
            const day = parent.report.history[i];
            totalValue += day[source];
        } else {
            let dayValue = 0;
            for (const region of regions) {
                dayValue += region.report.history[i][source];
            }
            parent.report.history[i] = {};
            parent.report.history[i][source] = dayValue;
            totalValue += dayValue;
        }
    }
    return relative ? (totalValue * 100000 / parent.totalPopulation) : totalValue
}
