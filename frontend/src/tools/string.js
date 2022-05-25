const titleForSorting = function (title) {
    if (title[0] === "'") {
        return title.substring(3).toLowerCase();
    } else {
        return title.toLowerCase();
    }
};

export default {
    titleForSorting,
};
