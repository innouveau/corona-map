<script>
    import numberTools from '@/tools/number';
    import _Region from "@/classes/region/_Region";

    export default {
        name: 'trend-mixin',
        components: {},
        props: {},
        data() {
            return {
                list: []
            }
        },
        computed: {
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
                return regions;
            },
            interval() {
                return this.currentMap.data.positivePcrTests.interval;
            }
        },
        methods: {
            format(value, addPlus) {
                return numberTools.format(Math.round(value), addPlus);
            },
            updateList() {
                let score = [];
                this.list = [];
                for (let region of this.regions) {
                    let value = this.getValue(region);
                    if (!isFinite(value)) {
                        value = 0;
                    }
                    score.push({
                        region, value
                    })
                }
                score.sort((a,b) => b.value - a.value)
                this.list = score.slice(0, 10);
            }
        },
        mounted() {
            this.updateList();
        },
        watch: {
            currentRegionType: {
                handler: function () {
                    this.updateList();
                }
            }
        }
    }
</script>


<template></template>


<style lang="scss"></style>