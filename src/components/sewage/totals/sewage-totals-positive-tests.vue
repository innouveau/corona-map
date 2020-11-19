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

                return positiveTests.map(v => v / this.cities.length);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-totals-positive-tests sewage-city-positive-tests">
        <div class="sewage-city-positive-tests__graph">
            <sewage-positive-tests-bar
                    v-for="positiveTest in positiveTests"
                    :positive-test="positiveTest"
                    :settings="settings"
                    :size="3"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-totals-positive-tests {

    }
</style>