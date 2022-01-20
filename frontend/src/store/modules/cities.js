import _base from './_base-module';
import City from '@/classes/region/City';

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
                let c = new City(item);
                state.all.push(c);
                state.dict[c.identifier] = c;
            }
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
