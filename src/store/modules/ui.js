import _base from './_base-module';
import {format, sub} from 'date-fns'
import { nl } from 'date-fns/locale'


const state = {
    isPlaying: false,
    searchValue: '',
    hoverValue: '',
    currentRegionType: '',
    today: null,
    todayInMs: null,
    credits: false,
    embedPopup: false,
    menu: 'map',
    caseDataRequested: false,
    caseDataLoaded: false,
    color: 'regular',
    admin: false
};

const getters = {
    ..._base.getters,
    dateString: (state, getters, rootState, rootGetters) => (dateFormat = 'EE d MMM') => {
        let today, offset, dateOfFocus;
        today = state.today;
        if (today) {
            offset = rootState.settings.currentDateOffset * rootState.maps.current.settings.testDataInterval;
            dateOfFocus = sub(today, {days: offset});
            return format(dateOfFocus, dateFormat, {locale: nl} );
        } else {
            return '';
        }
    },
    getDateByOffset: (state) => (offset, dateFormat = 'EE d MMM') => {
        let today, dateOfFocus;
        today = state.today;
        if (today) {
            dateOfFocus = sub(today, {days: offset});
            if (dateFormat === false) {
                return dateOfFocus;
            } else {
                return format(dateOfFocus, dateFormat, {locale: nl} );
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
    getRegionOfFocus:(state, getters, rootState, rootGetters) => (region) => {
        if (region) {
            switch(state.currentRegionType) {
                case 'district':
                case 'city':
                    return region;
                case 'ggd':
                    return rootGetters['ggds/getItemByProperty']('ggd_code', region.ggd_code, true);
                case 'safety-region':
                    return rootGetters['safetyRegions/getItemByProperty']('safetyRegion_code', region.safetyRegion_code, true);
                case 'province':
                    return rootGetters['provinces/getItemByProperty']('province_code', region.province_code, true);
                case 'country':
                return rootGetters['countries/getItemById'](region.country_id);
            }
        } else {
            return null;
        }
    },
    regions(state, getters, rootState, rootGetters) {
        switch(state.currentRegionType) {
            case 'district':
                return rootState.districts.all;
            case 'city':
                return rootState.cities.all;
            case 'ggd':
                return rootState.ggds.all;
            case 'safety-region':
                return rootState.safetyRegions.all;
            case 'province':
                return rootState.provinces.all;
            case 'country':
                return rootState.countries.all;
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