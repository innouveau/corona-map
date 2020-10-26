import Path from './Path';
import _RegionWithTestData from "./_RegionWithTestData";

class City extends _RegionWithTestData {
    constructor({
        id = null,
        identifier = '',
        ggd_code = '',
        safetyRegion_code = '',
        province_code = '',
        title = '',
        population = 0,
        area = 0,
        paths = [],
        ageGroups = [],
        report = {
            history: []
        }
    }) {
        super();
        this.regionType = 'city';
        this.id = id;
        this.country_id = 1;
        this.identifier = identifier;
        this.ggd_code = ggd_code;
        this.safetyRegion_code = safetyRegion_code;
        this.province_code = province_code;
        this.title = title;
        this.population = population;
        this.area = area;
        this.paths = paths.map(path => new Path(path));
        this.ageGroups = ageGroups;
        this.report = report;
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
}

export default City;