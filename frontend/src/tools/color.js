import interpolate from "color-interpolate";

export const getShadeOfColor = (baseColor, upColor, ratio) => {
    const colormap = interpolate([baseColor, upColor]);
    return colormap(ratio);
}
