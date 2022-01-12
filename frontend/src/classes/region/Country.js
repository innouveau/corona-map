import _Region from "./_Region";
import Path from "./geo/Path";

class Country extends _Region {
    constructor({
        id = null,
        title = '',
        report = {
            history: []
        },
        paths = []
    }) {
        super();
        this.module = 'countries';
        this.regionType = 'country';
        this.id = id;
        this.title = title;
        this.report = report;
        this.paths = paths.map(path => new Path(path));
    }
}

export default Country;
