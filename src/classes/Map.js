class Map {
    constructor({
        id = null,
        ready = true,
        title = '',
        module = '',
        regionLabel = '',
        settings = {},
        url = {}
    }) {
        this.id = id;
        this.ready = ready;
        this.title = title;
        this.module = module;
        this.regionLabel = regionLabel;
        this.settings = settings;
        this.url = url;
    }
}

export default Map;