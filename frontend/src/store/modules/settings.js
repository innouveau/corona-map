import _base from './_base-module';

const state = {
    zoom: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    mapRatio: 0.89,
    step: 10,
    weeks: 5, // weeks
    historyLength: 0,
    // currentDateOffset: 0,
    gradient: true,
    ageDistributionAbsolute: false
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}