<script>
    import sewagePositiveTestsBar from "../sewage-positive-tests-bar";

    export default {
        name: 'sewage-totals-positive-tests',
        components: {
            sewagePositiveTestsBar,
        },
        props: {
            cities: {
                type: Array,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            positiveTests() {
                let positiveTests, cityIndex;
                positiveTests = [];
                cityIndex = 0;

                for (let city of this.cities) {
                    let filteredDays, dayIndex;
                    dayIndex = 0;
                    filteredDays = city.report.history.filter(day => {
                        return day.offset <= this.settings.start && day.offset >= this.settings.end;
                    });
                    for (let day of filteredDays) {
                        let value = 50000 * day.positiveTests / city.population;
                        if (cityIndex === 0) {
                            positiveTests.push(value)
                        } else {
                            positiveTests[dayIndex] += value;
                        }
                        dayIndex++;
                    }
                    cityIndex++;
                }

                //console.log(positiveTests);

                return positiveTests.map(v => this.enlargementForTotal * v / this.cities.length);
            },
            enlargementForTotal() {
                return 5;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-totals-positive-tests">
        <sewage-positive-tests-bar
                v-for="positiveTest in positiveTests"
                :positive-test="positiveTest"
                :settings="settings"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-totals-positive-tests {
        position: relative;
        display: flex;
        align-items: flex-end;
        min-height: 60px;
        border-bottom: 1px solid #000;
    }
</style>