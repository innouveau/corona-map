const format = function(value, addPlus = true) {
    if (value > 0) {
        let v = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return addPlus ? ('+' + v) : v;
    } else {
        return value;
    }
};

export default {
    format
};