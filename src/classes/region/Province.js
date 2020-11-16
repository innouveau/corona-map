import _Region from "./_Region";
import store from '@/store/store'
import Path from "./geo/Path";

class Province extends _Region{
    constructor({
        province_code = '',
        title = '',
        paths = [],
        report = null
    }) {
        super();
        this.id = (store.state.provinces.all.length + 1);
        this.regionType = 'province';
        this.province_code = province_code;
        this.title = title;
        this.paths = paths.map(path => new Path(path));
        this.report = report;
        this.country_id = 1;
    }
}

export default Province;