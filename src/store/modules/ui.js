import _base from './_base-module';
import {format, sub} from 'date-fns'
import { nl } from 'date-fns/locale'


const state = {
    searchValue: '',
    hoverValue: '',
    currentRegionType: '',
    today: null,
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
    dateString(state, getters, rootState, rootGetters) {
        let today, offset, dateOfFocus;
        today = state.today;
        if (today) {
            offset = rootState.settings.currentDateOffset * rootState.maps.current.settings.testDataInterval;
            dateOfFocus = sub(today, {days: offset});
            return format(dateOfFocus, 'EE d MMM', {locale: nl} );
        } else {
            return '';
        }
    },
    getDateByOffset: (state) => (offset, dateFormat = 'EE d MMM') => {
        let today, dateOfFocus;
        today = state.today;
        if (today) {
            dateOfFocus = sub(today, {days: offset});
            return format(dateOfFocus, dateFormat, {locale: nl} );
        } else {
            return '';
        }
    },
    currentRegion(state, getters, rootState, rootGetters) {
        let city = state.currentRegion;
        if (city) {
            switch(state.currentRegionType) {
                case 'city':
                    return city;
                case 'ggd':
                    return rootGetters['ggds/getItemByProperty']('ggd_code', city.ggd_code, true);
                case 'sr':
                    return rootGetters['safetyRegions/getItemByProperty']('safetyRegion_code', city.safetyRegion_code, true);
                case 'country':
                    return rootGetters['countries/getItemById'](city.country_id);
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
            case 'country':
                return rootState.countries.all;
        }
    },
    typeLabel: (state) => (plural = true) => {
        switch(state.currentRegionType) {
            case 'district':
                return plural ? "Stadsdelen" : "Stadsdeel";
            case 'city':
                return plural ? "Gemeentes" : "Gemeente";
            case 'ggd':
                return plural ? "GGD'en" : "GGD";
            case 'sr':
                return plural ? "Veiligheidsregio's" : "Veiligheidsregio";
            case 'country':
                return plural ? "Landen" : "Land";
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