<script>
    import View from "@/classes/View";
    import region from "@/components/main/trends/region";
    import downloadRedRegions from "./download-red-regions";

    export default {
        name: 'red-regions',
        components: {
            downloadRedRegions,
            region
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            thresholds() {
                return this.signalingSystem.thresholds;
            },
            redRegions() {
                let thresholds, regions;
                thresholds = this.signalingSystem.thresholds;
                regions = this.$store.getters['ui/regions'];
                return regions.filter(region => {
                    return region.getThreshold(0, this.offset) === thresholds[thresholds.length - 1];
                }).sort((a,b) => {
                    if (this.signalingSystem.days === 1){
                        return (a.getTotalRelativeIncreasDay(this.offset) < b.getTotalRelativeIncreasDay(this.offset)) ? 1 : ((b.getTotalRelativeIncreasDay(this.offset) < a.getTotalRelativeIncreasDay(this.offset)) ? -1 : 0)
                    } else {
                        return (a.getTotalRelativeIncreaseWeek(this.offset) < b.getTotalRelativeIncreaseWeek(this.offset)) ? 1 : ((b.getTotalRelativeIncreaseWeek(this.offset) < a.getTotalRelativeIncreaseWeek(this.offset)) ? -1 : 0)
                    }
                }).slice(0, 10);
            },
            n() {
                return this.thresholds[this.thresholds.length - 2].n
            },
            days() {
                return this.signalingSystem.days + (this.signalingSystem.days > 1 ? ' dagen' : ' dag');
            },
            typeLabel() {
                if (this.currentMap.settings.customRegionLabel) {
                    return this.currentMap.settings.customRegionLabel[this.currentLanguage.iso_code];
                } else {
                    return this.translate(this.$store.getters['ui/typeLabel'](true), true);
                }
            },
            offset() {
                return this.view.offset;
            },
            title() {
                let title = '';
                title += this.typeLabel + ' ';
                title += this.translate('with-more-than').toLowerCase() + ' ';
                title += this.n + ' ';
                title += this.translate('positive-tests').toLowerCase() + ' ';
                title += this.translate('per') + ' 100.000 ';
                title += this.translate('inhabitants').toLowerCase();
                title += ' (max 10)';
                return title;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            }
        },
        methods: {
            getIndicator(region) {
                if (this.signalingSystem.days === 1) {
                    return region.getTotalRelativeIncreasDay(this.offset);
                } else if (this.signalingSystem.days === 7) {
                    return region.getTotalRelativeIncreaseWeek(this.offset);
                }
            }
        }
    }
</script>


<template>
    <div class="section red-regions">
        <div class="section__header">
            {{title}}:
        </div>
        <div class="section__body">
            <div class="regions__list">
                <div
                    v-for="region in redRegions"
                    class="region__container">
                    <region
                        :view="view"
                        :region="region"/>
                    <div class="region__info">
                        ({{Math.round(getIndicator(region))}})
                    </div>
                </div>
            </div>
        </div>
        <div class="section__body">
            <download-red-regions
                :regions="redRegions"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .section {
        margin-bottom: 20px;

        .section__header {
            margin-bottom: 6px;
            font-weight: 700;
        }
    }
</style>