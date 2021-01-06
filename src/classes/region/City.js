import Path from './geo/Path';
import _RegionWithTestData from "./_RegionWithTestData";
import store from '@/store/store';
import dateTools from '@/tools/date';

class City extends _RegionWithTestData {
    constructor({
        country_id = null,
        identifier = '',
        ggd_code = '',
        safetyRegion_code = '',
        province_code = '',
        regio_title = '',
        title = '',
        population = 0,
        area = 0,
        paths = [],
        ageGroups = [],
        lifecycle = null,
        report = {
            history: []
        }
    }) {
        super();
        this.regionType = 'city';
        this.module = 'cities';
        this.id = store.state.cities.all.length + 1;
        this.country_id = country_id;
        this.identifier = identifier;
        this.ggd_code = ggd_code;
        this.safetyRegion_code = safetyRegion_code;
        this.province_code = province_code;
        this.regio_title = regio_title;
        this.title = title;
        this.population = population;
        this.area = area;
        this.paths = paths.map(path => new Path(path));
        this.ageGroups = ageGroups;
        this.lifecycle = lifecycle;
        this.report = report;
    }

    export() {
        let clone = {...this};
        clone.paths = this.paths.map(p => p.export());
        return clone;
    }

    isLive(offset) {
        let startOffset, endOffset;
        if (!this.lifecycle) {
            return true;
        } else {
            startOffset = dateTools.getOffsetByDate(this.lifecycle.start);
            if (this.lifecycle.end) {
                endOffset = dateTools.getOffsetByDate(this.lifecycle.end);
            }
            return offset <= startOffset && (this.lifecycle.end === null || offset >= endOffset);
        }
    }
}

export default City;