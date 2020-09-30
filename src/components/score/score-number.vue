<script>
    import View from "@/classes/View";

    export default {
        name: 'score-number',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            },
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            regions() {
                let module = this.currentMap.module;
                return this.$store.state[module].all.filter(region => {
                    return region.parent_code === this.view.parent.code;
                })
            },
            population() {
                let population = 0;
                for (let region of this.regions) {
                    population += region.getTotalPopulation();
                }
                return population
            },
            casesInSevenDays() {
                let cases = 0;
                for (let region of this.regions) {
                    cases += region.getIncreaseWeek(0, this.view.offset);
                }
                return cases
            },
            casesNormalised() {
                return Math.round(100000 * this.casesInSevenDays / this.population);
            },
            maxDoublings() {
                return 7;
            },
            doublings() {
                return Math.floor(Math.log(this.casesNormalised) / Math.log(2));
            },
            score() {
                return this.maxDoublings - this.doublings;
            },
            maxCases() {
                return Math.pow(2, this.maxDoublings);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="score-number">
        <div class="score-number__main">
            {{score}}

            <div class="score-number__sub">
                Verdubbelingen minder dan {{maxDoublings}} verdubbelingen ({{maxCases}})
                van 1 case per 100.000 inwoners per 7 dagen: <b>{{casesNormalised}}</b>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .score-number {
        display: flex;
        align-items: center;
        justify-content: center;

        .score-number__main {
            font-size: 60px;
            font-weight: 400;
            position: relative;

            .score-number__sub {
                position: absolute;
                left: calc(100% + 8px);
                top: 50%;
                transform: translateY(-50%);
                font-size: 9px;
                width: 160px;
                color: #888
            }
        }

    }
</style>