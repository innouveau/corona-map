$(document).ready(function() {
    $.ajax({
        url : "report-complete.txt",
        dataType: "text",
        success : function (result) {
            readText(result);
        }
    });
});

let regions = [];

function getRegion(title) {
    for (let region of regions) {
        if (region.title === title) {
            return region;
        }
    }
    return null;
}

function exportAsCsv(regions) {
    let csv = 'region,2020-10-31_total,2020-10-31_positive,2020-11-07_total,2020-11-07_positive\n';
    for (let region of regions) {
        csv += region.title + ',';
        csv += region.tests_1 + ',';
        csv += region.positive_1 + ',';
        csv += region.tests_2 + ',';
        csv += region.positive_2 + '\n';
    }
    console.log(csv);
}

function readText(result) {
    let lines, linesWithData;
    lines = result.split('\n');

    linesWithData = lines.filter(line => {
        let chunks, firstChunk;
        chunks = line.trim().split(/\s+/);
        firstChunk = chunks[0];
        return firstChunk.length > 0 && firstChunk !== 'RHQ' && isNaN(firstChunk);
    });

    for (let line of linesWithData) {
        let convertedLine, chunks, title, region,
            testsRound1, positiveRound1, testRound2, positiveRound2;
        convertedLine = line.trim().replace(/\s\s+/g, '\t');
        chunks = convertedLine.trim().split('\t');
        if (chunks.length > 1) {
            title = chunks[2];
            testsRound1 = Number(chunks[4]);
            positiveRound1 = Number(chunks[5]);
            testRound2 = Number(chunks[7]);
            positiveRound2 = Number(chunks[8]);

            if (title.indexOf('Bratislava') > -1) {
                title = 'Bratislava';
            }

            if (title.indexOf('Košice') > -1 && title !== 'Košice - okolie') {
                title = 'Košice';
            }

            if (isNaN(testsRound1)) {
                testsRound1 = 0;
            }
            if (isNaN(positiveRound1)) {
                positiveRound1 = 0;
            }
            if (isNaN(testRound2)) {
                testRound2 = 0;
            }
            if (isNaN(positiveRound2)) {
                positiveRound2 = 0;
            }

            region = getRegion(title);
            if (region) {
                region.tests_1 += testsRound1;
                region.positive_1 += positiveRound1;
                region.tests_2 += testRound2;
                region.positive_2 += positiveRound2;
            } else {
                regions.push({
                    title,
                    tests_1: testsRound1,
                    positive_1: positiveRound1,
                    tests_2: testRound2,
                    positive_2: positiveRound2
                })
            }
        }


    }
    exportAsCsv(regions);
}