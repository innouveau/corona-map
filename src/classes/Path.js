import Point from "./Point";

class Path {
    constructor(path) {
        this.path = path.map(point => new Point(point));
        this.storedPaths = {};
    }

    create(settings, view) {
        let path, pathWithoutStart, translatedPath;
        path = new Path2D();
        translatedPath = this.getTranslatedPath(settings, view);
        path.moveTo(...translatedPath[0]);
        pathWithoutStart = translatedPath.slice(1);
        for (let point of pathWithoutStart) {
            path.lineTo(...point);
        }
        this.storedPaths[settings.key] = path;
    }

    getTranslatedPath(settings, view) {
        return this.path.map(point => point.getTranslated(settings, view));
    }

    export() {
        return this.path;
    }
}

export default Path;