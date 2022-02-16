import districtToMunicipalityLookup from "./lookups/district-to-municipality.js";
import municipalityToGgdLookup from "./lookups/municipality-to-ggd.js";
import municipalityToSafetyRegionLookup from "./lookups/municipality-to-safety-region.js";
import municipalityToProvinceLookup from "./lookups/municipality-to-province.js";
import ggds from "./regions/ggds"
import safetyRegions from "./regions/safety-regions"
import provinces from "./regions/provinces"
import store from "@/store/store";

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
