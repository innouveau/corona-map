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
}

export default Path;