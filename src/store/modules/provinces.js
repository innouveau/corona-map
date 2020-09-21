import _base from './_base-module';
import Province from '@/classes/Province';

const Model = Province;


const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    updatePropertyOfItem(state, payload) {
        _base.mutations.updatePropertyOfItem(state, payload.item, payload.property, payload.value);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}