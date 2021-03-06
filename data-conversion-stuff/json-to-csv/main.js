let url, keys, csv, replace;

url = './../../frontend/public/data/maps/nederland/cities.json';
keys = ['identifier', 'ggd_code', 'province_code', 'regio_title', 'safetyRegion_code', 'title', 'population'];
replace = ['Municipality_code', 'ggd_code', 'province_code', 'regio_title', 'safetyRegion_code', 'Municipality_name', 'population'];
csv = replace.join(',') + '\n';
csv += 'NA,NA,NA,NA,NA,"Nederland",0\n';


const loadFile = function() {
    $.getJSON(url, function( data ) {
        for (let city of data) {
            let row = keys.map(key => {
                if (key === 'population') {
                    return city[key];
                } else {
                    return '"' + city[key] + '"'
                }
            }).join(',');
            csv += row + '\n'
        }


        console.log(csv);
    });
};

loadFile();
