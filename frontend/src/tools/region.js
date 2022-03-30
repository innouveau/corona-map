import store from "@/store/store";

export const childRegionToParent = (region, level) => {
    switch(level) {
        case 'district':
            return region;
        case 'city':
            return region;
        case 'ggd':
            return store.getters['ggds/getItemByProperty']('ggd_code', region.ggd_code, true);
        case 'safety-region':
            return store.getters['safetyRegions/getItemByProperty']('safetyRegion_code', region.safetyRegion_code, true);
        case 'province':
            return store.getters['provinces/getItemByProperty']('province_code', region.province_code, true);
        case 'country':
            return store.getters['countries/getItemById'](region.country_id);
    }
}

export const parentRegionToChild = (region) => {
    if (region.baseRegion) {
        return region;
    } else {
        return region.regions[0];
    }
}
