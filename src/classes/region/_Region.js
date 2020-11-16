import store from '@/store/store';
import thresholdTools from "@/tools/thresholds";

class _Region {
    constructor(_region) {}

    getTotalIncreaseOfType(offset, days, type, relative) {
        let regions, total, population;
        total = 0;
        regions = this.getRegions();
        if (relative) {
            population = this.population;
        }
        for (let region of regions) {
            total += region.getIncreaseOfType(offset, days, type, false)
        }
        if (relative) {
            return 100000 * total / population;
        } else {
            return total;
        }
    }

    getTotalPopulation() {
        let population, regions;
        population = 0;
        regions = this.getRegions();
        for (let region of regions) {
            population += region.population;
        }
        return population;
    }

    getRegions() {
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


    getAllPaths() {
        let cities, paths;
        cities = this.getRegions();
        paths = [];
        for (let city of cities) {
            paths = paths.concat(city.paths);
        }
        return paths;
    }



    getTotalReport() {
        let report, cities, counter;
        report = {
            history: []
        };
        counter = 0;
        cities = this.getRegions();
        for (let city of cities) {
            let dayCounter = 0;
            for (let day of city.report.history) {
                let copy = {...day};
                if (counter === 0) {
                    report.history.push(copy)
                } else {
                    report.history[dayCounter].positiveTests += copy.positiveTests;
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
            value = this.getTotalIncreaseDay(0, offset);
            offset++;
        }
        return offset - 1;
    }

    getColor(offset) {
        let map, signalingSystem, cases;
        map = store.state.maps.current;
        signalingSystem = store.state.signalingSystems.current;
        if (signalingSystem.days === 1) {
            cases = this.getTotalIncreaseOfType(offset, 1, 'positiveTests', false);
        } else if (signalingSystem.days === 7) {
            cases = this.getTotalIncreaseOfType(offset, 7, 'positiveTests', false);
        }
        if (map.settings.hasTests) {
            if (this.hasLateReporting && offset < 10) {
                offset = this.getLatestReporting(offset);
            }
            return thresholdTools.thresholdToColor(this.getThreshold(0, offset), cases);
        } else {
            return '#ddd';
        }
    }

    getThreshold(delta = 0, offset) {
        let cases, signalingSystem;
        signalingSystem = store.state.signalingSystems.current;
        if (signalingSystem.days === 1) {
            cases = this.getTotalIncreaseOfType((offset + delta), 1, 'positiveTests', false);
        } else if (signalingSystem.days === 7) {
            cases = this.getTotalIncreaseOfType((offset + delta), 7, 'positiveTests', false);
            if (cases === null) {
                return null;
            }
        }
        return thresholdTools.getThreshold(cases, this.getTotalPopulation(), signalingSystem.days);
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

}

export default _Region;