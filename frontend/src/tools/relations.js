import districtToMunicipalityLookup from "@/data/relations/lookups/district-to-municipality";
import municipalityToGgdLookup from "@/data/relations/lookups/municipality-to-ggd";
import municipalityToSafetyRegionLookup from "@/data/relations/lookups/municipality-to-safety-region";
import municipalityToProvinceLookup from "@/data/relations/lookups/municipality-to-province";
import ggds from "@/data/relations/regions/ggds"
import safetyRegions from "@/data/relations/regions/safety-regions"
import provinces from "@/data/relations/regions/provinces"
import ggdPaths from "@/data/relations/paths/ggds";
import safetyRegionPaths from "@/data/relations/paths/safety-regions";
import provincePaths from "@/data/relations/paths/provinces";

import store from "@/store/store";

export const getRegions = (regionType) => {
    switch(regionType) {
        case "ggd":
            return ggds;
        case "safety-region":
            return safetyRegions;
        case "province":
            return provinces;
    }
}

export const getPathsForRegion = (region) => {
    let lookup
    switch(region.regionType) {
        case "ggd":
            lookup = ggdPaths;
            break;
        case "safety-region":
            lookup = safetyRegionPaths;
            break;
        case "province":
            lookup = provincePaths;
            break;
    }
    return lookup[region.code];
}

export const districtToMunicipality = (districtCode) => {
    const municipalityCode = districtToMunicipalityLookup[districtCode];
    if (municipalityCode) {
        return store.getters["cities/getItemByProperty"]("identifier", municipalityCode);
    }
}

export const municipalityToRelation = (code, regionType) => {
    let regions;
    const relationCode = municipalityToRelationCode(code, regionType);
    switch(regionType) {
        case "ggd":
            regions = ggds;
            break;
        case "safety-region":
            regions = safetyRegions;
            break;
        case "province":
            regions = provinces;
            break;
    }
    return regions.find((region) => region.code === relationCode);
}

const municipalityToRelationCode = (code, regionType) => {
    switch(regionType) {
        case "ggd":
            return municipalityToGgdLookup[code];
        case "safety-region":
            return municipalityToSafetyRegionLookup[code];
        case "province":
            return municipalityToProvinceLookup[code];
    }
}
