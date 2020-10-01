<script>
    import searchRegionsResults from "./search-regions-results";
    import View from "@/classes/View";

    export default {
        name: 'search-regions',
        components: {
            searchRegionsResults
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
            hoverValue() {
                return this.$store.state.ui.hoverValue;
            },
            regionType() {
                return 'Zoek of klik op de kaart';
                //return 'Zoek ' + this.$store.getters['ui/typeLabel'](false).toLowerCase() + ' of klik op de kaart';
            }
        },
        methods: {
            updateSearchValue(ev) {
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ev.target.value});
            }
        }
    }
</script>


<template>
    <div class="search-regions">
        <input
            :value="searchValue"
            @keyup="updateSearchValue"
            :placeholder="regionType">
        <div
            v-if="hoverValue.length > 0"
            class="hover-value">{{hoverValue}}</div>
        <search-regions-results
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .search-regions {
        position: relative;

        input {
            width: 100%;
        }

        .hover-value {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 36px;
            background: #ddd;
            padding: 10px;
            display: flex;
            align-items: center;
            z-index: 1;
        }
    }
</style>