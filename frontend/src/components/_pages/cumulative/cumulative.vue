<script>
import View from "@/classes/View";
import mapCumulative from "@/components/map/cumulative/map-cumulative";
import query from '@/components/elements/query'
import TimeSliderRange from "@/components/view/time-slider-range";
import Page from "@/components/_pages/page";
import Map from "@/components/_map/Map";
import { downloadImage } from "@/tools/download";

export default {
    name: 'cumulative',
    components: {
        Page,
        Map,
        TimeSliderRange,
        mapCumulative,
    },
    mixins: [query],
    props: {},
    data() {
        return {
            view: new View({id: 1, offsetStart: this.$store.state.settings.historyLength})
        }
    },
    methods: {
        download() {
            downloadImage("cumulative", payload);
        }
    }
}
</script>


<template>
    <page :view="view">Hello
        <template v-slot:map>
            <Map
                @download="download"
                :view="view">
                <template v-slot:tools>
                    <time-slider-range :view="view" />
                </template>
            </Map>

<!--            -->
<!--            <map-cumulative-->
<!--                :view="view"-->
<!--                :show-tools="true"-->
<!--                :show-legend="true"-->
<!--                :offset="view.offset"-->
<!--                :step="15"/>-->
        </template>

        <template v-slot:details>
            Details
        </template>

        <template v-slot:trends>
            Trends
        </template>
    </page>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>
