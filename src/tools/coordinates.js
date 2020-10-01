import store from '@/store/store';

const getLeft = function(longitude, latitude, settings) {
    //let bend = 1 - (0.005 * Math.abs(latitude));
    let bend = 1;
    return (longitude - store.state.maps.current.settings.map.longitude) * store.state.maps.current.settings.map.stretch * settings.zoom * bend + (0.5 * settings.width) + settings.shiftX;
};

const getTop = function(longitude, latitude, settings) {
    return (0.5 * settings.height) - (latitude - store.state.maps.current.settings.map.latitude) * settings.zoom + settings.shiftY;
};

export default {
    getLeft,
    getTop
}