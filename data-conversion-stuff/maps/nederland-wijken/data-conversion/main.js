const url = './../source/COVID-19_vaccinatiegraad_per_wijk_per_week.csv';

const regions = [];

const getRegion = (regionCode) => {
    return regions.find(region => region.regionCode === regionCode);
}

const print = (regions) => {
    const keys = ['regionCode', 'title', 'population'];
    const dates = regions[0].timeline.map(d => d.date)
    let csv = keys.join(', ') + ', ';
    csv += dates.join(', ') + '\n';
    for (const region of regions) {
        for (const key of keys) {
            csv += region[key] + ', ';
        }
        const values = [];
        for (const date of dates) {
            const day = region.timeline.find(d => d.date === date);
            if (day) {
                values.push(day.vaccinated);
            } else {
                values.push(" ");
            }
        }
        csv += values.join(", ") + "\n";
    }
    console.log(csv);
}

d3.csv(url)
    .then((data) => {
        for (const item of data) {
            const regionCode = item.Region_code;
            let region = getRegion(regionCode);
            if (!region) {
                region = {
                    regionCode,
                    title: item.Region_name,
                    population: Number(item.Populatie),
                    timeline: []
                }
                regions.push(region);
            }

            const getValue = (value) => {
                if (value === "<=5" || value === "999") {
                    return 0;
                } else {
                    return Number(value);
                }
            }
            const day = {
                date: item.Date_of_statistics,
                vaccinated: getValue(item.Coverage_primary_completed)
            }
            region.timeline.push(day);
        }
        // print(regions);
    })
    .catch((error) => {
        console.error(error);
    });
