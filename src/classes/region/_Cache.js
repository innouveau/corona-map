class _Cache {
    constructor(_cache) {
        this.cache = {
            'regular': {},
            'total': {}
        };
    }

    getStoredValue(offset, days, type, relative, cacheType) {
        if (this.cache[cacheType][type] && this.cache[cacheType][type][offset] && this.cache[cacheType][type][offset][days]) {
            if (relative) {
                return this.cache[cacheType][type][offset][days].relative;
            } else {
                return this.cache[cacheType][type][offset][days].absolute;
            }
        } else {
            return null;
        }
    }

    store(offset, days, type, relative, value, cacheType) {
        if (!this.cache[cacheType][type]) {
            this.cache[cacheType][type] = {};
        }
        if (!this.cache[cacheType][type][offset]) {
            this.cache[cacheType][type][offset] = {};
        }
        if (!this.cache[cacheType][type][offset][days]) {
            this.cache[cacheType][type][offset][days] = {
                relative: null,
                absolute: null
            };
        }
        if (relative) {
            this.cache[cacheType][type][offset][days].relative = value;
        } else {
            this.cache[cacheType][type][offset][days].absolute = value;
        }
    }
}

export default _Cache;