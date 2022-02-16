<script>
    import searchRegionResult from "./search-region-result";
    import View from "@/classes/View";

    export default {
        name: 'search-regions-results',
        components: {
            searchRegionResult
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            searchValue() {
                return this.$store.state.ui.searchValue;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            regions() {
                return this.$store.getters['regions/regionsForRegionType'];
            },
            filtered() {
                return this.regions
                    .filter(region => this.searchValue.length > 0 && region.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)
                    .sort((a,b) => (a.titleForSorting > b.titleForSorting) ? 1 : ((b.titleForSorting > a.titleForSorting) ? -1 : 0));
            }
        }
    }
</script>


<template>
    <div class="search-regions-results">
        <div
            v-if="regions.length > 0"
            class="search-regions-results__results">
            <search-region-result
                v-for="region in filtered"
                :region="region"
                :view="view"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .search-regions-results {
        position: relative;

        .search-regions-results__results {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-height: 200px;
            overflow: auto;
            background: #fff;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            z-index: 5;
        }
    }
</style>
