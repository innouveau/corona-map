<script>
    import View from "@/classes/View";
    import region from "@/components/main/trends/region";
    import changeTools from '@/tools/change';
    import numberTools from '@/tools/number';

    export default {
        name: 'regions-shrinkage',
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
            currentMap() {
                return this.$store.state.maps.current;
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            },
            regions() {
                let regions = this.$store.getters['ui/regions'];
                return regions.filter(region => {
                    return region.getChange(this.view.offset, changeTools.daysBack / this.currentMap.settings.testDataInterval) < (1 - changeTools.margin);
                }).sort((a,b) => {
                    let ac, bc;
                    ac = a.getChange(this.view.offset, changeTools.daysBack / this.currentMap.settings.testDataInterval);
                    bc = b.getChange(this.view.offset, changeTools.daysBack / this.currentMap.settings.testDataInterval);
                    return (ac < bc) ? -1 : ((bc < ac) ? 1 : 0);
                });
            },
            typeLabel() {
                if (this.currentMap.settings.customRegionLabel) {
                    return this.currentMap.settings.customRegionLabel[this.currentLanguage.iso_code];
                } else {
                    return this.translate(this.$store.getters['ui/typeLabel'](true), true);
                }
            },
            title() {
                let title = '';
                title += this.typeLabel + ' ';
                title += this.translate('with-shrinkage').toLowerCase() + ' ';
                return title;
            }
        },
        methods: {
            formatChange(region) {
                let change = region.getChange(this.view.offset, changeTools.daysBack / this.currentMap.settings.testDataInterval);
                return numberTools.formatChange(change);
            },
            getColor(region) {
                let change = region.getChange(this.view.offset, changeTools.daysBack / this.currentMap.settings.testDataInterval);
                return changeTools.getColorForChange(change);
            }
        }
    }
</script>


<template>
    <div class="regions-shrinkage section">
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
                    <div
                        :style="{'background': getColor(region)}"
                        class="region__info">
                        {{formatChange(region)}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .regions-shrinkage {

        .region__info {
            padding: 2px;
        }
    }
</style>