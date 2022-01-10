<script>
    import headerMenu from "@/components/_pages/header/header-menu";
    import View from "@/classes/View";
    import query from '@/components/elements/query'
    import dateTools from '@/tools/date';
    import sourceTools from "@/tools/source";

    export default {
        name: 'page',
        components: {
            headerMenu,
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        mixins: [query],
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
        methods: {
            readQuery() {
                let region, string, offset, source;
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
                if (this.$route.query.source) {
                    source = this.$store.getters['sources/getItemByProperty']('title', this.$route.query.source, true);
                    this.view.currentSource = source;
                }
                if (this.$route.query.signaling) {
                    const signalingId= Number(this.$route.query.signaling);
                    const signalingSystem = this.$store.getters['signalingSystems/getItemById'](signalingId);
                    if (signalingSystem) {
                        this.view.currentSource.signalingSystem_id = signalingSystem.id;
                    }
                }
                if (this.$route.query.gradient) {
                    if (this.$route.query.gradient === 'false') {
                        this.$store.commit('settings/updateProperty', {key: 'gradient', value: false});
                    }
                }
                if (this.$route.query.regiontype) {
                    console.log(this.$route.query.regiontype);
                    this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.$route.query.regiontype});
                }
            },
            checkSource() {
                if (!this.currentSource.loaded) {
                    sourceTools.load(this.currentSource);
                }
            }
        },
        mounted() {
            this.readQuery();
        },
        watch: {
            currentSource: function () {
                this.checkSource();
            }
        }
    }
</script>


<template>
    <div class="standard-view">
        <header-menu
            :view="view"
            :editable="true"/>

        <div class="content">
            <div class="page__map standard-view-map">
                <slot v-if="isLoaded" name="map" />

                <div v-else>
                    Loading {{translate(currentSource.title)}}...
                </div>
            </div>

            <div class="page__details">
                <slot
                    v-if="currentRegion && isLoaded"
                    name="details" />
            </div>

            <div class="page__trends">
                <slot v-if="isLoaded" name="trends" />

                <div v-else>
                    Kies eerst een gemeente op de kaart.
                </div>
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
                width: calc(100% - 750px);
                background: $map-color;
                position: relative;
                padding: 16px;
            }

            .page__trends {
                width: 300px;
                padding: 16px;
            }

            .page__details {
                width: 450px;
                padding: 16px;
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
