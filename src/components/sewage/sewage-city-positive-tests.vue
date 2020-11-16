<script>
    import City from "@/classes/City";
    import sewagePositiveTestsBar from "./sewage-positive-tests-bar";

    export default {
        name: 'sewage-city-positive-tests',
        components: {
            sewagePositiveTestsBar
        },
        props: {
            city: {
                type: City,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            positiveTests() {
                return this.city.report.history.filter(day => {
                    return day.offset <= this.settings.start && day.offset >= this.settings.end;
                }).map(d => {
                    return this.getRelative(d.positiveTests);
                })
            },
            maxHeight() {
                return Math.max(...this.positiveTests) + 10;
            },
            average() {
                return Math.round(7 * this.positiveTests.reduce((a, b) => a + b, 0) / this.positiveTests.length);
            }
        },
        methods: {
            getRelative(value) {
                return 50000 * value / this.city.population;
            }
        }
    }
</script>


<template>
    <div class="sewage-city-positive-tests">
        <div
            :style="{'height': maxHeight + 'px'}"
            class="sewage-city-positive-tests__graph">
            <sewage-positive-tests-bar
                v-for="positiveTest in positiveTests"
                :positive-test="positiveTest"
                :settings="settings"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city-positive-tests {
        display: flex;
        margin-bottom: 2px;

        .sewage-city-positive-tests__graph {
            position: relative;
            display: flex;
            align-items: flex-end;
            min-height: 60px;
            border-bottom: 1px solid #888;
            padding-bottom: 2px;
        }
    }
</style>