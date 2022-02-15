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
    const multiplier = settings.map.stretch * settings.scale * settings.navigation.zoom;
    const center = 0.5 * settings.container.width;
    const relativePoint = longitude - settings.map.longitude;
    const translatedPoint = relativePoint * multiplier
    const shiftByNavigation = settings.navigation.position.x;
    return center + translatedPoint + shiftByNavigation;
    // settings.shiftPrint.x;
};

const getTop = function(latitude, settings) {
    const multiplier = settings.scale * settings.navigation.zoom;
    const center = 0.5 * settings.container.height;
    const relativePoint = latitude - settings.map.latitude;
    const translatedPoint = relativePoint * multiplier;
    const shiftByNavigation = settings.navigation.position.y;
    return center - translatedPoint + shiftByNavigation;
    //settings.shiftPrint.y;
};

export default {
    project
}
