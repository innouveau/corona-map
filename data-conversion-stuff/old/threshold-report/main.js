let url, mainThreshold, reportThresholds;

url = 'https://raw.githubusercontent.com/mzelst/covid-19/master/data/municipality-totals.csv';
mainThreshold = 50;
reportThresholds = [0, 5,10,15,20,25,30,35,40,45];


d3.csv(url)
    .then((data) => {
        let reports = 'city, first time main threshold,';
        for (let threshold of reportThresholds) {
            reports += threshold + ',';
        }
        reports += '\n';

        for (let item of data) {
            if (item.Municipality_name === 'Delfzijl') {
                let report = analyseCity(item);
                if (report) {
                    reports += report;
                }
            }

        }
        console.log(reports);
    })
    .catch((error) => {
        console.error(error);
    });


function analyseCity(item) {
    let city, population, dates, firstMainThresholdIndex, report;
    city = item.Municipality_name;
    report = city + ',';
    population = Number(item.population);
    dates = [];
    for (let key in item) {
        if (key.indexOf('Total_reported.') > -1) {
            let date, chunks, month, value, previous;
            date = key.slice(-10);
            chunks = date.split('-');
            month = Number(chunks[1]);
            if (month > 5) {
                value = Number(item[key]);
                if (dates.length > 0) {
                    previous = dates[dates.length - 1].totalCases;
                } else {
                    previous = item['Total_reported.2020-05-31'];
                }
                dates.push({
                    date,
                    totalCases: value,
                    newCases: value - previous
                });
            }
        }
    }
    firstMainThresholdIndex = findFirstThreshold(dates, population, mainThreshold);
    if (firstMainThresholdIndex) {
        let datesBeforeThreshold = dates.slice(0, (firstMainThresholdIndex + 1));
        report += dates[firstMainThresholdIndex].date + ',';
        report.mainThreshold = dates[firstMainThresholdIndex].date;
        report.history = [];
        for (let threshold of reportThresholds) {
            let index = findLastThreshold(datesBeforeThreshold, population, threshold);
            report += (firstMainThresholdIndex - index) + ','
        }
        report += '\n';
        return report
    } else {
        return null;
    }
}


function findFirstThreshold(dates, population, threshold) {
    let correctedThreshold, set;
    correctedThreshold = threshold * population / 100000;
    set = [];
    for (let date of dates) {
        set.push(date.newCases);
        if (set.length > 7) {
            set.shift();
        }
        let total = count(set);
        if (total > correctedThreshold) {
            return dates.indexOf(date);
        }
    }
    return null;
}

function findLastThreshold(dates, population, threshold) {
    let correctedThreshold, nextThreshold, correctedNextThreshold, set, lastIndex, thresholdIndex;
    lastIndex = null;
    thresholdIndex = reportThresholds.indexOf(threshold);
    if (thresholdIndex < reportThresholds.length) {
        nextThreshold =  reportThresholds[thresholdIndex + 1];
        correctedNextThreshold = nextThreshold * population / 100000;
    }

    correctedThreshold = threshold * population / 100000;

    set = [];
    for (let date of dates) {
        set.push(date.newCases);
        if (set.length > 7) {
            set.shift();
        }
        let total = count(set);
        if (total > correctedThreshold && (total < correctedNextThreshold || !nextThreshold)) {
            lastIndex = dates.indexOf(date);
        }
    }

    return lastIndex;
}

function count(set) {
    let n = 0;
    for (let item of set) {
        n += item;
    }
    return n;
}



