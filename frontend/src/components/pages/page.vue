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
        computed: {
            currentRegion() {
                return this.view.currentRegion;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            isLoaded(){
                return this.view.currentSource && this.view.currentSource.loaded;
            },
            currentMenu() {
                return this.$store.state.ui.menu;
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
            <div
                class="content-section page__map standard-view-map"
                :class="{'content-section--active': currentMenu === 'map'}">
                <slot name="map" />
            </div>

            <div
                class="content-section page__details"
                :class="{'content-section--active': currentMenu === 'details'}">
                <slot
                    v-if="currentRegion && isLoaded"
                    name="details" />
                <div v-if="!currentRegion">
                    {{translate("select-region-first", true)}}
                </div>
            </div>

            <div
                class="content-section page__trends"
                :class="{'content-section--active': currentMenu === 'trends'}">
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
                width: calc(100% - 700px);
                position: relative;
            }

            .page__details {
                width: 400px;
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

                .content-section {
                    width: 100%;
                    height: 100%;
                    visibility: hidden;
                    position: absolute;
                    left: 0;
                    top: 0;

                    &--active {
                        visibility: visible;
                    }
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
