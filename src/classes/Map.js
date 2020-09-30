class Map {
    constructor({
        id = null,
        title = '',
        module = '',
        regionLabel = '',
        settings = {},
        url = {},
        parents = []
    }) {
        this.id = id;
        this.title = title;
        this.module = module;
        this.regionLabel = regionLabel;
        this.settings = settings;
        this.url = url;
        this.parents = parents;
    }
}

export default Map;