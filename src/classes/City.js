import Path from './Path';
import store from '@/store/store';
import stringTool from '@/tools/string';
import thresholds from "@/data/thresholds";
import interpolate from'color-interpolate';

class City {
    constructor({
        id = null,
        municipality_code = '',
        ggd_code = '',
        safetyRegion_code = '',
        title = '',
        population = 0,
        area = 0,
        paths = [],
        report = null
    }) {
        this.id = id;
        this.municipality_code = municipality_code;
        this.ggd_code = ggd_code;
        this.safetyRegion_code = safetyRegion_code;
        this.title = title;
        this.population = population;
        this.area = area;
        this.paths = paths.map(path => new Path(path));
        this.report = report;
    }

    get increaseDay() {
        let offset = store.state.settings.currentDateOffset;
        return this.report.history[this.report.history.length - 1 - offset];
    }

    getIncreaseWeek(delta = 0) {
        let total, offset;
        total = 0;
        offset = store.state.settings.currentDateOffset + delta;
        for (let i = (this.report.history.length - 1 - offset), l = (this.report.history.length - 8 - offset); i > l; i--) {
            total += this.report.history[i];
        }
        return total;
    }

    getRelativeIncreaseWeek() {
        return 100000 * this.getIncreaseWeek() /  this.population;
    }

    getThreshold(delta = 0) {
        return thresholds.getThreshold(this.getIncreaseWeek(delta), this.population, 7);
    }

    get changedStatus(){
        return this.getThreshold(1) !== this.getThreshold(0);
    }

    get titleForSorting() {
        return stringTool.titleForSorting(this.title);
    }



    get hasNewInfection() {
        return this.getIncreaseWeek() > 0 && this.getIncreaseWeek(7) === 0
    }
    //
    // get trend() {
    //     let difference = this.newestSet - this.oldestSet;
    //     if (Math.abs(difference) < this.oldestSet / 20 || difference < 5) {
    //         return 'gelijk';
    //     } else {
    //         if (this.newestSet > this.oldestSet) {
    //             return 'stijgend';
    //         } else {
    //             return 'dalend';
    //         }
    //     }
    // }
    //




    get prev() {
        let threshold, index;
        threshold = this.getThreshold();
        index = thresholds.thresholds.indexOf(threshold);
        if (index > 0) {
            return thresholds.thresholds[index - 1];
        } else {
            return null;
        }
    }

    get next() {
        let threshold, index;
        threshold = this.getThreshold();
        index = thresholds.thresholds.indexOf(threshold);
        if (index < thresholds.thresholds.length - 1) {
            return thresholds.thresholds[index + 1];
        } else {
            return null;
        }
    }


    get color() {
        let threshold = this.getThreshold();
        if (!threshold) {
            return '#888';
        } else {
            if (!store.state.settings.gradient) {
                return threshold.color;
            } else {
                if (!this.prev || !this.next) {
                    return threshold.color;
                } else {
                    let colormap, maxOfNextColor, ratio;
                    maxOfNextColor = 0.65;
                    ratio = maxOfNextColor * (this.getRelativeIncreaseWeek() - this.prev.n) / (threshold.n - this.prev.n);
                    colormap = interpolate([threshold.color, this.next.color]);
                    return colormap(ratio);
                }
            }
        }
    }
}

export default City;