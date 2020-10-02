<script>
    import _Region from "@/classes/_Region";
    import View from "@/classes/View";
    import translate from "@/components/elements/translate";

    export default {
        name: 'region-details-numbers',
        components: {
            translate
        },
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            },
            short: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            hasDays() {
                return this.$store.state.maps.current.settings.testDataInterval === 1;
            },
        },
        methods: {
            format(value) {
                if (value > 0) {
                    return '+' + value;
                } else {
                    return value;
                }
            }
        }
    }
</script>


<template>
    <div class="region-details-numbers">
        <div class="region-details__section">
            <div class="region-details__row">
                <div class="region-details__label">
                    <translate :word="'population'"/>
                </div>
                <div class="region-details__value">
                    {{region.getTotalPopulation()}}
                </div>
            </div>
        </div>
        <div class="region-details__section">
            <div
                v-if="hasDays && !short"
                class="region-details__row">
                <div class="region-details__label">
                    Toename vandaag
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseDay(0, view.offset))}}
                </div>
            </div>
            <div v-if="hasDays && !short" class="region-details__row">
                <div class="region-details__label">
                    Relatieve toename vandaag (per 100.000 inw)
                </div>
                <div class="region-details__value">
                    {{format(Math.round(region.getTotalRelativeIncreasDay(view.offset)))}}
                </div>
            </div>
            <div
                v-if="!short"
                class="region-details__row">
                <div class="region-details__label">
                    Toename laatste 7 dagen
                </div>
                <div class="region-details__value">
                    {{format(region.getTotalIncreaseWeek(0, view.offset))}}
                </div>
            </div>
            <div class="region-details__row">
                <div class="region-details__label">
                    Relatieve toename laatste 7 dagen (per 100.000 inw)
                </div>
                <div class="region-details__value">
                    {{format(Math.round(region.getTotalRelativeIncreaseWeek(view.offset)))}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-numbers {

    }
</style>