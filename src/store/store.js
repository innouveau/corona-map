import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import cities from './modules/cities';
import ggds from './modules/ggds';
import safetyRegions from './modules/safety-regions';
import sewageTreatmentPlants from './modules/sewage-treatment-plants';
import settings from './modules/settings';
import ui from './modules/ui';

const state = {
    dataLoaded: false
};
const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {
        cities, ggds, safetyRegions, sewageTreatmentPlants,
        settings, ui
    }

});

window.store = store;

export default store
