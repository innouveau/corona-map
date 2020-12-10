<script>
    import View from "@/classes/View";
    import region from "./region";
    import numberTools from '@/tools/number';

    export default {
        name: 'top-relative',
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
            title() {
                return 'Top 10 ' + this.translate('relative') + ' ' + this.translate('increase') + ' ' + this.translate('today');
            },
            currentRegionType() {
                return this.$store.state.ui.currentRegionType;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            regions() {
                let regions = this.$store.getters['ui/regions'];
                // check if the country has regions in this map
                if (this.currentRegionType === 'country') {
                    regions = regions.filter(country => {
                        return this.$store.state[this.currentMap.module].all.filter(r => {
                            return r.country_id === country.id;
                        }).length > 0;
                    })
                }
                return regions.sort((a,b) => {
                    let ai, bi;
                    ai = this.relativeIncreaseLastday(a);
                    bi = this.relativeIncreaseLastday(b);
                    return ai < bi ? 1 : -1;

                }).slice(0, 10);
            }
        },
        methods: {
            format(value, addPlus) {
                return numberTools.format(Math.round(value), addPlus);
            },
            relativeIncreaseLastday(region) {
                return region.getTotalIncreaseOfType(this.view.offset, 1, this.view.currentSource.key, true);
            }
        }
    }
</script>


<template>
    <div class="section top-relative">
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
                        ({{format(relativeIncreaseLastday(region))}})
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .top-relative {

    }
</style>