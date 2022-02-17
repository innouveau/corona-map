import { getRelativeCumulativeForPeriod, getAbsoluteCumulativeForPeriod } from "@/tools/calculator";
import thresholdTools from "@/tools/thresholds";
import store from "@/store/store";
import {getAbsoluteValueForDay} from "./calculator";
import { getBaseRegions } from "./relations";

export const getColorForRegion = (region, view) => {
    let value;
    const source = view.currentSource;
    const signalingSystem = store.getters['signalingSystems/getItemById'](source.signalingSystem_id);
    const days = signalingSystem.days;
    if (source.key === 'vaccination') {
        if (region.baseRegion) {
            value = getAbsoluteValueForDay(region, view.offset, view.currentSource.key);
            if (value > 100) {
                return "#000";
            }
        } else {
            value = getValueVaccinationForMergedRegion(region, view);
        }
    } else {
        value = getRelativeCumulativeForPeriod(region, view.offset, view.offset + days, view.currentSource.key);
    }
    const threshold = thresholdTools.getThreshold(value, source);
    return thresholdTools.thresholdToColor(threshold, value, source);
}

const getValueVaccinationForMergedRegion = (region, view) => {
    let totalPopulation = 0;
    let totalVaccines = 0;
    const regions = getBaseRegions(region, store.state.ui.currentRegionType);
    for (const r of regions) {
        const percentage = getAbsoluteValueForDay(r, view.offset, view.currentSource.key);
        if (percentage !== 9999) {
            const vaccines = (percentage / 100) * r.population;
            totalVaccines += vaccines;
            totalPopulation += r.population;
        }
    }
    return 100 * (totalVaccines / totalPopulation);
}
