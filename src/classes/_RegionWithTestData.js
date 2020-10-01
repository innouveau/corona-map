import _Region from "./_Region";
import store from '@/store/store';
import stringTool from '@/tools/string';


class _RegionWithTestData extends _Region{
    constructor() {
        super();
    }

    // get increaseDay(offset) {
    //     let day = this.report.history.find(d => d.offset === offset);
    //     return day ? day.positiveTests : 0;
    // }

    getDay(offset) {
        return this.report.history.find(day => day.offset === offset);
    }

    getIncreaseDay(delta = 0, offset) {
        let day = this.getDay(offset + delta);
        if (day) {
            return day.positiveTests
        } else {
            return null;
        }
    }

    getIncreaseWeek(delta = 0, offset) {
        let total;
        if (store.state.maps.current.settings.testDataInterval === 1) {
            total = 0;
            for (let i = 0; i < 7; i++) {
                let day = this.getDay(i + delta);
                if (day) {
                    total += day.positiveTests;
                } else {
                    return null;
                }
            }
            return total;
        } else {
            return this.report.history[this.report.history.length - 1 - offset].positiveTests
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