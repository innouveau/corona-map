import store from '@/store/store';
import thresholdTools from "@/tools/thresholds";
import coordinatesTool from "@/tools/coordinates";
import _Cache from "./_Cache";

class _Region extends _Cache {
    constructor(_region) {
        super();
    }

    getTotalIncreaseOfType(offset, days, type, relative) {
        let regions, total, population, value;

        value = this.getStoredValue(offset, days, type, relative, 'regular');

        if (value !== null) {
            return value;
        } else {
            total = 0;
            regions = this.regions;
            if (relative) {
                population = this.totalPopulation;
            }
            for (let region of regions) {
                let thisValue = region.getIncreaseOfType(offset, days, type, false);
                if (!isNaN(thisValue)) {
                    total += thisValue;
                }
            }
            if (relative) {
                value = 100000 * total / population;
            } else {
                value = total;
            }

            if (value !== null) {
                this.store(offset, days, type, relative, value, 'total');
            }
            return value;
        }
    }

    getTotalAsPercentageOfPopulation(offset, type) {
        let total, population, regions;
        total = 0;
        population = this.totalPopulation;
        regions = this.regions;
        for (let region of regions) {
            total += region.getIncreaseOfType(offset, -1, type, false)
        }
        return 100 * total / population;
    }

    get totalPopulation() {
        let population, regions;
        population = 0;
        regions = this.regions;
        for (let region of regions) {
            population += region.population;
        }
        return population;
    }

    get regions() {
        let module = store.state.maps.current.module;
        switch(this.regionType) {
            case 'city':
            case 'district':
                return [this];
            case 'ggd':
                return store.state[module].all.filter(city => {
                    return city.ggd_code === this.ggd_code;
                });
            case 'safety-region':
                return store.state[module].all.filter(city => {
                    return city.safetyRegion_code === this.safetyRegion_code;
                });
            case 'province':
                return store.state[module].all.filter(city => {
                    return city.province_code === this.province_code;
                });
            case 'country':
                return store.state[module].all.filter(city => {
                    return city.country_id === this.id;
                });
        }
    }

    getGgds() {
        switch(this.regionType) {
            case 'ggd':
                return [this];
            case 'country':
                return store.state.ggds.all;
            default:
                return [];
        }
    }

    getRegionsForPaths(pathsOrigin) {
        if (pathsOrigin === 'self') {
            return [this];
        } else {
            // find paths at another level (pathsOrigin)
            let identifier;
            switch (this.regionType) {
                case 'city':
                case 'district':
                    return [this];
                case 'ggd':
                    identifier = 'ggd_code';
                    break;
                case 'safety-region':
                    identifier = 'safetyRegion_code';
                    break;
                case 'province':
                    identifier = 'province_code';
                    break;
            }
            switch (pathsOrigin) {
                case 'district':
                    return store.state.districts.all.filter(district => {
                        return district[identifier] === this[identifier];
                    });
                case 'city':
                    return store.state.cities.all.filter(city => {
                        return city[identifier] === this[identifier];
                    });
                case 'province':
                    return store.state.provinces.all.filter(province => {
                        return province[identifier] === this[identifier];
                    });
            }
        }
    }

    getTotalReport() {
        let report, cities, counter;
        report = {
            history: []
        };
        counter = 0;
        cities = this.regions;
        for (let city of cities) {
            let dayCounter = 0;
            for (let day of city.report.history) {
                let copy = {...day};
                if (counter === 0) {
                    report.history.push(copy)
                } else {
                    report.history[dayCounter].positiveTests += copy.positiveTests;
                    report.history[dayCounter].positiveAntigenTests += copy.positiveAntigenTests;
                    report.history[dayCounter].totalAntigenTests += copy.totalAntigenTests;
                    if (report.history[dayCounter].administeredTests) {
                        report.history[dayCounter].administeredTests += copy.administeredTests;
                    }
                }
                dayCounter++;
            }
            counter++;
        }
        return report;
    }

    get changedStatus(){
        return this.getThreshold(1) !== this.getThreshold(0);
    }

    get hasLateReporting() {
        let map = store.state.maps.current;
        if (map.settings.caseSettings) {
            for (let code of map.settings.caseSettings.lateReporting) {
                if (this.nutsCode.indexOf(code) > -1) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    getLatestReporting(offset) {
        let value = 0;
        while (value === 0) {
            value = this.getTotalIncreaseOfType(offset, 1, 'positiveTests', true);
            offset++;
        }
        return offset - 1;
    }

    getColor(offset, source) {
        let map, frames, n, threshold;
        map = store.state.maps.current;
        frames = this.getFramesForPeriod(source);
        n = this.getTotalIncreaseOfType(offset, frames, source.key, true);
        if (map.data.positivePcrTests.status) {
            if (this.hasLateReporting && offset < 10) {
                offset = this.getLatestReporting(offset);
            }
            threshold = this.getThreshold(0, offset, source);
            return thresholdTools.thresholdToColor(threshold, n, source);
        } else {
            return '#ddd';
        }
    }

    getThreshold(delta = 0, offset, source) {
        let n, frames;
        frames = this.getFramesForPeriod(source);

        // possible with testDataInterval of 7 and signalingSystem-days of 1
        if (frames < 1) {
            return null;
        } else {
            n = this.getTotalIncreaseOfType((offset + delta), frames, source.key, true);
            if (n === null) {
                return null;
            }
            return thresholdTools.getThreshold(n, source);
        }
    }

    getFramesForPeriod(source) {
        let map, signalingSystem;
        map = store.state.maps.current;
        signalingSystem = store.getters['signalingSystems/getItemById'](source.signalingSystem_id);
        return signalingSystem.days / map.data.positivePcrTests.interval;
    }

    getChange(offset, daysBefore) {
        let before, after, extraOffset;
        extraOffset = 0;
        if (this.hasLateReporting && offset < 10) {
            extraOffset = this.getLatestReporting(offset);
        }
        before = this.getTotalIncreaseOfType((offset + daysBefore + extraOffset), 7, 'positiveTests', true);
        after = this.getTotalIncreaseOfType((offset + extraOffset), 7, 'positiveTests', true);
        if (before === 0) {
            //if (after === 0) {
                return 1;
            //}
        } else {
            return after / before;
        }
    }

    //

    getCentroid(settings) {
        let path, centroid, projected;
        path = this.paths[0];
        centroid = path.centroid;
        projected = coordinatesTool.project(centroid, settings);
        return {
            x: projected[0],
            y: projected[1]
        };
    }

}

export default _Region;