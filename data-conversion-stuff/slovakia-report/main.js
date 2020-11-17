$(document).ready(function() {
    $.ajax({
        url : "report-01.txt",
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

function readText(result) {
    let lines, linesWithData;
    lines = result.split('\n');
    linesWithData = lines.filter(line => {
        let chunks = line.trim().split(/\s+/);
        return !isNaN(chunks[0]);
    });

    for (let line of linesWithData) {
        let convertedLine, chunks, title, testsRound1, positiveRound1, region;
        convertedLine = line.trim().replace(/\s\s+/g, '\t');
        console.log(convertedLine);
        chunks = convertedLine.trim().split('\t');
        if (chunks.length > 1) {
            title = chunks[2];
            testsRound1 = Number(chunks[4]);
            positiveRound1 = Number(chunks[5].split(' ')[0]);
            region = getRegion(title);
            if (region) {
                region.tests += testsRound1;
                region.positive += positiveRound1;
            } else {
                regions.push({
                    title,
                    tests: testsRound1,
                    positive: positiveRound1
                })
            }
        }


    }
    console.log(regions);

}