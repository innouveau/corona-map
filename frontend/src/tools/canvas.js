import store from '@/store/store';
import changeTools from '@/tools/change';
import { getIncreaseOfType } from "@/tools/calculator";
import { getShadeOfColor } from "@/tools/color";
import { CUMULATIVE_COLOR_SCALE } from "@/data/constants";
import interpolate from "color-interpolate";

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
    let total = 0;
    const max = Math.max(...regions.map(i => i.result.value), 0);
    const min = Math.min(...regions.map(i => i.result.value), max);
    for (const region of regions) {
        total += region.result.value;
    }
    const average = total / regions.length;
    for (const region of regions) {
        let ratio, range;
        const value = region.result.value;
        const offset = Math.abs(value - average);
        if (value > average) {
            range = max - average;
            ratio = offset / range;
            region.result.color = getShadeOfColor(CUMULATIVE_COLOR_SCALE[1], CUMULATIVE_COLOR_SCALE[2], ratio);
        } else {
            range = average - min;
            ratio = offset / range;
            region.result.color = getShadeOfColor(CUMULATIVE_COLOR_SCALE[1], CUMULATIVE_COLOR_SCALE[0], ratio);
        }
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
            const increase = getIncreaseOfType(parent, start, end, view.currentSource.key, true);
            return {
                value: increase,
                color: null
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
