import _Region from "./_Region";
import store from '@/store/store';
import stringTool from '@/tools/string';


class _RegionWithTestData extends _Region{
    constructor() {
        super();
    }

    getIncreaseOfType(offset, days, type, relative) {
        let total, history, first, last, population;
        total = 0;
        history = this.report.history;
        first = history.length - offset - 1;
        if (days === -1) {
            last = -1;
        } else {
            last = first - days;
        }
        if (relative) {
            population = this.population;
        }
        for (let i = first, l = last; i > l; i--) {
            total += history[i][type];
        }
        if (relative) {
            return 100000 * total / population;
        } else {
            return total;
        }
    }

    getTotalAsPercentageOfPopulation(offset, type) {
        return 100 * this.getIncreaseOfType(offset, -1, type, false) / this.population;
    }





    // old

    get absoluteIncreaseLastDay() {
        if (this.report.history[this.report.history.length - 1]) {
            return this.report.history[this.report.history.length - 1].positiveTests;
        } else {
            return null;
        }
    }

    getIncreaseDay(delta = 0, offset) {
        if (this.report.history.length > 0) {
            return this.report.history[this.report.history.length - 1 - (offset + delta)].positiveTests;
        } else {
            return null;
        }
    }

    getIncreaseWeek(delta = 0, offset) {
        let total;
        if (this.report.history.length > 0) {
            if (store.state.maps.current.settings.testDataInterval === 1) {
                total = 0;
                for (let i = (this.report.history.length - 1 - offset), l = (this.report.history.length - 8 - offset); i > l; i--) {
                    total += this.report.history[i].positiveTests;
                }
                return total;
            } else {
                return this.report.history[this.report.history.length - 1 - offset].positiveTests
            }
        } else {
            return null;
        }
    }

    getRelativeIncreaseWeek() {
        return 100000 * this.getIncreaseWeek() /  this.population;
    }

    getRelativeIncreaseDay() {
        return 100000 * this.increaseDay /  this.population;
    }

    get titleForSorting() {
        return stringTool.titleForSorting(this.title);
    }

    get hasNewInfection() {
        return this.getIncreaseWeek() > 0 && this.getIncreaseWeek(7) === 0
    }
}

export default _RegionWithTestData;