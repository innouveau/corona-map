const regions = [];

for (const item of window.regions) {
    const region = { ...item };
    region.regionType = "ggd";
    region.childType = "municipality";
    region.relationId = item.ggd_code;
    delete relation.ggd_code;
    regions.push(region);
}

console.log(regions);
console.log(JSON.stringify(regions));
