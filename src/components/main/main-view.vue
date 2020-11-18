<script>
    import headerMenu from "./header-menu";
    import trends from "./trends/trends";
    import regionDetails from "./regions/region-details/region-details";
    import embedPopup from "./embed/embed-popup";
    import View from "@/classes/View";
    import query from '@/components/elements/query'
    import dateTools from '@/tools/date';
    import mainViewMap from "./main-view-map";


    export default {
        name: 'standard-view',
        components: {
            mainViewMap,
            embedPopup,
            trends,
            headerMenu,
            regionDetails
        },
        props: {},
        mixins: [query],
        data() {
            return {
                view: new View({id: 1})
            }
        },
        computed: {
            showEmbedPopup() {
                return this.$store.state.ui.embedPopup;
            },
            currentRegion() {
                return this.view.currentRegion;
            },
            currentMap() {
                return this.$store.state.maps.current;
            }
        },
        methods: {
            readQuery() {
                let region, string, offset;
                if (this.$route.query.region) {
                    string = decodeURI(this.$route.query.region);
                    region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', string, true);
                    if (region) {
                        this.view.currentRegion = region;
                    }
                }
                if (this.$route.query.date) {
                    offset = dateTools.getOffsetByDate(this.$route.query.date);
                    this.view.offset = offset;
                }
                if (this.$route.query.admin) {
                    this.$store.commit('ui/updateProperty', {key: 'admin', value: true});
                }
            }
        },
        mounted() {
            this.readQuery();
        }
    }
</script>


<template>
    <div class="standard-view">
        <header-menu
            :view="view"
            :editable="true"/>

        <div class="content">

            <main-view-map :view="view"/>

            <region-details
                v-if="currentRegion"
                :view="view"
                :region="currentRegion"/>

            <div
                v-else
                class="region-details region-details--mobile">
                Kies eerst een gemeente op de kaart.
            </div>

            <trends :view="view"/>
        </div>

        <embed-popup v-if="showEmbedPopup"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .standard-view {
        height: 100%;

        .content {
            display: flex;
            height: calc(100% - 48px);

            .standard-view-map {
                width: calc(100% - 750px);
            }

            .trends {
                width: 300px;
            }

            .region-details {
                // 5 * 70 + 32 + scrollbar + 50
                width: 450px;
            }

            .region-details--mobile {
                padding: 20px;
                display: none;
            }
        }

        @include mobile() {

            .header-menu {
                height: 80px;
            }

            .content {
                display: block;
                position: relative;
                height: calc(100% - 80px);

                .region-details--mobile {
                    display: block;
                }
            }
        }
    }
</style>