<script>
    import GGD from "@/classes/region/GGD";
    import Country from "@/classes/region/Country";
    import * as d3 from "d3";
    import ageGroups from "./age-groups";


    export default {
        name: 'age-distribution-graph',
        components: {
            ageGroups
        },
        props: {
            region: {
                type: GGD | Country,
                required: true
            }
        },
        data() {
            return {
                svg: null,
                lineContainer: null,
                width: 280,
                height: 250,
                step: 20,
            }
        },
        computed: {
            ggds() {
                return this.region.getGgds();
            },
            ageGroups() {
                return this.$store.state.ageGroups.all.filter(a => a.active);
            },
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            todayInMs() {
                return this.$store.state.ui.today.getTime() - (this.currentDateOffset * this.msPerDay);
            },
            msPerDay() {
                return 1000 * 3600 * 24;
            },
            report() {
                return this.region.report;
            },
            lines(){
                function getPercentageForAgeGroup(day, ageGroupTitle) {
                    let ageGroup = day.ageGroups.find(ageGroup => ageGroup.title === ageGroupTitle);
                    if (ageGroup) {
                        return ageGroup.percentage;
                    } else {
                        return 0;
                    }
                }

                if (!this.report) {
                    return [];
                }

                return this.ageGroups.map((ageGroup, ageGroupIndex) => {
                    let cases = this.report.map(day => {
                        return {
                            date: day.date,
                            percentage: getPercentageForAgeGroup(day, ageGroup.title),
                            ageGroupIndex
                        }
                    });
                    return {
                        title: ageGroup.title,
                        color: ageGroup.color,
                        cases
                    }
                })
            }
        },
        methods: {
            checkForReport() {
                if (this.region.regionType === 'country' && !this.region.report) {
                    let report, sorted;
                    report = [];

                    function getDay(day) {
                        for (let cumulativeDay of report) {
                            if (cumulativeDay.date === day.date) {
                                return cumulativeDay;
                            }
                        }
                    }

                    function getAgeGroup(ageGroup, cumulativeDay) {
                        for (let cumulativeAgeGroup of cumulativeDay.ageGroups) {
                            if (cumulativeAgeGroup.title === ageGroup.title) {
                                return cumulativeAgeGroup;
                            }
                        }
                    }

                    function mergeDays(cumulativeDay, day) {
                        cumulativeDay.total += day.total;
                        for (let ageGroup of day.ageGroups) {
                            let cumulativeAgeGroup = getAgeGroup(ageGroup, cumulativeDay);
                            if (!cumulativeAgeGroup) {
                                cumulativeDay.ageGroups.push({...ageGroup})
                            } else {
                                cumulativeAgeGroup.cases += ageGroup.cases;
                            }
                        }
                    }

                    function createDay(day) {
                        return {
                            date: day.date,
                            total: day.total,
                            ageGroups: day.ageGroups.map(ageGroup => {
                                return {...ageGroup};
                            })
                        };
                    }

                    for (let ggd of this.ggds) {
                        for (let day of ggd.report) {
                            let cumulativeDay = getDay(day);
                            if (!cumulativeDay) {
                                report.push(createDay(day));
                            } else {
                                mergeDays(cumulativeDay, day);
                            }
                        }
                    }


                    sorted = report.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

                    for (let day of sorted) {
                        for (let ageGroup of day.ageGroups) {
                            ageGroup.percentage = ageGroup.cases / day.total;
                        }
                    }

                    this.region.report = sorted;
                }
            },
            init(){
                this.svg = d3.select(this.$refs.container).select('svg');
                this.lineContainer = this.svg.append('g').attr('class', 'line-container');
                this.draw();
            },
            draw() {
                this.checkForReport();
                this.clear();
                this.drawGraph();
            },
            clear() {
                this.lineContainer.selectAll('*').remove();
            },
            drawGraph() {
                this.drawLines();
            },
            drawLines() {
                let lineFunction, getX, getY, scale;
                scale = this.scale;

                getX = (date) => {
                    let dateInMs, daysOffset;
                    dateInMs = new Date(date).getTime();
                    daysOffset = (this.todayInMs - dateInMs) / this.msPerDay;
                    return this.width - (daysOffset * this.step);
                };

                getY = (day) => {
                    let expectedMaxPct, smoothen, value, l;
                    l = 7;
                    expectedMaxPct = 50;
                    smoothen = true;
                    if (smoothen) {
                        let ageGroup, index, total, thisL;
                        ageGroup = this.lines[day.ageGroupIndex];
                        index = ageGroup.cases.indexOf(day);
                        thisL = Math.min(l, (index + 1));
                        total = 0;
                        for (let i = index; i > (index - thisL); i--) {
                            let thisDay = ageGroup.cases[i];
                            total += thisDay.percentage;
                        }
                        value = total / thisL;
                        if (thisL === 0) {
                            console.log("!");
                        }
                        //console.log(value);
                    } else {
                        value =  day.percentage;
                    }
                    return this.height - ((100 / expectedMaxPct) * this.height * value);
                };

                lineFunction = d3.line()
                    .x((day) => {
                        return getX(day.date);
                    })
                    .y((day) => {
                        return getY(day);
                    })
                    .curve(d3.curveMonotoneX);

                this.lineContainer.selectAll('path')
                    .data(this.lines)
                    .enter()
                    .append('path')
                    .attr('d', (d) => {
                        return lineFunction(d.cases)
                    })
                    .attr('stroke-width', 1)
                    .attr('stroke', (d) => {
                        return d.color;
                    })
                    .on('mouseover', (d) => {
                        let ageGroup = this.$store.getters['ageGroups/getItemByProperty']('title', d.title);
                        this.$store.commit('ageGroups/setCurrent', ageGroup);
                    })
                    .on('mouseout', (d) => {
                        this.$store.commit('ageGroups/setCurrent', {key: 'currentAgeGroup', value: null});
                    })

            },
        },
        mounted() {
            this.init();
        },
        watch: {
            region: {
                handler: function() {
                    setTimeout(() => {
                        this.draw();
                    })
                }
            },
            currentDateOffset: {
                handler: function() {
                    setTimeout(() => {
                        this.draw();
                    })
                }
            },
            ageGroups: {
                handler: function() {
                    setTimeout(() => {
                        this.draw();
                    })
                },
                deep: true
            }
        }
    }
</script>


<template>
    <div
        ref="container"
        class="age-distribution-graph">

        <div class="age-distribution-graph__wrapper">

            <div
                 :style="{width: width + 'px', height: height + 'px'}"
                class="age-distribution-graph__container">
                <svg ></svg>
                <div class="age-distribution-graph-cover"></div>
            </div>


            <age-groups/>
        </div>


        <div class="age-distribution-graph__label">
            Leeftijdsgroep als aandeel op geheel van de dag, trend uitgemiddeld over 3 dagen.
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-distribution-graph {


        .age-distribution-graph__wrapper {
            display: flex;

            .age-distribution-graph__container {
                margin-right: 6px;
                position: relative;

                svg {
                    background: #eee;
                    width: 100%;
                    height: 100%;

                    path {
                        fill: transparent;
                    }
                }

                .age-distribution-graph-cover {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 30px;
                    height: 100%;
                    background: #eee;

                    &:after {
                        background-image: linear-gradient(to right, rgba(0,0,0,0), #eee);
                        position: absolute;
                        left: -20px;
                        top: 0;
                        width: 20px;
                        height: 100%;
                        content: '';
                    }
                }
            }
        }

        .age-distribution-graph__label {
            margin-top: 4px;
            font-size: 11px;
            font-style: italic;
        }

        @include mobile() {

            .age-distribution-graph__wrapper {
                display: block;

                .age-distribution-graph__container {
                    margin-right: 0;
                }
            }
        }
    }
</style>