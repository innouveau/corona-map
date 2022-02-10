const regions = [];

const handleItems = (set) => {
    console.log(set[0].geometry);
    for (const item of set) {
        handleItem(item);
    }
    print();
}

const print = () => {
    console.log(regions);
    console.log(JSON.stringify(regions));
}

const getPaths = (item) => {
    const geometry = item.geometry.coordinates;

    const paths = [];

    if (item.geometry.type === "MultiPolygon") {
        for (const area of geometry) {
            const set = [];
            for (const coordinate of area[0]) {
                set.push({
                    x: coordinate[0],
                    y: coordinate[1]
                })
            }
            paths.push(set);
        }
    } else {
        for (const area of geometry) {
            const set = [];
            for (const coordinate of area) {
                set.push({
                    x: coordinate[0],
                    y: coordinate[1]
                })
            }
            paths.push(set);
        }
    }


    return paths;
}


const handleItem = (item) => {
    const identifier = item.id;
    const title = item.properties.statnaam;
    if (title === "Ouddorp") {
        console.log(item.geometry);
    }
    const region = {
        regionType: "district",
        country_id: 1,
        identifier,
        title,
        population: 0,
        paths: getPaths(item)
    }
    // region.ggd_code = reference.ggd_code;
    // region.safetyRegion_code = reference.safetyRegion_code;
    // region.province_code = reference.province_code;
    regions.push(region);
}


handleItems(window.source.features)
