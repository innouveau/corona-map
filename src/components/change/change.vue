<script>
    import headerMenu from "../main/header-menu";
    import View from "@/classes/View";
    import MapChange from "../map/map-change";

    export default {
        name: 'change',
        components: {
            MapChange,
            headerMenu
        },
        props: {},
        data() {
            return {
                view: new View({id: 1})
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="standard-view change">
        <header-menu
            :view="view"
            :editable="true"/>

        <div class="content">
            <map-change
                :view="view"
                :show-tools="true"
                :show-legend="true"
                :offset="view.offset"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .change {

        .change__content {

        }
    }
</style>