const standardPcrTestAdapter = {
    titleKey: 'Land/regio',
    positiveTestsKey: '',
    findColumn: function(column) {
        return column.indexOf('20') > -1;
    }
};

export {
    standardPcrTestAdapter
}