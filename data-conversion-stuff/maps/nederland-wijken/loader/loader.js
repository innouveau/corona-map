const regions = [];

const handleItems = (set) => {
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

    if (geometry.length === 1) {
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
    } else {
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
    }
    return paths;
}


const handleItem = (item) => {
    const identifier = item.id;
    const title = item.properties.statnaam;
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
