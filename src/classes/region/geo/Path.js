import Point from "./Point";
import store from '@/store/store';


class Path {
    constructor(path) {
        this.path = path.map(point => new Point(point));
        this.storedPaths = {};
    }

    create(settings) {
        let path, pathWithoutStart, translatedPath, map;
        map = store.state.maps.current;
        path = new Path2D();
        if (map.block) {
            translatedPath = this.box.map(point => point.getTranslated(settings));
        } else {
            translatedPath = this.getTranslatedPath(settings);
        }
        path.moveTo(...translatedPath[0]);
        pathWithoutStart = translatedPath.slice(1);
        for (let point of pathWithoutStart) {
            path.lineTo(...point);
        }
        this.storedPaths[settings.key] = path;
    }

    getTranslatedPath(settings) {
        return this.path.map(point => point.getTranslated(settings));
    }

    export() {
        return this.path;
    }

    get box() {
        let x1, x2, y1, y2;
        x1 = null;
        x2 = null;
        y1 = null;
        y2 = null;
        for (let point of this.path) {
            if ( x1 === null || point.x < x1) {
                x1 = point.x;
            }
            if ( x2 === null || point.x > x2) {
                x2 = point.x;
            }
            if ( y1 === null || point.y < y1) {
                y1 = point.y;
            }
            if ( y2 === null || point.y > y2) {
                y2 = point.y;
            }
        }
        return [
            new Point({x: x1, y: y1}),
            new Point({x: x2, y: y1}),
            new Point({x: x2, y: y2}),
            new Point({x: x1, y: y2})
        ];
    }

    get centroid() {
        let box = this.box;
        return {
            x: (box[0].x + box[1].x) / 2,
            y: (box[1].y + box[2].y) / 2
        }
    }
}

export default Path;