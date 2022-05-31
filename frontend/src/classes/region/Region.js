import Path from "./geo/Path";
import store from "@/store/store";
import stringTool from "@/tools/string";
import coordinatesTool from "@/tools/coordinates";

class Region {
    constructor({
        id = null,
        code = "",
        nutsCode = "",
        title = "",
        population = 0,
        paths = [],
        report = {
            history: [],
        },
    }) {
        this.id = id ? id : store.state.regions.all.length + 1;
        this.code = code;
        this.nutsCode = nutsCode;
        this.title = title;
        this.population = population;
        this.paths = paths.map((path) => new Path(path));
        this.report = report;
        this.noData = false;
        this.baseRegion = true;
    }
    get titleForSorting() {
        return stringTool.titleForSorting(this.title);
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
            y: projected[1],
        };
    }
}

export default Region;
