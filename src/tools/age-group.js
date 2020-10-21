import * as d3 from "d3";
import dateTool from "@/tools/date";
import store from '@/store/store';

const load = function() {
    let url = window.config.dataUrl + 'data-dashboards/cases_ggd_agegroups.csv' + dateTool.getTimestamp();
    store.commit('ui/updateProperty', {key: 'caseDataRequested', value: true});
    d3.csv(url)
        .then((data) => {
            sortEntries(data);
        })
        .catch((error) => {
            console.error(error);
        });
};

const sortEntries = function(entries) {
    let ggds = store.state.ggds.all.map(ggd => {
        return {ggd_code: ggd.ggd_code, report: []};
    });

    function getGgd(code) {
        return ggds.find(ggd => ggd.ggd_code === code);
    }

    function getDay(ggd, date) {
        let day = ggd.report.find(day => day.date === date);
        if (!day) {
            day = {
                date: date,
                total: 0,
                ageGroups: []};
            ggd.report.push(day);
        }
        return day;
    }

    function addPercentages(ggd) {
        for (let day of ggd.report) {
            for (let ageGroup of day.ageGroups) {
                ageGroup.percentage = ageGroup.cases / day.total;
            }
        }
    }

    for (let entry of entries) {
        let ggd, day;
        ggd = getGgd(entry.ggd_code);
        if (ggd) {
            day = getDay(ggd, entry.date);
            day.total += Number(entry.cases);
            day.ageGroups.push({
                title: entry.age_group,
                cases: Number(entry.cases)
            });
        } else {
            //console.log(entry);
        }
    }

    for (let ggdData of ggds) {
        let ggd = store.getters['ggds/getItemByProperty']('ggd_code', ggdData.ggd_code, true);
        addPercentages(ggdData);

        store.commit('ggds/updatePropertyOfItem', {item: ggd, property: 'ageGroupReport', value: ggdData.report});
    }

    store.commit('ui/updateProperty', {key: 'caseDataLoaded', value: true});
};

export default {
    load
}