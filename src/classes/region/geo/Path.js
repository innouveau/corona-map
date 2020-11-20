import Point from "./Point";

class Path {
    constructor(path) {
        this.path = path.map(point => new Point(point));
        this.storedPaths = {};
    }

    create(settings) {
        let path, pathWithoutStart, translatedPath;
        path = new Path2D();
        translatedPath = this.getTranslatedPath(settings);
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

    get centroid() {
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
        return {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2
        }
    }
}

export default Path;