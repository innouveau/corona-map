import store from '@/store/store';
import dateTools from '@/tools/date';

class Measurement {
    constructor({
        date = '',
        RNA_per_ml = 0,
        representative_measurement = false
    }, sewageTreatmentPlant) {
        this.sewageTreatmentPlant = sewageTreatmentPlant;
        this.date = date;
        this.dateInMs = new Date(date).getTime();
        this.dateOffset = dateTools.getDateOffset(store.state.ui.todayInMs, this.dateInMs);
        this.RNA_per_ml = RNA_per_ml;
        this.representative_measurement = representative_measurement;
    }

    get isOutlier() {
        let index, previous, next, previousValue, nextValue, thisValue, factor, minValue;
        factor = 3;
        minValue = 1000;
        thisValue = this.RNA_per_ml;
        if (thisValue > minValue) {
            index = this.sewageTreatmentPlant.measurements.indexOf(this);
            previous = this.sewageTreatmentPlant.measurements[index - 1];
            next = this.sewageTreatmentPlant.measurements[index + 1];
            if (!previous || !next) {
                if (previous) {
                    previousValue = previous.RNA_per_ml;
                    // if only previous, the factor should be topped extra
                    if (thisValue > previousValue && thisValue / previousValue > (factor * 1.5)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            } else {
                previousValue = previous.RNA_per_ml;
                nextValue = next.RNA_per_ml;
                if (thisValue > previousValue && thisValue > nextValue && thisValue / previousValue > factor && thisValue / nextValue > factor) {
                    return true;
                } else {
                    return false;
                }
            }

        }
    }
}

export default Measurement;