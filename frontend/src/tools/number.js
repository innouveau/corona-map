const format = function(value, addPlus = true) {
    if (value > 0) {
        let v = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return addPlus ? ('+' + v) : v;
    } else {
        return value;
    }
};

const formatChange = function(value) {
    let pct = Math.round(value * 100) - 100;
    if (pct > 0) {
        return '+' + pct + '%';
    } else if (pct === 0) {
        return '0%';
    } else {
        return pct + '%';
    }
};

export default {
    format,
    formatChange
};