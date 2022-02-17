import store from '@/store/store';
import changeTools from '@/tools/change';
import { getRelativeCumulativeForPeriod, getChangeOfType } from "@/tools/calculator";
import { getShadeOfColor } from "@/tools/color";
import { CUMULATIVE_COLOR_SCALE } from "@/data/constants";
import { getColorForRegion } from "@/tools/signaling";
import {getPathsForRegion} from "./relations";
import Path from "@/classes/region/geo/Path";

const draw = function(ctx, regions, settings, view, mapType) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = settings.borderStyle ? settings.borderStyle : 'rgba(0,0,0,0.3)';
    const values = getValues(regions, mapType, view);
    if (mapType === "cumulative") {
        normalise(values);
    }
    for (let regionData of values) {
        drawRegion(ctx, regionData.region, settings, regionData.result.color) ;
    }
};

const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#f5eedc';
    ctx.fill();
};

const normalise = (regions) => {
    let total = 0;
    for (const region of regions) {
        if (isNaN(region.result.value)) {
            console.log(region);
        }
    }
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

const getValues = (regions, mapType, view) => {
    const result = [];
    for (const region of regions) {
        result.push({
            region,
            result: getValue(region, mapType, view)
        });
    }
    return result;
}

const getValue = function(region, mapType, view) {
    if (!view.currentSource || region.noData === true) {
        return {
            value: null,
            color: '#888'
        }
    } else {
        switch (mapType) {
            case 'change':
                const change = getChangeOfType(region, view.offset, 7, view.currentSource.key);
                return {
                    value: null,
                    color: changeTools.getColorForChange(change)
                }
            case 'cumulative':
                const start = view.offset;
                const end = view.offsetStart;
                const cumulative = getRelativeCumulativeForPeriod(region, start, end, view.currentSource.key);
                return {
                    value: cumulative,
                    color: null
                }
            default:
                return {
                    value: null,
                    color: getColorForRegion(region, view)
                }
        }
    }
}

const drawRegion = function(ctx, region, settings, color) {
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    if (!region.baseRegion) {
        if (!region.paths) {
            const data = getPathsForRegion(region);
            region.paths = data.map(path => new Path(path));
        }
    }
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
    drawRegion
}
