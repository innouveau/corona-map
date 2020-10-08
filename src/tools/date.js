import {format, sub} from "date-fns";
import {nl} from "date-fns/locale";
import store from '@/store/store';

const dayLength = 1000 * 3600 * 24;

const getDateOffset = function(dateBase, date1) {
    return Math.round(dateBase - date1) / dayLength;
};

const getDateByOffset = function(offset) {
    let today = store.state.ui.todayInMs;
    if (today) {
        return new Date(today - (offset * dayLength));
    } else {
        return null;
    }
};

const formatDate = function(date, dateFormat = 'yyyy-MM-dd') {
    if (date) {
        return format(date, dateFormat, {locale: nl} );
    } else {
        return '';
    }
};

const getTimestamp = function() {
    return '?time=' + new Date().getTime();
};

export default {
    getDateOffset,
    getDateByOffset,
    formatDate,
    getTimestamp
}