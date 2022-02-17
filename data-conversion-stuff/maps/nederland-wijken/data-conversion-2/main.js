const regions = [];
const maps = {};

for (const region of window.regions) {
    const code = region.identifier;
    region.code = code;
    region.regionType = "municipality";
    maps[code] = region.paths;
    delete region.paths;
    delete region.ggd_code;
    delete region.province_code;
    delete region.country_id;
    delete region.safetyRegion_code;
    delete region.identifier;
    regions.push(region);
}

console.log(maps);
console.log(JSON.stringify(maps));




