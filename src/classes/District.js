import Path from './Path';
import _RegionWithTestData from "./_RegionWithTestData";

class District extends _RegionWithTestData {
    constructor({
        id = null,
        identifier = '',
        nutsCode = '',
        ggd_code = '',
        title = '',
        population = 0,
        area = 0,
        paths = [],
        report = {
            history: []
        }
    }) {
        super();
        this.regionType = 'district';
        this.id = id;
        this.identifier = identifier;
        this.nutsCode = nutsCode;
        this.ggd_code = ggd_code;
        this.title = title;
        this.population = population;
        this.area = area;
        this.paths = paths.map(path => new Path(path));
        this.report = report;
    }

}

export default District;