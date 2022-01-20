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

const getReferenceByIdentifier = (identifier) => {
    return window.oldSource.find(region => region.identifier === identifier);
}

const getReferenceByTitle = (title) => {
    return window.oldSource.find(region => region.title === title);
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

const getPropertiesForNewRegion = (title) => {
    switch (title) {
        case "Dijk en Waard":
            return getReferenceByTitle("Heerhugowaard");
        case "Land van Cuijk":
            return getReferenceByTitle("Boxmeer");
        case "Maashorst":
            return getReferenceByTitle("Landerd");
    }
}

const handleItem = (item) => {
    const identifier = item.properties.Municipality_code_2022;
    const title = item.properties.Municipality_name_2022;
    let reference = getReferenceByIdentifier(identifier);
    const region = {
        regionType: "city",
        country_id: 1,
        identifier,
        title,
        population: item.properties.population_2021MM10,
        paths: getPaths(item)
    }
    if (!reference) {
        reference = getPropertiesForNewRegion(title);
    }
    region.ggd_code = reference.ggd_code;
    region.safetyRegion_code = reference.safetyRegion_code;
    region.province_code = reference.province_code;
    regions.push(region);
}


handleItems(window.source.features)
