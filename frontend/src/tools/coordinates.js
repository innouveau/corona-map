import store from '@/store/store';
import robinson from '@/tools/projections/robinson';


const project = function(point, settings) {
    let mapSettings, p, canvasSettings, shiftX, shiftY, x, y;
    mapSettings = store.state.maps.current.settings.map;
    canvasSettings = store.state.settings;
    if (mapSettings.projection && mapSettings.projection === 'robinson') {
        shiftX = canvasSettings.canvasWidth * (mapSettings.shiftX / 100);
        shiftY = canvasSettings.canvasHeight * (mapSettings.shiftY / 100);
        p = robinson.projectAbsolute(point.y, point.x, canvasSettings.canvasWidth, 1, shiftX, shiftY);
        x = (mapSettings.zoom * p.x) - (0.5 * canvasSettings.canvasWidth * (mapSettings.zoom - 1));
        y = (mapSettings.zoom * p.y)  - (0.5 * canvasSettings.canvasHeight * (mapSettings.zoom - 1));
        return [x, y];
    } else {
        return [getLeft(point.x, settings), getTop(point.y, settings)];
    }
};

const getLeft = function(longitude, settings) {
    const base = 0.5 * settings.width * settings.navigation.position.x;
    return (longitude - store.state.maps.current.settings.map.longitude) * store.state.maps.current.settings.map.stretch * settings.zoom * settings.navigation.zoom + base + settings.shiftX;
};

const getTop = function(latitude, settings) {
    const base = 0.5 * settings.height * settings.navigation.position.y
    const y = latitude - store.state.maps.current.settings.map.latitude;
    return base - y * settings.zoom * settings.navigation.zoom + settings.shiftY;
};

export default {
    project
}
