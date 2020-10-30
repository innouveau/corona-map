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

    get value() {
        return this.RNA_per_ml;
    }

    get unreliable() {
        return this.value > 10000;
    }

    get previous() {
        let index = this.sewageTreatmentPlant.measurements.indexOf(this);
        if (index > 0) {
            return this.sewageTreatmentPlant.measurements[index - 1];
        } else {
            return null;
        }
    }

    get next() {
        let index, next;
        index = this.sewageTreatmentPlant.measurements.indexOf(this);
        if (index < this.sewageTreatmentPlant.measurements.length - 1) {
            next = this.sewageTreatmentPlant.measurements[index + 1];
            // skip measurement on same day
            if (next.dateOffset === this.dateOffset) {
                return next.next;
            } else {
                return next;
            }
        } else {
            return null;
        }
    }

    get isOutlier() {
        let index, previous, next, previousValue, nextValue, thisValue, factor, minValue;
        factor = 3;
        minValue = 1000;
        thisValue = this.RNA_per_ml;
        if (thisValue > minValue) {
            previous = this.previous;
            next = this.next;
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