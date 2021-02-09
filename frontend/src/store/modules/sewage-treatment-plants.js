import _base from './_base-module';
import SewageTreatmentPlant from '@/classes/SewageTreatmentPlant';



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
                let s = new SewageTreatmentPlant(item);
                state.all.push(s);
                state.dict[s.sewageTreatementPlant_id] = s;
            }
        }
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