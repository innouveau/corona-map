import districtToMunicipalityLookup from "@/data/relations/lookups/district-to-municipality";
import municipalityToGgdLookup from "@/data/relations/lookups/municipality-to-ggd";
import municipalityToSafetyRegionLookup from "@/data/relations/lookups/municipality-to-safety-region";
import municipalityToProvinceLookup from "@/data/relations/lookups/municipality-to-province";
import municipalities from "@/data/relations/regions/municipalities";
import ggds from "@/data/relations/regions/ggds";
import safetyRegions from "@/data/relations/regions/safety-regions";
import provinces from "@/data/relations/regions/provinces";
import countries from "@/data/relations/regions/countries";
import municipalityPaths from "@/data/relations/paths/municipalities";
import ggdPaths from "@/data/relations/paths/ggds";
import safetyRegionPaths from "@/data/relations/paths/safety-regions";
import provincePaths from "@/data/relations/paths/provinces";
import countryPaths from "@/data/relations/paths/countries";

import store from "@/store/store";

export const getCurrentRegion = (baseRegion) => {
    return getRegionFromBaseRegion(
        baseRegion,
        store.state.ui.currentRegionType
    );
};

export const getRegionFromBaseRegion = (baseRegion, regionType) => {
    let municipalityCode;
    const baseType = store.state.maps.current.settings.regionTypes[0];
    if (regionType === baseType) {
        return baseRegion;
    } else {
        if (baseType === "municipality") {
            municipalityCode = baseRegion.code;
        } else {
            municipalityCode = districtToMunicipalityLookup[baseRegion.code];
        }
        if (regionType === "municipality") {
            return municipalities.find((m) => m.code === municipalityCode);
        } else {
            let code;
            switch (regionType) {
                case "ggd":
                    code = municipalityToGgdLookup[municipalityCode];
                    return ggds.find((r) => r.code === code);
                case "safety-region":
                    code = municipalityToSafetyRegionLookup[municipalityCode];
                    return safetyRegions.find((r) => r.code === code);
                case "province":
                    code = municipalityToProvinceLookup[municipalityCode];
                    return provinces.find((r) => r.code === code);
                case "country":
                    return countries[0];
            }
        }
    }
};

export const getBaseRegions = (region, regionType) => {
    const baseType = store.state.maps.current.settings.regionTypes[0];
    const regions = [];
    let codes = [];

    if (baseType === regionType) {
        return [region];
    } else {
        if (regionType === "country") {
            return store.state.regions.all;
        } else if (regionType === "municipality") {
            for (const key in districtToMunicipalityLookup) {
                if (districtToMunicipalityLookup[key] === region.code) {
                    codes.push(key);
                }
            }
        } else {
            let lookup;
            const municipalityCodes = [];
            switch (regionType) {
                case "ggd":
                    lookup = municipalityToGgdLookup;
                    break;
                case "safety-region":
                    lookup = municipalityToSafetyRegionLookup;
                    break;
                case "province":
                    lookup = municipalityToProvinceLookup;
                    break;
            }
            for (const key in lookup) {
                if (lookup[key] === region.code) {
                    municipalityCodes.push(key);
                }
            }
            if (baseType === "municipality") {
                codes = municipalityCodes;
            } else {
                for (const key in districtToMunicipalityLookup) {
                    for (const municipalityCode of municipalityCodes) {
                        if (
                            districtToMunicipalityLookup[key] ===
                            municipalityCode
                        ) {
                            codes.push(key);
                        }
                    }
                }
            }
        }
        for (const code of codes) {
            const region = store.state.regions.dict[code];
            if (region) {
                regions.push(region);
            }
        }
        return regions;
    }
};

export const getRegions = (regionType) => {
    const baseType = store.state.maps.current.settings.regionTypes[0];
    if (baseType === regionType) {
        return store.state.regions.all;
    } else {
        switch (regionType) {
            case "municipality":
                return municipalities;
            case "ggd":
                return ggds;
            case "safety-region":
                return safetyRegions;
            case "province":
                return provinces;
            case "country":
                return countries;
        }
    }
};

export const getPathsForRegion = (region) => {
    let lookup;
    switch (region.regionType) {
        case "municipality":
            lookup = municipalityPaths;
            break;
        case "ggd":
            lookup = ggdPaths;
            break;
        case "safety-region":
            lookup = safetyRegionPaths;
            break;
        case "province":
            lookup = provincePaths;
            break;
        case "country":
            lookup = countryPaths;
            break;
    }
    return lookup[region.code];
};
