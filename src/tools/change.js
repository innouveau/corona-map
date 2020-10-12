import interpolate from "color-interpolate";

const margin = 0.05;
const max = 2;
const daysBack = 7;
const colors = ['#FF0000', '#fff', '#00FF00'];

const getColorForChange = function(change) {
    let upColor, downColor, neutralColor, ratio, colormap, baseColor, factor;
    upColor = colors[0];
    neutralColor = colors[1];
    downColor = colors[2];
    factor = Math.log(change)/Math.log(2);
    if (factor > margin) {
        ratio = Math.min(((factor - margin) / (max - margin)), 1);
        colormap = interpolate([neutralColor, upColor]);
        return colormap(ratio);
    } else if (factor < -margin) {
        ratio = Math.min(((factor + margin) / (-max + margin)), 1);
        colormap = interpolate([neutralColor, downColor]);
        return colormap(ratio);
    } else {
        return neutralColor;
    }
};

export default {
    margin,
    max,
    daysBack,
    colors,
    getColorForChange
};