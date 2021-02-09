<script>
    import viewItem from "@/components/view/view-item";
    import View from "@/classes/View";
    import dateTools from '@/tools/date';

    export default {
        name: 'time-line',
        components: {
            viewItem
        },
        data() {
            return {
                view: null
            }
        },
        props: {},
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            routePath() {
                return window.location.href.split('#')[0];
            },
        },
        methods: {
            getDate() {
                let offset;
                if (this.$route.query.date) {
                    offset = dateTools.getOffsetByDate(this.$route.query.date) / this.currentMap.data.positivePcrTests.interval;
                } else {
                    offset = 0;
                }
                this.view = new View({
                    id: 1,
                    offset: offset
                })
            },
            updateQuery() {
                let url, date;
                date = dateTools.getDateByOffset(this.view.offset * this.currentMap.data.positivePcrTests.interval);
                url = this.routePath + '#/timeline?map=' + encodeURI(this.currentMap.title) + '&date=' + date;
                history.pushState(
                    {},
                    null,
                    url
                );
            }
        },
        mounted() {
            this.getDate();
        }
    }
</script>


<template>
    <div class="time-line">
        <view-item
            v-if="view"
            :view="view"
            :show-legend="true"
            :show-tools="true"
            :show-time-tools="true"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-line {
        height: 100%;

        .view-item {
            height: 100%;
        }
    }
</style>