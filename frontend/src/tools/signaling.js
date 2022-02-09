import { getRelativeCumulativeForPeriod, getAbsoluteCumulativeForPeriod } from "@/tools/calculator";
import thresholdTools from "@/tools/thresholds";
import store from "@/store/store";
import {getAbsoluteValueForDay} from "./calculator";

export const getColorForRegion = (region, view) => {
    let value;
    const source = view.currentSource;
    const signalingSystem = store.getters['signalingSystems/getItemById'](source.signalingSystem_id);
    const days = signalingSystem.days;
    if (source.key === 'vaccination') {
        value = getAbsoluteValueForDay(region, view.offset, view.currentSource.key);
        if (value > 100) {
            console.log("!");
            return "#ddd";
        }
    } else {
        value = getRelativeCumulativeForPeriod(region, view.offset, view.offset + days, view.currentSource.key);
    }
    const threshold = thresholdTools.getThreshold(value, source);
    return thresholdTools.thresholdToColor(threshold, value, source);
}
