<script>
    import scoreItem from "./score-item";
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';
    import View from '@/classes/View';
    import mapLegend from "../main/map/map-legend/map-legend";

    export default {
        name: 'score',
        components: {
            Datepicker,
            mapLegend,
            scoreItem
        },
        props: {},
        data(){
            return {
                views: [],
                date: this.$store.state.ui.today
            }
        },
        computed: {
            routePath() {
                return window.location.href.split('#')[0];
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            historyLength() {
                return this.$store.state.settings.historyLength;
            },
            isAtEnd() {
                return this.views[0].offset === 0;
            },
            isAtStart() {
                return this.views[0].offset === this.historyLength;
            }
        },
        methods: {
            init() {
                let parents = this.currentMap.parents;
                this.views.push(new View ({
                    id: 1,
                    parent: parents[0]
                }));
                this.views.push(new View ({
                    id: 2,
                    parent: parents[1]
                }));
            },
            updateQuery() {
                // let url, date1, date2;
                // date1 = dateTools.formatDate( dateTools.getDateByOffset(this.views[0].offset * this.currentMap.settings.testDataInterval));
                // date2 = dateTools.formatDate( dateTools.getDateByOffset(this.views[1].offset * this.currentMap.settings.testDataInterval));
                // url = this.routePath + '#/vergelijk?map=' + encodeURI(this.currentMap.title) + '&date1=' + date1 + '&date2=' + date2;
                // history.pushState(
                //     {},
                //     null,
                //     url
                // );
            },
            updateOffset(date) {
                let offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, date.getTime()) / this.$store.state.maps.current.settings.testDataInterval;
                this.views[0].offset = offset;
                this.views[1].offset = offset;
            },
            move(value) {
                this.views[0].offset -= value;
                this.views[1].offset -= value;
                this.date = dateTools.getDateByOffset((this.views[0].offset * this.currentMap.settings.testDataInterval));
            },
        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div class="score">
        <div
            v-if="views.length > 0"
            class="score__tools">
            <datepicker
                :value="date"
                @input="updateOffset"/>
            <div class="score__date-tools">
                <div
                    v-if="!isAtStart"
                    @click="move(-1)"
                    class="icon-button">
                    <img src="assets/img/tools/back.svg">
                </div>
                <div
                    v-if="!isAtEnd"
                    @click="move(1)"
                    class="icon-button">
                    <img src="assets/img/tools/forward.svg">
                </div>
            </div>
            <map-legend/>
        </div>
        <div class="score__items">
            <score-item
                v-for="(view, index) in views"
                :view="view"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .score {
        height: 100%;
        display: flex;

        .score__tools {
            width: 250px;
            height: 100%;
            border-right: 1px solid #ddd;
            padding: 8px;

            .vdp-datepicker {
                margin-bottom: 8px;
            }

            .score__date-tools {
                margin-bottom: 8px;
                display: flex;

                .icon-button {
                    margin-right: 8px;
                }
            }
        }

        .score__items {
            width: calc(100% - 250px);
            height: 100%;
            display: flex;

            .score-item {
                width: 50%;
                height: 100%;
            }
        }
    }
</style>