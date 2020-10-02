import coordinatesTool from "@/tools/coordinates";

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
        return [
            coordinatesTool.getLeft(this.x, this.y, settings),
            coordinatesTool.getTop(this.x, this.y, settings),
        ]
    }
}

export default Point;