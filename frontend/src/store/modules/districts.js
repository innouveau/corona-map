import _base from './_base-module';
import District from '@/classes/region/District';

const state = {
    all: [],
    dict: {},
    current: null
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    init(state, set) {
        state.all = [];
        for (let item of set) {
            if (item) {
                let d = new District(item);
                state.all.push(d);
                state.dict[d.identifier] = d;
            }
        }
    },
    updatePropertyOfItem(state, payload) {
        _base.mutations.updatePropertyOfItem(state, payload.item, payload.property, payload.value);
    },
    setCurrent(state, item) {
        _base.mutations.setCurrent(state, item);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}