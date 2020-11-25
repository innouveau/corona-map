let url = 'https://raw.githubusercontent.com/Datagraver/Covid-19-base/main/cases.csv';

let regions = ['Podkarpackie', 'Małopolskie', 'Śląskie', 'Moravian-Silesian Region', 'Zlin Region', 'Olomouc Region', 'South Moravian Region', 'Niederösterreich', 'Nógrád', 'Borsod-Abaúj-Zemplén', 'Szabolcs-Szatmár-Bereg', 'Komárom-Esztergom', 'Győr-Moson-Sopron', 'Burgenland', 'Pest', 'Hajdú-Bihar', 'Heves'];
let titleKey = 'Land/regio';
let dateStart = new Date('2020-07-01').getTime();
let dateEnd = new Date('2020-11-21').getTime();

d3.csv(url)
    .then((data) => {
        let csv = '';
        for (let item of data) {
            if (regions.indexOf(item[titleKey]) > -1) {
                let title;
                title = item[titleKey];
                csv += title + ',';
                for (let key in item){
                    if (key !== titleKey) {
                        let time = new Date(key).getTime();
                        if (time >= dateStart && time <= dateEnd) {
                            csv += Number(item[key]) + ',';
                        }
                    }
                }
            }
            csv = csv.slice(0, -1);
            csv += '\n';
        }
        console.log(csv);

    })
    .catch((error) => {
        console.error(error);
    });