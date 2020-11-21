class View {
    constructor({
        id = null,
        offset = 0,
        currentRegion = null,
        pcrWeekly = false
    }) {
        this.id = id;
        this.offset = offset;
        this.currentRegion = currentRegion;
        this.pcrWeekly = pcrWeekly;
    }
}

export default View;