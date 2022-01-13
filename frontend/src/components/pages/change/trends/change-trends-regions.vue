<script>
import View from "@/classes/View";
import region from "@/components/pages/main/trends/region";
import changeTools from '@/tools/change';
import numberTools from '@/tools/number';

export default {
    name: 'change-trends-regions',
    components: {
        region
    },
    props: {
        view: {
            type: View,
            required: true
        },
        direction: {
            type: String,
            required: true
        },
        set: {
            type: Array,
            required: true
        }
    },
    computed: {
        currentMap() {
            return this.$store.state.maps.current;
        },
        regions() {
            let sorted = this.set.sort((a,b) => {
                    return this.direction === 'top' ? b.value - a.value : a.value - b.value;
            }).map(item => item.region);
            if (sorted.length > 10) {
                return sorted.slice(0,10);
            } else {
                return sorted;
            }
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
            if (this.direction === 'top') {
                title += this.translate('with-growth').toLowerCase() + ' ';
            } else {
                title += this.translate('with-shrinkage').toLowerCase() + ' ';
            }
            title += this.translate('for', false) + ' ';
            title += this.translate(this.view.currentSource.key, false);
            return title;
        }
    },
    methods: {
        formatChange(region) {
            const change = region.getChange(this.view.offset, changeTools.daysBack / this.currentMap.data.positivePcrTests.interval);
            return numberTools.formatChange(change);
        },
        getColor(region) {
            let change = region.getChange(this.view.offset, changeTools.daysBack / this.currentMap.data.positivePcrTests.interval);
            return changeTools.getColorForChange(change);
        }
    }
}
</script>


<template>
    <div class="change-trends-regions trends-section">
        <div class="trends-section__head">
            {{title}}
        </div>
        <div class="trends-section__body">
            <div class="regions__list">
                <div
                    v-for="region in regions"
                    class="region__container">
                    <region
                        :view="view"
                        :region="region"/>
                    <div
                        :style="{'border-bottom': '2px solid ' + getColor(region)}"
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
</style>
