const regions = [];
const maps = {};

for (const region of window.regions) {
    const code = region.province_code;
    region.code = code;
    region.regionType = "province";
    maps[code] = region.paths;
    delete region.paths;
    delete region.province_code;
    regions.push(region);
}

console.log(maps);
console.log(JSON.stringify(maps));




