w$.getJSON('europa.json', function( data ) {
    let regions = [];
    let keys = ['FI', 'SE', "UK", "NO", "IT"];
    for (let item of data) {
        for (let key of keys) {
            if (item.nutsCode.indexOf(key) > -1) {
                regions.push(item);
            }
        }
    }
    console.log(regions);
    console.log(JSON.stringify(regions));
});
