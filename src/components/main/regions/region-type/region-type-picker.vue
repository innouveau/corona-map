<script>
    import regionType from "./region-type";
    import View from "@/classes/View";

    export default {
        name: 'region-type-picker',
        components: {
            regionType
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
            types() {
                let city, store;
                city = this.city;
                store = this.$store;
                return [
                    {
                        label: 'Stadsdeel',
                        showRegion: false,
                        tag: 'district'
                    },
                    {
                        label: 'Gemeente',
                        showRegion: false,
                        tag: 'city'
                    },
                    {
                        label: 'GGD',
                        showRegion: false,
                        tag: 'ggd'
                    },
                    {
                        label: 'Veiligheidsregio',
                        showRegion: false,
                        tag: 'safety-region'
                    },
                    {
                        label: 'Provincie',
                        showRegion: false,
                        tag: 'province'
                    },
                    {
                        label: 'Land',
                        showRegion: false,
                        tag: 'country'
                    }
                ].filter(type => {
                    return this.currentMap.settings.regionTypes.indexOf(type.tag) > -1;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-type-picker">
        <div
            v-if="types.length > 1"
            class="region-type-picker__container">
            <region-type
                v-for="type in types"
                :view="view"
                :type="type"
                :n="types.length"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-type-picker {

        .region-type-picker__container {
            display: flex;
            flex-wrap: wrap;
            height: 100%;
            border-bottom: 1px solid #ddd;
            border-top: 1px solid #ddd;
            border-left: 1px solid #ddd;
        }
    }
</style>