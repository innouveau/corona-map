import _base from './_base-module';
import Map from '@/classes/Map';

const Model = Map;


const state = {
    all: [],
    current: null,
    navigation: {
        zoom: 1,
        position: {
            x: 1,
            y: 1
        }
    }
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
    },
    setCurrent(state, item) {
        _base.mutations.setCurrent(state, item);
    },
    zoomIn(state) {
        state.navigation.zoom *= 1.1;
    },
    zoomOut(state) {
        state.navigation.zoom /= 1.1;
    },
    up(state) {
        state.navigation.position.y *= 1.1;
    },
    down(state) {
        state.navigation.position.y /= 1.1;
    },
    left(state) {
        state.navigation.position.x *= 1.1;
    },
    right(state) {
        state.navigation.position.x /= 1.1;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
