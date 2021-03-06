import interpolate from "color-interpolate";

const margin = 0.05;
const max = Math.sqrt(1);
const daysBack = 7;
const colors = ['#FF0000', '#fff', '#014a0b'];

const sections = [
    {
        range: [max, margin]
    }, {
        range: [margin, -margin],
    }, {
        range: [-margin, -max],
    }
];

const getBackgroundForSection = function(index) {
    switch (index) {
        case 0:
            return [colors[0], colors[1]];
        case 1:
            return [colors[1], colors[1]];
        case 2:
            return [colors[1], colors[2]];
    }
};

const getFactorForChange = function(change) {
    return Math.log(change)/Math.log(2);
};

const getChangeForFactor = function(factor) {
    return Math.pow(2, factor);
};

const getColorForChange = function(change) {
    let upColor, downColor, neutralColor, ratio, colormap, factor;
    upColor = colors[0];
    neutralColor = colors[1];
    downColor = colors[2];
    factor = getFactorForChange(change);
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
    sections,
    daysBack,
    colors,
    getBackgroundForSection,
    getFactorForChange,
    getChangeForFactor,
    getColorForChange
};