import _base from './_base-module';
import {format, sub} from 'date-fns'
import { nl, enGB } from 'date-fns/locale'


const state = {
    // html
    mapToolsPopup: false,
    creditsPopup: false,
    embedPopup: false,
    hamburgerMenu: false,
    searchValue: '',
    hoverValue: '',
    menu: 'map', // map | details | trends
    videoMode: false,
    showTrends: false,

    // time
    isPlaying: false,
    timeInterval: 200,

    // general
    currentRegionType: '',
    today: null,
    todayInMs: null,
    caseDataRequested: false,
    caseDataLoaded: false,
    admin: false,

    // map tools
    color: 'regular',

    //
    presets: ''
};

const getters = {
    ..._base.getters,
    dateString: (state, getters, rootState, rootGetters) => (dateFormat = 'EE d MMM') => {
        let today, offset, dateOfFocus;
        today = state.today;
        if (today) {
            offset = rootState.settings.currentDateOffset * rootState.maps.current.data.positivePcrTests.interval;
            dateOfFocus = sub(today, {days: offset});
            return format(dateOfFocus, dateFormat, {locale: nl} );
        } else {
            return '';
        }
    },
    getDateByOffset: (state) => (offset, dateFormat = 'EE d MMM yyyy', iso_code = 'en') => {
        let today, dateOfFocus, locale;
        today = state.today;

        switch(iso_code) {
            case 'nl':
                locale = nl;
                break;
            default:
                locale = enGB;
                break;
        }

        if (today) {
            dateOfFocus = sub(today, {days: offset});
            if (dateFormat === false) {
                return dateOfFocus;
            } else {
                return format(dateOfFocus, dateFormat, {locale: locale} );
            }
        } else {
            return '';
        }
    },
    module(state) {
        switch(state.currentRegionType) {
            case 'district':
                return 'districts';
            case 'city':
                return 'cities';
            case 'ggd':
                return 'ggds';
            case 'safety-region':
                return 'safetyRegions';
            case 'province':
                return 'provinces';
            case 'country':
                return 'countries';
        }
    },
    typeLabel: (state) => (plural = true) => {
        switch(state.currentRegionType) {
            case 'district':
                return plural ? "districts" : "district";
            case 'city':
                return plural ? "municipalities" : "municipality";
            case 'ggd':
                return plural ? "ggds" : "ggd";
            case 'safety-region':
                return plural ? "safety-regions" : "safety-region";
            case 'province':
                return plural ? "provinces" : "province";
            case 'country':
                return plural ? "countries" : "country";
        }
    }
};

const actions = {};

const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
