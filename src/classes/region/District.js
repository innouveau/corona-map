import Path from './geo/Path';
import _RegionWithTestData from "./_RegionWithTestData";
import store from '@/store/store';

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
        this.id = store.state.districts.all.length + 1;
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