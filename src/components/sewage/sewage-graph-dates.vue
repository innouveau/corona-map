<script>
    import SewageGraphDate from "./sewage-graph-date";
    export default {
        name: 'sewage-graph-dates',
        components: {SewageGraphDate},
        props: {
            measurements: {
                type: Array,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            offsets() {
                return this.measurements.map(m => m.offset);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-graph-dates">
        <sewage-graph-date
            v-for="offset in offsets"
            :offset="offset"
            :settings="settings"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-graph-dates {
        display: flex;
        padding-top: 3px;
        height: 24px;

        .sewage-graph-dates__date {
            //height: 1px;
            border-radius: 50%;
            background: #000;
        }
    }
</style>