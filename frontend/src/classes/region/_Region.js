import store from '@/store/store';
import thresholdTools from "@/tools/thresholds";
import coordinatesTool from "@/tools/coordinates";
import _Cache from "./_Cache";

class _Region extends _Cache {
    constructor(_region) {
        super();
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
