<script>
    import GGD from "@/classes/region/GGD";
    import Country from "@/classes/region/Country";
    import thresholdTools from "@/tools/thresholds";
    import View from "@/classes/View";

    export default {
        name: 'age-group-week',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: GGD | Country,
                required: true
            },
            ageGroup: {
                type: Object,
                required: true
            },
            week: {
                type: Number,
                required: true
            },
            population: {
                type: Number,
                required: true
            }
        },
        computed: {
            width() {
                return 7 * this.$store.state.settings.step;
            },
            casesPreviousWeek() {
                return this.getCases(this.week + 1);
            },
            casesThisWeek() {
                return this.getCases(this.week);
            },
            casesPerPopulation() {
                return Math.round(100000 * this.casesThisWeek / this.population);
            },
            threshold() {
                return thresholdTools.getThreshold(this.casesPerPopulation, this.view.currentSource);
            },
            color() {
                return thresholdTools.thresholdToColor(this.threshold, this.casesPerPopulation, this.view.currentSource);
            },
            ageDistributionAbsolute() {
                return this.$store.state.settings.ageDistributionAbsolute;
            },
            value() {
                return this.ageDistributionAbsolute ? this.casesThisWeek : this.casesPerPopulation;
            },
            growth() {
                return Math.round(100 * ((this.casesThisWeek / this.casesPreviousWeek) - 1));
            }
        },
        methods: {
            getCases(week) {
                let cases, offset, start, ggds, firstGgd;
                cases = 0;
                ggds = this.region.getGgds();
                firstGgd = ggds[0];
                offset = (week * 7) + this.view.offset;
                start = firstGgd.ageGroupReport.length - 1 - offset;
                for (let i = start; i > start - 7; i--) {
                    let date, day, ageGroup;
                    date = this.$store.getters['ui/getDateByOffset'](offset, 'yyyy-MM-dd');
                    offset++;
                    for (let ggd of ggds) {
                        day = ggd.ageGroupReport.find(d => d.date === date);
                        if (day) {
                            ageGroup = day.ageGroups.find(a => a.title === this.ageGroup.title);
                            if (ageGroup) {
                                cases += ageGroup.cases;
                            }
                        }
                    }
                }
                return cases;
            }
        }
    }
</script>


<template>
    <div
        :style="{
            'width': width + 'px',
            'background': color
        }"
        class="age-group-week">
        {{value}}
        <div
            :class="{'age-group-week__growth--negative': growth < 0}"
            class="age-group-week__growth">
            {{growth}}%
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-group-week {
        border-right: 1px solid #fff;
        height: 100%;
        display: flex;
        padding: 0 12px;
        align-items: center;
        transition: all 0.1s ease;
        flex-shrink: 0;
        color: #fff;
        position: relative;

        .age-group-week__growth {
            position: absolute;
            right: 4px;
            top: 4px;
            font-size: 10px;
            background: #fff;
            padding: 1px 2px;
            color: #000;

            &.age-group-week__growth--negative {
                background: greenyellow;
            }
        }
    }
</style>