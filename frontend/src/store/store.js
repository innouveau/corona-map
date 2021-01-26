import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import languages from './modules/languages';
import sources from './modules/sources';
import signalingSystems from './modules/signaling-systems';
import maps from './modules/maps';
import stories from './modules/stories';
import views from './modules/views';
import countries from './modules/countries';
import cities from './modules/cities';
import districts from './modules/districts';
import ggds from './modules/ggds';
import safetyRegions from './modules/safety-regions';
import provinces from './modules/provinces';
import regios from './modules/regios';
import sewageTreatmentPlants from './modules/sewage-treatment-plants';
import ageGroups from './modules/age-groups';
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
        languages,
        signalingSystems, sources,
        maps, stories, views,
        countries, cities, districts, ggds, safetyRegions, provinces, regios,
        sewageTreatmentPlants,
        ageGroups,
        settings, ui
    }

});

window.store = store;

export default store
