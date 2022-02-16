import _base from './_base-module';
import Region from '@/classes/region/Region';
import { getRegions } from "@/tools/relations"

const state = {
    all: [],
    dict: {},
    current: null
};

const getters = {
    ..._base.getters,
    regionsForRegionType(state, getters, rootState) {
        // the base setting
        if (rootState.ui.currentRegionType === rootState.maps.current.settings.regionTypes[0]) {
            return state.all;
        } else {
            return getRegions(rootState.ui.currentRegionType);
        }
    },
};

const actions = {};

const mutations = {
    init(state, set) {
        state.all = [];
        for (const item of set) {
            const region = new Region(item);
            state.all.push(region);
            state.dict[region.code] = region;
        }
    },
    updatePropertyOfItem(state, payload) {
        _base.mutations.updatePropertyOfItem(state, payload.item, payload.property, payload.value);
    },
    setCurrent(state, item) {
        _base.mutations.setCurrent(state, item);
    },
    delete(state, item) {
        _base.mutations.delete(state, item);
    },
    noData(state, item) {
        _base.mutations.updatePropertyOfItem(state, item, "noData", true);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
