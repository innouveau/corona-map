
let url = 'data/a/source-total.csv';

let dict = {};


d3.csv(url)
    .then((data) => {
        for (let item of data) {
            let postcode = item.postcode.split(' ')[0];
            if (!dict[postcode]) {
                dict[postcode] = {
                    postcode,
                    city: item.gemeente,
                    city_code: Number(item.code)
                }
            }
        }
        console.log(JSON.stringify(dict));
    })
    .catch((error) => {
        console.error(error);
    });