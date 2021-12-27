const x0 = 155000;
const y0 = 463000;
const phi0 = 52.15517440;
const lam0 = 5.38720621;

// Coefficients or the conversion from RD to WGS84
const Kp = [0, 2, 0, 2, 0, 2, 1, 4, 2, 4, 1];
const Kq = [1, 0, 2, 1, 3, 2, 0, 0, 3, 1, 1];
const Kpq = [3235.65389, -32.58297, -0.24750, -0.84978, -0.06550, -0.01709, -0.00738, 0.00530, -0.00039, 0.00033, -0.00012];

const Lp = [1, 1, 1, 3, 1, 3, 0, 3, 1, 0, 2, 5];
const Lq = [0, 1, 2, 0, 3, 1, 1, 2, 4, 2, 0, 0];
const Lpq = [5260.52916, 105.94684, 2.45656, -0.81885, 0.05594, -0.05607, 0.01199, -0.00256, 0.00128, 0.00022, -0.00022, 0.00026];
// Coefficients for the conversion from WGS84 to RD
const Rp = [0, 1, 2, 0, 1, 3, 1, 0, 2];
const Rq = [1, 1, 1, 3, 0, 1, 3, 2, 3];
const Rpq = [190094.945, -11832.228, -114.221, -32.391, -0.705, -2.340, -0.608, -0.008, 0.148];

const Sp = [1, 0, 2, 1, 3, 0, 2, 1, 0, 1];
const Sq = [0, 2, 0, 2, 0, 1, 2, 1, 4, 4];
const Spq = [309056.544, 3638.893, 73.077, -157.984, 59.788, 0.433, -6.439, -0.032, 0.092, -0.054];

function RdToGws(x, y) {
    let dx, dy, latitude, longitude;
    dx = 1E-5 * (x - x0);
    dy = 1E-5 * (y - y0);

    latitude = 0;
    longitude = 0;

    for (let i = 0, l = Kpq.length; i < l; i++) {
        let value = Kpq[i];
        latitude += value * Math.pow(dx, Kp[i]) * Math.pow(dy, Kq[i]);
    }

    for (let i = 0, l = Lpq.length; i < l; i++) {
        let value = Lpq[i];
        longitude += value * Math.pow(dx, Lp[i]) * Math.pow(dy, Lq[i]);
    }

    latitude /= 3600;
    longitude /= 3600;

    latitude += phi0;
    longitude += lam0;

    return {
        x: longitude,
        y: latitude
    }
}