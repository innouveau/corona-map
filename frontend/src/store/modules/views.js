import _base from "./_base-module";
import View from "@/classes/View";

const Model = View;

const state = {
    all: [],
    current: null,
};

const getters = {
    ..._base.getters,
};

const actions = {};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    updatePropertyOfItem(state, payload) {
        _base.mutations.updatePropertyOfItem(
            state,
            payload.item,
            payload.property,
            payload.value
        );
    },
    setCurrent(state, item) {
        _base.mutations.setCurrent(state, item);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
