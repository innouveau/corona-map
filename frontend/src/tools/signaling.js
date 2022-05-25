import store from "@/store/store";
import thresholdTools from "@/tools/thresholds";
import { getRelativeCumulativeForPeriod } from "@/tools/calculator";
import { getRelativeValueForDay, getTotalPopulation } from "./calculator";

export const getColorForRegion = (region, view) => {
    let value;
    const source = view.currentSource;
    const signalingSystem = store.getters["signalingSystems/getItemById"](
        source.signalingSystem_id
    );
    const days = signalingSystem.days;
    if (source.key === "vaccination") {
        value = getRelativeValueForDay(
            region,
            view.offset,
            view.currentSource.key
        );
        // probably regions without children (mismatch with data districts from 2020 and (new) municipalities from 2022)
        if (value === 0 && getTotalPopulation(region) === 0) {
            return "#000";
        }
        // region without data (industrial areas etc)
        if (value === null) {
            return "#000";
        }
        value /= 1000;
    } else {
        value = getRelativeCumulativeForPeriod(
            region,
            view.offset,
            view.offset + days,
            view.currentSource.key
        );
    }
    const threshold = thresholdTools.getThreshold(value, source);
    return thresholdTools.thresholdToColor(threshold, value, source);
};
