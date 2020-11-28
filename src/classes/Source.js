import store from '@/store/store';

class Source {
    constructor({
        key = '',
        title = '',
        signalingSystem_id = null
    }) {
        this.id = (store.state.sources.all.length + 1);
        this.key = key;
        this.title = title;
        this.signalingSystem_id = signalingSystem_id;
    }
}

export default Source;