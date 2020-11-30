<script>
    import View from "@/classes/View";
    import region from "@/components/main/trends/region";

    export default {
        name: 'top-relative-week',
        components: {
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
                return this.$store.getters['signalingSystems/getItemById'](this.view.currentSource.signalingSystem_id);
            },
            thresholds() {
                return this.signalingSystem.thresholds;
            },
            regions() {
                let thresholds, regions;
                thresholds = this.thresholds;
                regions = this.$store.getters['ui/regions'];
                return regions.filter(region => {
                    let threshold = region.getThreshold(0, this.offset, this.view.currentSource);
                    return threshold === thresholds[thresholds.length - 1] || threshold === thresholds[thresholds.length - 2] || threshold === thresholds[thresholds.length - 3];
                }).sort((a,b) => {
                    if (this.signalingSystem.days === 1){
                        return (a.getTotalRelativeIncreasDay(this.offset) < b.getTotalRelativeIncreasDay(this.offset)) ? 1 : ((b.getTotalRelativeIncreasDay(this.offset) < a.getTotalRelativeIncreasDay(this.offset)) ? -1 : 0)
                    } else {
                        return (this.getValue(a) < this.getValue(b)) ? 1 : ((this.getValue(b) < this.getValue(a)) ? -1 : 0)
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
                return 'Top 10 ' + this.translate('relative') + ' ' + this.translate('increase') + ' ' + this.translate('for-7-days');
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            }
        },
        methods: {
            getValue(region) {
                return region.getTotalIncreaseOfType(this.offset, 7, this.view.currentSource.key, true);
            },
            getIndicator(region) {
                if (this.signalingSystem.days === 1) {
                    return region.getTotalRelativeIncreasDay(this.offset);
                } else if (this.signalingSystem.days === 7) {
                    return this.getValue(region);
                }
            }
        }
    }
</script>


<template>
    <div class="section top-relative-week">
        <div class="section__header">
            {{title}}:
        </div>
        <div class="section__body">
            <div class="regions__list">
                <div
                    v-for="region in regions"
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