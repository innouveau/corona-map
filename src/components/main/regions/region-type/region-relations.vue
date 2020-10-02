<script>
    import regionType from './region-type';
    import _Region from "@/classes/_Region";
    import View from "@/classes/View";

    export default {
        name: 'region-relations',
        components: {
            regionType
        },
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            types() {
                let region, store, levels;
                region = this.region;
                store = this.$store;
                levels = [
                    {
                        showRegion: true,
                        getRegion() {
                            return region;
                        },
                        tag: 'district'
                    }, {
                        showRegion: true,
                        getRegion() {
                            return region;
                        },
                        tag: 'city'
                    },
                    {
                        showRegion: true,
                        getRegion() {
                            return store.getters['ggds/getItemByProperty']('ggd_code', region.ggd_code, true);
                        },
                        tag: 'ggd'
                    },
                    {
                        showRegion: true,
                        getRegion() {
                            return store.getters['safetyRegions/getItemByProperty']('safetyRegion_code', region.safetyRegion_code, true);
                        },
                        tag: 'safety-region'
                    },
                    {
                        showRegion: true,
                        getRegion() {
                            return store.getters['provinces/getItemByProperty']('province_code', region.province_code, true);
                        },
                        tag: 'province'
                    },
                    {
                        showRegion: true,
                        getRegion() {
                            return store.getters['countries/getItemById'](region.country_id);
                        },
                        tag: 'country'
                    }
                ];
                return levels.filter(level => {
                    return this.currentMap.settings.regionTypes.indexOf(level.tag) > -1;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-relations">
        <region-type
            v-for="type in types"
            :view="view"
            :type="type"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-relations {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        height: 30px;
    }
</style>