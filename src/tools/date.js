import {format, sub} from "date-fns";
import {nl} from "date-fns/locale";

const dayLength = 1000 * 3600 * 24;
const dateToOffsetDict = {};
const offsetToDateDict = {};

const getOffsetByDate = function(date) {
    return dateToOffsetDict[date];
};

const getDateByOffset = function(offset) {
    return offsetToDateDict[offset];
};

const formatDate = function(date, dateFormat = 'yyyy-MM-dd') {
    console.log(date);
    if (date) {
        return format(date, dateFormat, {locale: nl} );
    } else {
        return '';
    }
};

const getTimestamp = function() {
    return '?time=' + new Date().getTime();
};

const addDateOffset = function(dateString, offset) {
    dateToOffsetDict[dateString] = offset;
    offsetToDateDict[offset] = dateString;
};

export default {
    getOffsetByDate,
    getDateByOffset,
    formatDate,
    getTimestamp,
    addDateOffset
}