import store from '@/store/store';
import changeTools from '@/tools/change';
import { getIncreaseOfType } from "@/tools/calculator";
import { getShadeOfColor } from "@/tools/color";

const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#f5eedc';
    ctx.fill();
};

const draw = function(ctx, source, regionContainers, settings, view, mapType = 'signaling', border = true) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = settings.borderStyle ? settings.borderStyle : 'rgba(0,0,0,0.3)';

    for (let regionContainer of regionContainers) {
        drawRegionContainer(ctx, regionContainer, settings, view, mapType, source);
    }
};

const getColorForRegion = function(parent, mapType, view, source) {
    switch (mapType) {
        case 'change':
            let change = parent.getChange(view.offset, changeTools.daysBack);
            return changeTools.getColorForChange(change);
        case 'cumulative':
            const historyLength = store.state.settings.historyLength;
            const start = historyLength - view.offsetStart;
            const end = historyLength - view.offset;
            // adjust for range length
            const max = (end - start) * 60;
            const increase = getIncreaseOfType(parent, start, end, view.currentSource.key, true);
            const shade = Math.round(10 * increase / max) / 10;
            return getShadeOfColor('000', Math.min(shade, 1));
        default:
            return parent.getColor(view.offset, source);
    }
}

const drawRegionContainer = function(ctx, parent, settings, view, mapType, source) {
    let currentMap, regionType, pathsOriginSetting, pathsOrigin, children;
    currentMap = store.state.maps.current;
    regionType = parent.regionType;
    ctx.fillStyle = getColorForRegion(parent, mapType, view, source);


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
