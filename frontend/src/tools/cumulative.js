import { CUMULATIVE_COLOR_SCALE } from "@/data/constants";

const margin = 0.05;
const max = Math.sqrt(1);
const daysBack = 7;
const colors = CUMULATIVE_COLOR_SCALE;

const sections = [
    {
        range: [max, margin],
    },
    {
        range: [margin, -margin],
    },
    {
        range: [-margin, -max],
    },
];

const getBackgroundForSection = function (index) {
    switch (index) {
        case 0:
            return [colors[0], colors[1]];
        case 1:
            return [colors[1], colors[1]];
        case 2:
            return [colors[1], colors[2]];
    }
};

export default {
    margin,
    max,
    sections,
    daysBack,
    colors,
    getBackgroundForSection,
};
