import store from '@/store/store';
import changeTools from '@/tools/change';
import { getIncreaseOfType } from "@/tools/calculator";
import { getShadeOfColor } from "@/tools/color";
import region from "../components/_pages/main/trends/region";

const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#f5eedc';
    ctx.fill();
};

const draw = function(ctx, source, regionContainers, settings, view, mapType = 'signaling', border = true) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = settings.borderStyle ? settings.borderStyle : 'rgba(0,0,0,0.3)';

    const values = getValues(regionContainers, mapType, view, source);
    if (mapType === "cumulative") {
        normalise(values);
    }

    for (let regionData of values) {
        drawRegionContainer(ctx, regionData.region, settings, regionData.result.color) ;
    }
};

const normalise = (regions) => {
    const max = Math.max(...regions.map(i => i.result.value), 0);
    for (const region of regions) {
        const shade = Math.round(10 * region.result.value / max) / 10;
        region.result.color = getShadeOfColor('000', Math.min(shade, 1))
    }
}

const getValues = (regionContainers, mapType, view, source) => {
    const result = [];
    for (const region of regionContainers) {
        result.push({
            region: region,
            result: getValue(region, mapType, view, source)
        });
    }
    return result;
}

const getValue = function(parent, mapType, view, source) {
    switch (mapType) {
        case 'change':
            let change = parent.getChange(view.offset, changeTools.daysBack);
            return {
                value: null,
                color: changeTools.getColorForChange(change)
            }
        case 'cumulative':
            const historyLength = store.state.settings.historyLength;
            const start = historyLength - view.offsetStart;
            const end = historyLength - view.offset;
            // adjust for range length
            const max = (end - start) * 60;
            const increase = getIncreaseOfType(parent, start, end, view.currentSource.key, true);
            const shade = Math.round(10 * increase / max) / 10;
            return {
                value: increase,
                color: getShadeOfColor('000', Math.min(shade, 1))
            }
        default:
            return {
                value: null,
                color: parent.getColor(view.offset, source)
            }
    }
}

const drawRegionContainer = function(ctx, parent, settings, color) {
    let currentMap, regionType, pathsOriginSetting, pathsOrigin, children;
    currentMap = store.state.maps.current;
    regionType = parent.regionType;
    ctx.fillStyle = color;


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
