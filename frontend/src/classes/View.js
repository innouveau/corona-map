import store from '@/store/store';

class View {
    constructor({
        id = null,
        offset = 0,
        offsetStart = 0,
        currentRegion = null,
        currentSource = store.state.sources.all[0],
        pcrWeekly = false
    }) {
        this.id = id;
        this.offset = offset;
        this.offsetStart = offsetStart;
        this.currentRegion = currentRegion;
        this.currentSource = currentSource;
        this.pcrWeekly = pcrWeekly;
    }
}

export default View;
