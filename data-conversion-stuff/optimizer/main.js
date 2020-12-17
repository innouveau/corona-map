let url, settings, cities;

url = './../../public/data/maps/nederland/cities-old.json';
cities = [];
settings = {
    threshold: 0.000005
};

const loadFile = function() {
    $.getJSON(url, function( data ) {
        for (let item of data) {
            let city = optimize(item);
            cities.push(city);
        }
        console.log(JSON.stringify(cities));
    });
};

const optimize = function(item) {
    let city, paths;
    city = {...item};
    paths = [];
    delete city.id;
    delete city.area;
    delete city.report;
    for (let path of city.paths) {
        let p = scaleDownPath(path);
        paths.push(p);
    }
    city.paths = paths;
    return city;
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
                distance = Math.pow((point.x - lastPointAdded.x), 2) + Math.pow((point.y - lastPointAdded.y), 2);
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

loadFile();
