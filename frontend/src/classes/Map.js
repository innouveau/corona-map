class Map {
    constructor({
        id = null,
        ready = true,
        block = false,
        title = '',
        module = '',
        regionLabel = '',
        settings = {},
        data = {},
        story_id = null
    }) {
        this.id = id;
        this.ready = ready;
        this.block = block;
        this.title = title;
        this.module = module;
        this.regionLabel = regionLabel;
        this.settings = settings;
        this.data = data;
        this.story_id = story_id;
    }
}

export default Map;