<script>
    import View from "@/classes/View";
    import regionDetailsShort from "@/components/_pages/main/details/region-details-short";
    import viewTools from "@/components/view/view-tools";
    import Map from "@/components/_map/Map";
    import mapLegend from "@/components/_map/legend/map-legend";

    export default {
        name: 'MapRegular',
        components: {
            viewTools,
            regionDetailsShort,
            Map,
            mapLegend
        },
        props: {
            view: {
                type: View,
                required: true
            },
            showLegend: {
                type: Boolean,
                required: true
            },
            showTools: {
                type: Boolean,
                required: true
            },
            showTimeTools: {
                type: Boolean,
                required: false,
                default: false
            },
            showDownload: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data() {
            return {
                initialised: false
            }
        },
        computed: {
            offset() {
                return this.view.offset;
            }
        },
        methods: {
            download(payload) {
                this.$emit("download", payload)
            }
        },
        watch: {
            offset() {
                this.$parent.updateQuery();
            }
        },
        mounted() {
            // this does render all other components
            // 1 callstack before the map, so there is
            // already a feeling something is there to see
            setTimeout(() => {
                this.initialised = true;
            })
        }
    }
</script>


<template>
    <Map
        v-if="initialised"
        @download="download"
        :view="view"
        :map-type="'signaling'">
        <template v-slot:legend>
            <map-legend :view="view"/>
        </template>

        <template v-slot:tools>
            <view-tools :view="view" />
            <!--                    <embed-button />-->
        </template>
    </Map>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .MapRegular {

        @include mobile() {

            .view__body {

                .view__map {

                    .Map {
                        width: 100%;
                    }

                    .region-details__container {
                        display: none;
                    }
                }
            }
        }
    }
</style>
