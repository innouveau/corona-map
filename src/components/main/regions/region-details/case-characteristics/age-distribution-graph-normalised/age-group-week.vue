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
            cases() {
                let cases, offset, start, ggds, firstGgd;
                cases = 0;
                ggds = this.region.getGgds();
                firstGgd = ggds[0];
                offset = (this.week * 7) + this.view.offset;
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
            },
            casesPerPopulation() {
                return Math.round(100000 * this.cases / this.population);
            },
            threshold() {
                return thresholdTools.getThreshold(this.casesPerPopulation);
            },
            color() {
                return thresholdTools.thresholdToColor(this.threshold, this.casesPerPopulation);
            },
            ageDistributionAbsolute() {
                return this.$store.state.settings.ageDistributionAbsolute;
            },
            value() {
                return this.ageDistributionAbsolute ? this.cases : this.casesPerPopulation;
            }
        },
        methods: {}
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
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-group-week {
        border-right: 1px solid #fff;
        height: 100%;
        display: flex;
        padding: 4px;
        align-items: center;
        justify-content: center;
        transition: all 0.1s ease;
        flex-shrink: 0;
        color: #fff;
    }
</style>