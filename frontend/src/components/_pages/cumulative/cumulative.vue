<script>
import View from "@/classes/View";
import query from '@/components/elements/query'
import Page from "@/components/_pages/page";
import Map from "@/components/_map/Map";
import { downloadImage } from "@/tools/download";

export default {
    name: 'cumulative',
    components: {
        Page,
        Map,
    },
    mixins: [query],
    props: {},
    data() {
        return {
            view: new View({id: 1, offsetStart: this.$store.state.settings.historyLength})
        }
    },
    methods: {
        download(payload) {
            downloadImage("cumulative", payload);
        }
    }
}
</script>


<template>
    <page :view="view">
        <template v-slot:map>
            <Map
                @download="download"
                :view="view"
                :map-type="'cumulative'" />
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
