const puppeteer = require('puppeteer');

const csv = require('csv-parser');
const fs = require('fs');
const currentFile = '../../../frontend/public/data/maps/slovakia/positive-pcr-tests.csv';
const titleKey = 'Land/regio';
let scrolled = false;

let browser, page, url, data, titlesSelector, valuesSelector,
    dateInputSelectorStart, dateInputSelectorEnd, currentDate, today;

url = 'https://app.powerbi.com/view?r=eyJrIjoiNDUwMDc4YjgtYjEyYS00YzlhLWI1MzktMzhlMTczYmY0YjVjIiwidCI6IjMxMGJhNTk1LTAxM2MtNDAyZC05ZWYyLWI1N2Q1ZjFkY2Q2MyIsImMiOjl9';
data = [];
currentDate = new Date('2020-11-22');

// removes the hours and minutes
today = new Date(getDateString(new Date(), false));

// selectors
titlesSelector = 'visual-container-repeat visual-container-modern:nth-child(3) visual-modern .bodyCells > div > div > div:nth-child(1) .pivotTableCellWrap';
valuesSelector = 'visual-container-repeat visual-container-modern:nth-child(3) visual-modern .bodyCells > div > div > div:nth-child(2) .pivotTableCellWrap';
dateInputSelectorStart = 'visual-container-repeat visual-container-modern:nth-child(9) .vcBody visual-modern .slicer-content-wrapper .date-slicer-head .date-slicer-range .date-slicer-control:nth-child(1) input';
dateInputSelectorEnd = 'visual-container-repeat visual-container-modern:nth-child(9) .vcBody visual-modern .slicer-content-wrapper .date-slicer-head .date-slicer-range .date-slicer-control:nth-child(2) input';

const readTimeFrame = async function() {
    let timeFrame, titlesElements, valuesElements, dateString, scrolls;
    dateString = getDateString(currentDate, false);
    console.log('Reading time frame: ' + dateString);
    timeFrame = {
        date: dateString,
        entries: []
    };

    // enter date
    await enterDateToInput(currentDate);
    await page.waitForTimeout(5000);

    // Power BI adds and removes divs with content while scrolling
    scrolls = [0, 30, 60, 90, 1];

    for (let i = 0, l = scrolls.length; i < l; i++) {
        await scrollPage(scrolls, i);
        await page.waitForTimeout(500);


        titlesElements = await page.$$(titlesSelector);
        valuesElements = await page.$$(valuesSelector);
        for (let titlesElement of titlesElements) {
            let title, index, valueElement, value;
            index = titlesElements.indexOf(titlesElement);
            valueElement = valuesElements[index];
            title = await page.evaluate(titlesElement => titlesElement.textContent, titlesElement);
            value = await page.evaluate(valueElement => valueElement.textContent, valueElement);

            function doesExist(title) {
                for (let entry of timeFrame.entries) {
                    if (entry.title === title) {
                        return true;
                    }
                }
                return false;
            }
            // because of the weird scrolling thing by BI we dont know really
            // which rows we select. Therefor we scroll a little bit each time and
            // check if we didnt added the title already
            if (!doesExist(title)) {
                timeFrame.entries.push({
                    title,
                    value
                });
            }
        }
    }

    console.log('Number of cities: ' + timeFrame.entries.length);
    data.push(timeFrame);
    addDayToDate();
    if (currentDate.getTime() < today.getTime()) {
        await readTimeFrame();
    } else {
        isReady();
    }
};

enterDateToInput = async function(date) {
    let dateStringForUi;
    dateStringForUi = getDateString(date, true);
    await page.click(dateInputSelectorEnd);
    await page.$eval(dateInputSelectorEnd, (el) => el.value = '');
    await page.focus(dateInputSelectorEnd);
    await page.keyboard.press('Backspace');
    await page.keyboard.type(dateStringForUi);
    await page.keyboard.press('Enter');
    // click outside input to hide the popup
    await page.mouse.move(140, 210);
    await page.mouse.down();
    await page.mouse.up();
    //await page.mouse.click();
};

const scrollPage = async function(scrolls, index) {
    let x, y, previous, scroll;
    x = 184;
    y = 310;
    scroll = scrolls[index];
    if (index > 0) {
        previous = scrolls[index - 1];
    } else {
        previous = 0;
    }
    await page.mouse.move(x, (y + previous));
    await page.mouse.down();
    await page.mouse.move(x, (y + scroll));
    await page.mouse.up();
    scrolled = true;
};

function getDateString (date, forUi) {
    let d, m, y;
    d = date.getDate();
    m = date.getMonth() + 1;
    y = date.getFullYear();
    if (!forUi) {
        if (d < 10) {
            d = '0' + d;
        }
        if (m < 10) {
            m = '0' + m;
        }
    }
    if (forUi) {
        return d + '/' + m + '/' + y;
    } else {
        return y + '-' + m + '-' + d;
    }
}

function isReady() {
    let csv, regions, lastEntry;
    lastEntry = data[data.length - 1];
    regions = lastEntry.entries.map(entry => entry.title);
    csv = '';
    csv += 'Land/regio,';
    csv += data.map(i => i.date).join(',') + '\n';
    for (let region of regions) {
        let line, values;
        values = [];
        line = region + ',';
        for (let item of data) {
            let entry = item.entries.find(e => e.title === region);
            if (entry) {
                values.push(entry.value);
            } else {
                values.push(0);
            }
        }
        line += values.join(',');
        line += '\n';
        csv += line;
    }

    console.log('ready\n');
    console.log(csv);
    console.log('\n\n');
    browser.close();
}

const addDayToDate = function() {
    let d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    currentDate = d;
};

const scrape = function() {
    (async () => {
        console.log('start');
        browser = await puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        });

        page = await browser.newPage();
        await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });
        await page.goto(url);
        await page.waitForTimeout(5000);


        await readTimeFrame();
    })();
};



// csv reading

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
        scrape();
    });

