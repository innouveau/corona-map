class Map {
    constructor({
        id = null,
        ready = true,
        title = '',
        module = '',
        regionLabel = '',
        settings = {},
        url = {},
        story_id = null
    }) {
        this.id = id;
        this.ready = ready;
        this.title = title;
        this.module = module;
        this.regionLabel = regionLabel;
        this.settings = settings;
        this.url = url;
        this.story_id = story_id;
    }
}

export default Map;