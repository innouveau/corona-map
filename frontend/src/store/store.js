import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import languages from './modules/languages';
import sources from './modules/sources';
import signalingSystems from './modules/signaling-systems';
import maps from './modules/maps';
import stories from './modules/stories';
import views from './modules/views';
import regions from './modules/regions';
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
        regions,
        sewageTreatmentPlants,
        ageGroups,
        settings, ui
    }

});

window.store = store;

export default store
