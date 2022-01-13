<script>
    import View from "@/classes/View";
    import city from "@/components/pages/main/trends/city";
    import swatch from "@/components/region/swatch";

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
            currentMap() {
                return this.$store.state.maps.current;
            },
            n() {
                return this.thresholds[this.thresholds.length - 2].n
            },
            signalingSystem() {
                return this.$store.getters['signalingSystems/getItemById'](this.view.currentSource.signalingSystem_id);
            },
            thresholds() {
                return this.signalingSystem.thresholds;
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            },
            typeLabel() {
                if (this.currentMap.settings.customRegionLabel) {
                    return this.currentMap.settings.customRegionLabel[this.currentLanguage.iso_code].toLowerCase();
                } else {
                    return this.translate(this.$store.getters['ui/typeLabel'](true));
                }
            },
            title() {
                let title = '';
                title += this.translate('number', true) + ' ';
                title += this.typeLabel + ' ';
                title += this.translate('per') + ' ';
                title += this.translate('signal-value').toLowerCase();
                return title;
            },
            source() {
                return this.view.currentSource;
            }
        },
        methods: {
            getRegions(threshold) {
                let regions = this.$store.getters['ui/regions'];

                const getTotalRelativeIncreaseWeek = (region) => {
                    return region.getTotalIncreaseOfType(this.view.offset, 7, 'positiveTests', true);
                };

                return regions.filter(region => {
                    return region.getThreshold(0, this.view.offset, this.source) === threshold;
                }).sort((a,b) => (getTotalRelativeIncreaseWeek(a) < getTotalRelativeIncreaseWeek(b)) ? 1 : ((getTotalRelativeIncreaseWeek(b) < getTotalRelativeIncreaseWeek(a)) ? -1 : 0));
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
