import store from '@/store/store';
import changeTools from '@/tools/change';

const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#f5eedc';
    ctx.fill();
};

const draw = function(ctx, source, regionContainers, settings, offset, mapType = 'signaling', border = true) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = settings.borderStyle ? settings.borderStyle : 'rgba(0,0,0,0.3)';

    for (let regionContainer of regionContainers) {
        drawRegionContainer(ctx, regionContainer, settings, offset, mapType, source);
    }
};

const drawRegionContainer = function(ctx, parent, settings, offset, mapType, source) {
    let currentMap, regionType, pathsOriginSetting, pathsOrigin, children;
    currentMap = store.state.maps.current;
    regionType = parent.regionType;

    if (mapType === 'change') {
        let change = parent.getChange(offset, changeTools.daysBack);
        ctx.fillStyle = changeTools.getColorForChange(change);
    } else {
        ctx.fillStyle = parent.getColor(offset, source);
    }

    if (currentMap.settings.map.discreteRegions && currentMap.settings.map.discreteRegions.indexOf(parent.title) > -1) {
        ctx.globalAlpha = 0.25;
    } else {
        ctx.globalAlpha = 1;
    }

    pathsOriginSetting = currentMap.settings.pathOrigins.find(region => region.type === regionType);
    if (pathsOriginSetting) {
        pathsOrigin = pathsOriginSetting.paths;
        settings.hideStroke = true;
    } else {
        pathsOrigin = 'self';
    }
    children = parent.getRegionsForPaths(pathsOrigin);
    for (let child of children) {
        drawRegion(ctx, child, settings);
    }
};

const drawRegion = function(ctx, region, settings) {
    for (let path of region.paths) {
        drawPath(ctx, path, settings);
    }
};

const drawPath = function(ctx, path, settings) {
    if (!path.storedPaths[settings.key]) {
        path.create(settings);
    }
    if (settings.fill) {
        ctx.fill(path.storedPaths[settings.key]);
    }
    if (!settings.hideStroke) {
        ctx.stroke(path.storedPaths[settings.key]);
    }
};

export default {
    addBackground,
    draw,
    drawRegionContainer,
    drawRegion
}