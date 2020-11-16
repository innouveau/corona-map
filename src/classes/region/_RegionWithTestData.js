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
        if (history.length > 0) {
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
        } else {
            return null;
        }
    }

    getTotalAsPercentageOfPopulation(offset, type) {
        return 100 * this.getIncreaseOfType(offset, -1, type, false) / this.population;
    }

    get titleForSorting() {
        return stringTool.titleForSorting(this.title);
    }
}

export default _RegionWithTestData;