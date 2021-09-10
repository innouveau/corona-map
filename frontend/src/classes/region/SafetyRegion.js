import _Region from "./_Region";
import Path from "./geo/Path";
import store from '@/store/store'

class SafetyRegion extends _Region {
    constructor({
        safetyRegion_code = '',
        title = '',
        paths = [],
        report = null
    }) {
        super();
        this.id = (store.state.safetyRegions.all.length + 1);
        this.module = 'safetyRegions';
        this.regionType = 'safety-region';
        this.safetyRegion_code = safetyRegion_code;
        this.title = title;
        this.paths = paths.map(path => new Path(path));
        this.report = report;
        this.vaccination = [];
    }
}

export default SafetyRegion;