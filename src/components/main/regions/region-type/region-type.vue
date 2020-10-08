<script>
    import swatch from "@/components/elements/swatch";
    import * as d3 from "d3";
    import View from "@/classes/View";
    import dateTool from "@/tools/date";

    export default {
        name: 'region-type',
        components: {
            swatch
        },
        props: {
            view: {
                type: View,
                required: true
            },
            type: {
                type: Object,
                required: true
            },
            n: {
                type: Number,
                required: false,
                default: 1
            }
        },
        computed: {
            isActive() {
                return this.$store.state.ui.currentRegionType === this.type.tag;
            },
            caseDataRequested() {
                return this.$store.state.ui.caseDataRequested;
            },
            ggds() {
                return this.$store.state.ggds.all;
            },
            width() {
                if (this.type.showRegion) {
                    return 'auto';
                } else {
                    return 'calc(100% / ' + this.n + ')';
                }
            }
        },
        methods: {
            select() {
                this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.type.tag});
                if ((this.type.tag === 'ggd' || this.type.tag === 'country') && !this.caseDataRequested){
                    this.loadCaseData();
                }
            },
            loadCaseData() {
                let url = window.config.dataUrl + 'data-dashboards/cases_ggd_agegroups.csv' + dateTool.getTimestamp();
                this.$store.commit('ui/updateProperty', {key: 'caseDataRequested', value: true});
                d3.csv(url)
                    .then((data) => {
                        this.sortEntries(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            sortEntries(entries) {
                let ggds = this.ggds.map(ggd => {
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
                        console.log(entry);
                    }
                }

                for (let ggdData of ggds) {
                    let ggd = this.$store.getters['ggds/getItemByProperty']('ggd_code', ggdData.ggd_code, true);
                    addPercentages(ggdData);

                    // if (ggd.ggd_code === 'GG3406') {
                    //     let x = 44;
                    //     console.log(ggd);
                    //     console.log(ggdData.report[x].date);
                    //     console.log(ggdData.report[x].total);
                    //     console.log(ggdData.report[x].ageGroups.map(a => {
                    //         return {...a};
                    //     }));
                    // }
                    this.$store.commit('ggds/updatePropertyOfItem', {item: ggd, property: 'ageGroupReport', value: ggdData.report});
                }

                this.$store.commit('ui/updateProperty', {key: 'caseDataLoaded', value: true});
            }
        }
    }
</script>


<template>
    <div
        @click="select()"
        :class="{
            'region-type--current': isActive,
            'region-type--with-region': type.showRegion
        }"
        :style="{'width': width}"
        class="region-type">
        <div
            v-if="type.showRegion"
            class="region-type__region">
            <swatch
                :threshold="type.getRegion().getThreshold(0, view.offset)"/>
            <div class="region-type__value">
                {{type.getRegion().title}}
            </div>
        </div>
        <div
            v-else
            class="region-type__label">
            {{translate(type.tag, true)}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-type {
        position: relative;
        cursor: pointer;

        .region-type__region {
            display: flex;
            align-items: center;
            font-size: 10px;
            border-bottom: 1px solid transparent;
        }

        &.region-type--with-region {

            margin-right: 16px;

            &:after {
                content: '»';
                position: absolute;
                right: -11px;
                top: -5px;
            }

            &:last-child {
                margin-right: 0;

                &:after {
                    display: none;
                }
            }
        }

        &:not(.region-type--with-region) {
            height: 100%;

            .region-type__label {
                padding: 4px;
                border-right: 1px solid #ddd;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
            }
        }

        &.region-type--current {

            .region-type__region {
                border-bottom: 1px solid #000;
            }

            .region-type__label {
                background: #ddd;
            }

        }
    }
</style>