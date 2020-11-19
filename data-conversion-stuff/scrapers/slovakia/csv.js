const csv = require('csv-parser');
const fs = require('fs');
const currentFile = '../../../public/data/maps/slovakia/positive-pcr-tests.csv';
const titleKey = 'Land/regio';
let data = [];

const getItemByDate = function(date) {
    return data.find(item => item.date === date);
};

const addValue = function(title, date, value) {
    let item = getItemByDate(date);
    if (item) {
        item.entries.push({
            title,
            value
        })
    } else {
        data.push({
            date,
            entries: [{
                title,
                value
            }]
        })
    }
};

fs.createReadStream(currentFile)
    .pipe(csv())
    .on('data', (row) => {
        let title, date, value;
        title = row[titleKey];
        for (let key in row) {
            if (key !== titleKey) {
                date = key;
                value = row[key];
                addValue(title, date, value);
            }
        }
    })
    .on('end', () => {
        console.log(data);
    });