<script>
    import viewItem from "@/components/view/view-item";
    import dateTools from '@/tools/date';
    import View from '@/classes/View';
    import DownloadImageDouble from "../map/download/download-image-double";

    export default {
        name: 'compare',
        components: {
            DownloadImageDouble,
            viewItem
        },
        props: {},
        data(){
            return {
                views: []
            }
        },
        computed: {
            routePath() {
                return window.location.href.split('#')[0];
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            offset1() {
                return this.views.length > 0 ? this.views[0].offset : null;
            },
            offset2() {
                return this.views.length > 0 ? this.views[1].offset : null;
            }
        },
        methods: {
            getDates() {
                let date1, date2, offset1, offset2, today, fourWeeksBack;
                today = this.$store.state.ui.today;
                fourWeeksBack = dateTools.getDateByOffset(28);
                if (this.$route.query.date1) {
                    date1 = new Date(this.$route.query.date1);
                } else {
                    date1 = fourWeeksBack;
                }
                if (this.$route.query.date2) {
                    date2 = new Date(this.$route.query.date2);
                } else {
                    date2 = today;
                }
                offset1 = dateTools.getDateOffset(this.$store.state.ui.todayInMs, date1.getTime()) / this.$store.state.maps.current.settings.testDataInterval;
                offset2 = dateTools.getDateOffset(this.$store.state.ui.todayInMs, date2.getTime()) / this.$store.state.maps.current.settings.testDataInterval;
                this.views.push(new View ({
                    id: 1,
                    offset: offset1
                }));
                this.views.push(new View ({
                    id: 1,
                    offset: offset2
                }));
            },
            updateQuery() {
                let url, date1, date2;
                date1 = dateTools.formatDate( dateTools.getDateByOffset(this.views[0].offset * this.currentMap.settings.testDataInterval));
                date2 = dateTools.formatDate( dateTools.getDateByOffset(this.views[1].offset * this.currentMap.settings.testDataInterval));
                url = this.routePath + '#/compare?map=' + encodeURI(this.currentMap.title) + '&date1=' + date1 + '&date2=' + date2;
                history.pushState(
                    {},
                    null,
                    url
                );
            }
        },
        mounted() {
            this.getDates();
        }
    }
</script>


<template>
    <div class="compare">
        <div class="view__items">
            <view-item
                v-for="(view, index) in views"
                :view="view"
                :show-legend="index === 0"
                :show-tools="index === 0"
                :show-download="false"/>

            <download-image-double
                v-if="views.length === 2"
                :view1="views[0]"
                :view2="views[1]"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .compare {
        height: 100%;

        .view__items {
            height: 100%;
            display: flex;

            .view-item {
                width: 50%;
                height: 100%;
            }
        }

        .download-image {
            position: absolute;
            left: 10px;
            bottom: 10px;
            z-index: 1;
        }

        @include mobile() {

            .view__items {
                display: block;

                .view-item {
                    width: 100%;
                    height: 50%;
                }
            }
        }
    }
</style>