import store from '@/store/store';

const getLeft = function(longitude, settings, view) {
    // Parent mapsettings can overrule the Map mapsettings
    let mapSettings, zoom;
    zoom = view.parent ? (settings.zoom / store.state.maps.current.settings.map.zoom * view.parent.map.zoom) : settings.zoom;
    mapSettings = view.parent ? view.parent.map : store.state.maps.current.settings.map;
    return (longitude - mapSettings.longitude) * mapSettings.stretch * zoom + (0.5 * settings.width) + settings.shiftX;
};

const getTop = function(latitude, settings, view) {
    let mapSettings, zoom;
    mapSettings = view.parent ? view.parent.map : store.state.maps.current.settings.map;
    zoom = view.parent ? (settings.zoom / store.state.maps.current.settings.map.zoom * view.parent.map.zoom) : settings.zoom;
    return (0.5 * settings.height) - (latitude - mapSettings.latitude) * zoom + settings.shiftY;
};

export default {
    getLeft,
    getTop
}