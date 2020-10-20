<script>
    import View from "@/classes/View";
    import mapSignaling from "@/components/map/map-signaling";
    import timeSlider from "@/components/view/time-slider";
    import PositiveTests
        from "../main/regions/region-details/tests/positive-tests";

    export default {
        name: 'story',
        components: {
            PositiveTests,
            timeSlider,
            mapSignaling
        },
        props: {},
        data() {
            return {
                view: new View({id: 1})
            }
        },
        computed: {
            region() {
                return this.$store.getters['cities/getItemByProperty']('title', 'Amsterdam', true);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="story">
        <div class="story__head">
            <div class="story__head-left">
                <map-signaling
                    :show-tools="true"
                    :show-legend="true"
                    :show-download="false"
                    :view="view"/>
            </div>

            <div class="story__head-right">
                <div class="story__tests">
                    <positive-tests
                        v-if="region"
                        :view="view"
                        :region="region"
                        :weeks="4"
                        :height="190"/>
                </div>
                <div class="story__region">
                    {{region.title}}
                </div>
                <time-slider
                   :view="view"/>
            </div>
        </div>
        <div class="story__body">
            <div class="story__content">
                <h3>How the Netherlands ended up in its second Corona wave</h3>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .story {
        height: 100%;

        .story__head {
            height: 300px;
            border-bottom: 1px solid #ddd;
            display: flex;

            .story__head-left {
                height: 100%;
                width: 50%;
                padding: 20px;
                border-right: 1px solid #ddd;

                .map {
                    height: 100%;
                }
            }

            .story__head-right {
                height: 100%;
                width: 50%;

                .story__tests {
                    height: calc(100% - 88px);
                    padding: 8px;

                    .positive-tests__title {
                        display: none;
                    }
                }

                .story__region {
                    height: 36px;
                    padding: 10px 8px;
                    font-weight: 700;
                }

                .time-slider {
                    height: 52px;
                    padding: 10px 8px;
                    border-top: 1px solid #ddd;
                    width: 100%;
                }
            }
        }

        .story__body {
            height: calc(100% - 300px);
            overflow: auto;

            .story__content {
                width: 400px;
                margin: 40px auto;
                max-width: 100%;

                h3 {
                    font-family: $serif;
                    font-size: 24px;
                }
            }
        }
    }
</style>