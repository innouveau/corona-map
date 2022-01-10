<script>
    import View from "@/classes/View";
    import page from "@/components/_pages/page";
    import Map from "@/components/_map/Map";
    import { downloadImage } from "@/tools/download";
    import timeSlider from "@/components/view/time-slider";
    import embedButton from "./embed/embed-button";
    import RegionDetails from "./details/region-details";

    export default {
        name: 'main-page',
        components: {
            RegionDetails,
            page,
            Map,
            timeSlider,
            embedButton,
        },
        props: {},
        data() {
            return {
                initialised: false,
                view: new View({id: 1, offsetStart: this.$store.state.settings.historyLength})
            }
        },
        computed: {
            currentRegion() {
                return this.view.currentRegion;
            },
            showMap() {
                return this.$store.state.ui.menu === 'map';
            },
            currentSource() {
                return this.view.currentSource;
            },
            showEmbedButton() {
                return this.$store.state.ui.presets !== 'radio1';
            }
        },
        methods: {
            init(){
                // this does render all other components
                // 1 callstack before the map, so there is
                // already a feeling something is there to see
                setTimeout(() => {
                    this.initialised = true;
                })
            },
            download(payload) {
                downloadImage("signaling", payload);
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            currentSource: function () {
                this.$store.commit('ui/updateProperty', {key: 'showTrends', value: false});
            }
        }
    }
</script>


<template>
    <page :view="view">
        <template v-slot:map>
            <Map
                v-if="initialised"
                @download="download"
                :view="view">
                <slot>
                    <time-slider :view="view"/>
                    <embed-button />
                </slot>
            </Map>
        </template>

        <template v-slot:details>
            <region-details
                :view="view"
                :region="currentRegion" />
        </template>

        <template v-slot:trends>
            Trends
        </template>
    </page>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>
