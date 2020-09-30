class View {
    constructor({
        id = null,
        offset = 0,
        currentRegion = null,
        parent = null
    }) {
        this.id = id;
        this.offset = offset;
        this.currentRegion = currentRegion;
        this.parent = parent;
    }
}

export default View;