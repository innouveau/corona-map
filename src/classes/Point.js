import coordinatesTool from "@/tools/coordinates";
import store from '@/store/store';
import robinson from '@/tools/projections/robinson';


class Point {
    constructor({
        x = 0,
        y = 0
    }) {
        this.x = x;
        this.y = y;
    }

    get asArray() {
        return [this.x, this.y];
    }

    getTranslated(settings) {
        let map, s;
        map = store.state.maps.current.settings.map;
        s = store.state.settings;
        if (map.projection && map.projection === 'robinson') {
            let point = robinson.projectAbsolute(this.y, this.x, s.canvasWidth, 1, 0, 0);
            return [point.x, point.y];
        } else {
            return [
                coordinatesTool.getLeft(this.x, this.y, settings),
                coordinatesTool.getTop(this.x, this.y, settings),
            ]
        }

    }
}

export default Point;