<script>
    import View from "@/classes/View";
    import city from "@/components/main/trends/city";
    import swatch from "@/components/elements/swatch";

    export default {
        name: 'threshold-regions',
        components: {
            swatch,
            city
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            n() {
                return this.thresholds[this.thresholds.length - 2].n
            },
            thresholds() {
                return this.$store.state.signalingSystems.current.thresholds;
            },
            typeLabel() {
                return this.$store.getters['ui/typeLabel'](true).toLowerCase();
            },
            title() {
                let title = '';
                title += this.translate('number') + ' ';
                title += this.typeLabel + ' ';
                title += this.translate('per') + ' ';
                title += this.translate('signal-value').toLowerCase();
                return title;
            }
        },
        methods: {
            getRegions(threshold) {
                let regions = this.$store.getters['ui/regions'];
                return regions.filter(region => {
                    return region.getThreshold(0, this.view.offset) === threshold;
                }).sort((a,b) => (a.getTotalRelativeIncreaseWeek(this.view.offset) < b.getTotalRelativeIncreaseWeek(this.view.offset)) ? 1 : ((b.getTotalRelativeIncreaseWeek(this.view.offset) < a.getTotalRelativeIncreaseWeek(this.view.offset)) ? -1 : 0));
            }
        }
    }
</script>


<template>
    <div class="section threshold-regions">
        <div class="section__header">
            {{title}}
        </div>
        <div class="section__body">
            <div
                v-for="threshold in thresholds"
                class="threshold-regions__row">
                <div class="threshold-regions__swatch">
                    <swatch :threshold="threshold"/>
                </div>
                <div class="threshold-regions__label">
                    {{getRegions(threshold).length}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .threshold-regions {

        .threshold-regions__row {
            display: flex;
            align-items: center;

            .threshold-regions__swatch {
                margin-right: 10px;
            }
        }
    }
</style>