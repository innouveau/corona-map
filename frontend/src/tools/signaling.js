import { getRelativeCumulativeForPeriod } from "@/tools/calculator";
import thresholdTools from "@/tools/thresholds";
import store from "@/store/store";

export const getColorForRegion = (region, view) => {
    const source = view.currentSource;
    const signalingSystem = store.getters['signalingSystems/getItemById'](source.signalingSystem_id);
    const days = signalingSystem.days;
    const value = getRelativeCumulativeForPeriod (region, view.offset, view.offset + days, view.currentSource.key);
    const threshold = thresholdTools.getThreshold(value, source);
    return thresholdTools.thresholdToColor(threshold, value, source);
}
