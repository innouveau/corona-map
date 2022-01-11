<script>
import View from "@/classes/View";
import dateTools from '@/tools/date';
import headerMenu from "@/components/pages/header/header-menu";
import Map from "@/components/_map/Map";
import { downloadImage } from "@/tools/download";
import query from '@/components/elements/query.js'

export default {
    name: 'time-line',
    components: {
        Map,
        headerMenu,
    },
    data() {
        return {
            view: new View({})
        }
    },
    props: {},
    mixins: [query],
    methods: {
        download() {
            downloadImage(this.view, "signaling");
        }
    }
}
</script>


<template>
    <div class="time-line">
        <header-menu
            v-if="view"
            :view="view"/>

        <Map
            v-if="view"
            @download="download"
            :view="view"
            :map-type="'signaling'" />
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-line {
        height: 100%;

        .header-menu {
            height: 48px;
        }

        .Map {
            height: calc(100% - 48px);
        }
    }
</style>
