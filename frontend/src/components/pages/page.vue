<script>
    import headerMenu from "@/components/pages/header/header-menu";
    import View from "@/classes/View";
    import TrendBlocker from "../elements/trend-blocker";

    export default {
        name: 'page',
        components: {
            TrendBlocker,
            headerMenu,
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        data() {
            return {

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
            },
            currentSource() {
                return this.view.currentSource;
            },
            isLoaded(){
                return this.currentSource.loaded;
            }
        },
    }
</script>


<template>
    <div class="standard-view">
        <header-menu
            :view="view"
            :editable="true"/>

        <div class="content">
            <div class="page__map standard-view-map">
                <slot name="map" />
            </div>

            <div class="page__details">
                <slot
                    v-if="currentRegion && isLoaded"
                    name="details" />
            </div>

            <div class="page__trends">
                <trend-blocker v-if="isLoaded" :view="view">
                    <slot name="trends" />
                </trend-blocker>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .standard-view {
        height: 100%;

        .content {
            display: flex;
            height: calc(100% - 48px);

            .page__map {
                width: calc(100% - 684px);
                position: relative;
            }

            .page__details {
                width: 384px;
                padding: 16px;
                height: 100%;
                overflow: auto;
                border-right: 1px solid rgba(0,0,0,0.2);
            }

            .page__trends {
                width: 300px;
                padding: 16px;
                height: 100%;
                overflow: auto;
            }

            .region-details--mobile {
                padding: 20px;
                display: none;
            }
        }

        @include mobile() {

            .content {
                display: block;
                position: relative;

                .region-details--mobile {
                    display: block;
                }
            }
        }

        @include header-menu-breakpoint() {

            .header-menu {
                height: 80px;
            }

            .content {
                height: calc(100% - 80px);
            }
        }
    }
</style>
