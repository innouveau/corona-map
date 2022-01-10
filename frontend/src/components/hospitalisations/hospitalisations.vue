<script>
    import viewItem from "@/components/view/view-item";
    import View from '@/classes/View';
    import MapSignaling from "@/components/_map/Map";
    import HeaderMenu from "@/components/_pages/main/header-menu";
    import ViewTools from "../view/view-tools";
    import DownloadImageHospitalisations
        from "../map/download/download-hospitalisations";

    export default {
        name: 'hospitalisations',
        components: {
            DownloadImageHospitalisations,
            ViewTools,
            HeaderMenu,
            MapSignaling,
            viewItem
        },
        props: {},
        data(){
            let views = this.$store.state.sources.all.map(source => {
                return new View({
                    currentSource: source
                });
            }).sort((a,b) => (a.order > b.order) ? -1 : ((b.order > a.order) ? 1 : 0));
            return {
                views
            }
        },
        computed: {
            mainView() {
                return this.views[0]
            },
            offset() {
                return this.mainView.offset;
            }
        },
        methods: {},
        watch: {
            offset: function () {
                this.views[1].offset = this.offset;
                this.views[2].offset = this.offset;
            }
        }
    }
</script>


<template>
    <div class="hospitalisations">
        <header-menu
                :view="views[0]"
                :editable="false"/>
        <div class="hospitalisations__tools">
            <view-tools
                :view="views[0]"/>
        </div>
        <div class="hospitalisations__items">
            <div
                v-for="(view, index) in views"
                class="map__container">
                <map-signaling
                    :show-tools="false"
                    :show-legend="true"
                    :show-download="false"
                    :show-source-picker="false"
                    :view="view"/>
            </div>
        </div>

        <download-image-hospitalisations
            :views="views"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .hospitalisations {
        height: 100%;

        .header-menu {
            height: 48px;
        }

        .hospitalisations__tools {
            height: 56px;
            border-bottom: 1px solid #fff;
            background: $map-color;
        }

        .hospitalisations__items {
            height: calc(100% - 104px);
            display: flex;
            background: $map-color;

            .map__container {
                border-right: 1px solid #fff;
                width: calc(100% / 3);
                padding: 20px;

                .Map {
                    height: 100%;
                }

                &:last-child {
                    border-right: 0;
                }
            }
        }

        .download-image {
            position: absolute;
            left: 10px;
            bottom: 10px;
            z-index: 1;
        }
    }
</style>
