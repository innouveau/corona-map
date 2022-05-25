import _base from "./_base-module";

const state = {
    scale: 0,
    sizes: {
        container: {
            width: 0,
            height: 0,
        },
        canvas: {
            width: 0,
            height: 0,
        },
    },
    navigation: {
        zoom: 1,
        position: {
            x: 0,
            y: 0,
        },
    },
    panModus: false,
    mapRatio: 0.89,
    step: 10,
    weeks: 5, // weeks
    historyLength: 0,
    gradient: true,
    ageDistributionAbsolute: false,
};

const getters = {
    ..._base.getters,
};

const actions = {};

const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    },
    setSizeCanvas(state, size) {
        state.sizes.canvas.width = size.width;
        state.sizes.canvas.height = size.height;
    },
    setSizeContainer(state, size) {
        state.sizes.container.width = size.width;
        state.sizes.container.height = size.height;
    },
    setScale(state, scale) {
        state.scale = scale;
    },
    zoomIn(state) {
        state.navigation.zoom *= 1.1;
    },
    zoomOut(state) {
        state.navigation.zoom /= 1.1;
    },
    navigateUp(state) {
        state.navigation.position.y += 0.1;
    },
    navigateDown(state) {
        state.navigation.position.y -= 0.1;
    },
    navigateLeft(state) {
        state.navigation.position.x += 0.1;
    },
    navigateRight(state) {
        state.navigation.position.x -= 0.1;
    },
    resetNavigationZoom(state) {
        state.navigation.position.x = 0;
        state.navigation.position.y = 0;
        state.navigation.zoom = 1;
    },
    zoom(state, factor) {
        const min = 0.5;
        const max = 10;
        const result = state.navigation.zoom * factor;
        if (result >= min && result <= max) {
            state.navigation.zoom = result;
        } else {
            if (result < min) {
                state.navigation.zoom = min;
            } else if (result > max) {
                state.navigation.zoom = max;
            }
        }
    },
    move(state, delta) {
        state.navigation.position.x += delta.x;
        state.navigation.position.y += delta.y;
    },
    togglePanModus(state) {
        state.panModus = !state.panModus;
    },
    navigateTo(state, navigation) {
        state.navigation.position.x = navigation.position.x;
        state.navigation.position.y = navigation.position.y;
        state.navigation.zoom = navigation.zoom;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
