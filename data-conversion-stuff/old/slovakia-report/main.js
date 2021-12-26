let url, source;
url = 'reports/Tabulka-vysledkov-testovania-miest-a-obci-2.-3.-a-4.-kolo-porovnani....csv';
source = '../../public/data/maps/slovakia/positive-antigen-tests.csv';

d3.csv(url)
    .then((newData) => {
        d3.csv(source)
            .then((sourceData) => {
                addNewData(newData, sourceData);
            })
            .catch((error) => {
                console.error(error);
            });
        // let csv = '';
        // for (let item of data) {
        //     if (regions.indexOf(item[titleKey]) > -1) {
        //         let title;
        //         title = item[titleKey];
        //         csv += title + ',';
        //         for (let key in item){
        //             if (key !== titleKey) {
        //                 let time = new Date(key).getTime();
        //                 if (time >= dateStart && time <= dateEnd) {
        //                     csv += Number(item[key]) + ',';
        //                 }
        //             }
        //         }
        //     }
        //     csv = csv.slice(0, -1);
        //     csv += '\n';
        // }
        // console.log(csv);

    })
    .catch((error) => {
        console.error(error);
    });

function getRegion(sourceData, regionTitle) {
    for (let region of sourceData) {
        if (region.region === regionTitle) {
            return region;
        }
    }
    return null;
}

function addNewData(newData, sourceData) {
    //console.log(sourceData);
    for (let item of newData) {
        let region = getRegion(sourceData, item.Okres);
        if (region) {
            let positive, total, pct;
            // 4c is for round 4, c is total (a = residents, b = non-residents)
            positive = Number(item['poz4c']);
            total = Number(item['test4c']);
            pct = Number(item['% poz4c'].slice(0, -1).replace(/,/g, '.'));
            if (!region.added) {
                region['2020-11-21_positive'] = positive;
                region['2020-11-21_total'] = total;
                region.added = true;
            } else {
                region['2020-11-21_positive'] += positive;
                region['2020-11-21_total'] += total;
            }

            // check on percentage
            if (Math.round(10000 * positive / total) / 100 !== pct) {
                //console.log(positive, total, pct);
            }
        } else {
            //console.warn('Region with title ' + item.Okres + ' not found');
        }
    }
    exportAsCSV(sourceData);
}

function exportAsCSV(data) {
    console.log(data);
    let cols, csv;
    cols = ['region','2020-10-24_total','2020-10-24_positive', '2020-10-31_total','2020-10-31_positive','2020-11-07_total','2020-11-07_positive','2020-11-21_total','2020-11-21_positive'];

    csv = cols.join(',') + '\n';
    for (let region of data) {
        for (let col of cols) {
            if (region[col]) {
                csv += region[col];
            } else {
                csv += '0';
            }
            if (cols.indexOf(col) === cols.length - 1) {
                csv += '\n';
            } else {
                csv += ',';
            }
        }
    }
    console.log(csv);
}