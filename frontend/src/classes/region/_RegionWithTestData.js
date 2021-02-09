import _Region from "./_Region";
import stringTool from '@/tools/string';


class _RegionWithTestData extends _Region{
    constructor() {
        super();
    }

    getIncreaseOfType(offset, days, type, relative) {
        let total, history, first, last, population, value;
        total = 0;
        history = this.report.history;
        if (history.length > 0) {
            value = this.getStoredValue(offset, days, type, relative, 'regular');
            if (value !== null) {
                return value;
            } else {
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
                    let thisValue = history[i][type];
                    if (thisValue) {
                        total += thisValue;
                    }
                }
                if (relative) {
                    value = 100000 * total / population;
                } else {
                    value = total;
                }
                if (!isNaN(value) && value !== null) {
                    this.store(offset, days, type, relative, value, 'regular');
                } else {
                    value = null;
                }
                return value;
            }
        } else {
            return null;
        }
    }

    get titleForSorting() {
        return stringTool.titleForSorting(this.title);
    }
}

export default _RegionWithTestData;