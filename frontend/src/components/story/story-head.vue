<script>
    import View from "@/classes/View";

    import mapSignaling from "@/components/map/map-signaling";
    import timeSlider from "@/components/view/time-slider";
    import _Region from "@/classes/region/_Region";
    import Chapter from "@/classes/story/Chapter";
    import Story from "@/classes/story/Story";
    import regionDetailsShort from "@/components/_pages/main/regions/region-details/region-details-short";
    import positivePcrTests from "@/components/graphs/positive-pcr-tests";

    export default {
        name: 'story-head',
        components: {
            positivePcrTests,
            regionDetailsShort,
            timeSlider,
            mapSignaling
        },
        props: {
            view: {
                type: View,
                required: true
            },
            currentRegion: {
                type: _Region,
                required: false
            },
            currentChapter: {
                type: Chapter,
                required: false
            },
            story: {
                type: Story,
                required: true
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            },
            dateString() {
                return this.$store.getters['ui/getDateByOffset']((this.view.offset * this.currentMap.data.positivePcrTests.interval), 'dd MMM', this.currentLanguage.iso_code)
            },
            dates() {
                return this.story.chapters.map(chapter => chapter.date);
            }
        },
        methods: {
            getTranslatedItem(item) {
                return item[this.isoCode];
            },
            limitLength(string) {
                let l = 24;
                if (string && string.length > l) {
                    return string.slice(0,l) + '(...)';
                } else {
                    return string;
                }
            }
        }
    }
</script>


<template>
    <div class="story-head">

        <div class="story-head__left">
            <div class="story__navigation">
                <b>{{getTranslatedItem(story.title)}}</b>
                <span
                    class="story__navigation-chapter"
                    v-if="currentChapter">
                        &nbsp;{{getTranslatedItem(currentChapter.title)}}
                    </span>
            </div>
            <div class="story__map">
                <map-signaling
                    :show-tools="true"
                    :show-legend="true"
                    :show-download="false"
                    :view="view"/>
                <div class="story__date">
                    {{dateString}}
                </div>
            </div>
        </div>

        <div class="story-head__right">
            <div class="story__graphs">
                <div class="story__tests">
                    <positive-pcr-tests
                        v-if="currentRegion"
                        :view="view"
                        :region="currentRegion"
                        :frames-before="28"
                        :height="190"/>
                </div>
            </div>
            <div
                v-if="currentRegion"
                class="story__region">
                {{currentRegion.title}}
            </div>
            <div class="story__time-slider">
                <time-slider
                    :view="view"
                    :stops="dates"
                    :show-graph="true"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .story-head {
        height: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        position: relative;
        z-index: 1;
        display: flex;
        background: $map-color;

        .story-head__left {
            height: 100%;
            width: 50%;
            border-right: 1px solid #fff;

            .story__navigation {
                height: 30px;
                border-bottom: 1px solid #fff;
                padding: 4px 8px;
                display: flex;
                align-items: center;
                white-space: nowrap;
                overflow: hidden;

                span {
                    margin-left: 4px;
                }
            }

            .story__map {
                height: calc(100% - 30px);
                padding: 8px;
                position: relative;

                .story__region-container {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    width: 200px;
                    z-index: 1;

                    .region-details__row {
                        display: block;

                        .region-details__label {
                            width: 100%;
                        }

                        .region-details__value {
                            width: 100%;
                            text-align: left;
                        }
                    }
                }

                .story__date {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    font-weight: 700;
                }

                .map {
                    height: 100%;
                }
            }
        }

        .story-head__right {
            height: 100%;
            width: 50%;
            position: relative;

            .story__graphs {
                display: flex;
                height: calc(100% - 52px);

                .story__tests {
                    padding: 8px;

                    .positive-tests__title {
                        display: none;
                    }
                }
            }

            .story__region {
                height: 36px;
                //font-weight: 700;
                position: absolute;
                left: 16px;
                top: 36px;
            }

            .story__time-slider {
                height: 52px;
                padding: 10px 16px;
                border-top: 1px solid #fff;
                width: 100%;
                position: relative;

                .time-slider {
                    width: 100%;
                }
            }
        }

        @include mobile() {

            .story-head__left {
                width: 100%;
                border-right: 0;

                .story__navigation {
                    border-bottom: 0;

                    .story__navigation-chapter {
                        display: none;
                    }
                }
            }

            .story-head__right {
                display: none;
            }
        }
    }
</style>
