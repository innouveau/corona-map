const removeSmallIslands = function(paths) {
    let numberOfPaths, maxPaths;
    maxPaths = settings.maxIslands;
    numberOfPaths = paths.length;
    if (numberOfPaths > maxPaths) {
        return paths
            .sort((a,b) => (a.length > b.length) ? -1 : ((b.length > a.length) ? 1 : 0)).slice(0,maxPaths);
    } else {
        return paths;
    }
};

const scaleDownPath = function(path) {
    let filtered, pathLength, lastPointAdded;
    filtered = [];
    lastPointAdded = null;
    pathLength = path.length;
    if (pathLength > 50) {
        for (let i = 0, l = path.length; i < l; i++) {
            let point, distance;
            point = path[i];
            // exclude first and last point
            if (lastPointAdded && i < (l - 1)) {
                distance = Math.pow((point[0] - lastPointAdded[0]), 2) + Math.pow((point[1] - lastPointAdded[1]), 2);
                if (distance > settings.threshold) {
                    filtered.push(point);
                    lastPointAdded = point;
                }
            } else {
                filtered.push(point);
                lastPointAdded = point;
            }
        }
        return filtered;
    } else {
        return path;
    }
};

const scaleDownPathRough = function(path, scaleDown) {
    let filtered, l;
    l = path.length;
    if (l > 50) {
        scaleDown = Math.round(Math.pow(l, 0.99) / 800);
        if (scaleDown > 0) {
            filtered = [];
            for (let i = 0, l = path.length; i < l; i++) {
                let c = path[i];
                if (i === 0 || i === (l - 1) || i % scaleDown === 0) {
                    filtered.push(c);
                }
            }
            console.log(l + ' with scaledown ' + scaleDown + '. To ' + filtered.length);
            return filtered;
        } else {
            return path;
        }
    } else {
        return path;
    }
};
