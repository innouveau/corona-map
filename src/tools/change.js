import interpolate from "color-interpolate";

const margin = 0.05;
const max = 2;
const daysBack = 7;

const getColorForChange = function(change) {
    let upColor, downColor, neutralColor, ratio, colormap, baseColor, factor;
    upColor = '#FF0000';
    downColor = '#00FF00';
    baseColor = '#fff';
    neutralColor = '#fff';
    factor = Math.log(change)/Math.log(2);
    if (factor > margin) {
        ratio = Math.min(((factor - margin) / (max - margin)), 1);
        colormap = interpolate([baseColor, upColor]);
        return colormap(ratio);
    } else if (factor < -margin) {
        ratio = Math.min(((factor + margin) / (-max + margin)), 1);
        colormap = interpolate([baseColor, downColor]);
        return colormap(ratio);
    } else {
        return neutralColor;
    }
};

export default {
    margin,
    max,
    daysBack,
    getColorForChange
};