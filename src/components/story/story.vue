<script>
    import View from "@/classes/View";
    import mapSignaling from "@/components/map/map-signaling";
    import timeSlider from "@/components/view/time-slider";
    import positiveTests from "../main/regions/region-details/tests/positive-tests";
    import storyChapter from "./story-chapter";
    import $ from 'jquery';
    import dateTools from '@/tools/date';

    export default {
        name: 'story',
        components: {
            storyChapter,
            positiveTests,
            timeSlider,
            mapSignaling
        },
        props: {},
        data() {
            return {
                view: new View({id: 1}),
                chapterData: [],
                interval: null,
                scroll: 0,
                currentChapter: null,
                currentRegion: null
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            story() {
                return this.$store.getters['stories/getItemById'](1);
                //return this.$store.getters['stories/getItemById'](this.currentMap.story_id);
            },
            chapters() {
                return this.story.chapters;
            }
        },
        methods: {
            getTranslatedItem(item) {
                return item[this.isoCode];
            },
            measureChapters() {
                let base, _this;
                this.chapterData = [];
                _this = this;
                base = $(this.$refs.body).offset().top;
                $('.story-chapter').each(function(i) {
                    let position = $(this).offset().top - base;
                    _this.chapterData.push({
                        position,
                        chapter: _this.chapters[i]
                    });
                });
            },
            initScrolly() {
                let body, _this;
                body = this.$refs.body;
                this.measureChapters();
                _this = this;
                $(body).scroll(function() {
                    let scroll, direction;
                    direction = '';
                    scroll = $(body).scrollTop();
                    if (scroll > _this.scroll) {
                        direction = 'down';
                    } else if (scroll < _this.scroll) {
                        direction = 'up';
                    }
                    _this.scroll = scroll;
                    if (direction.length > 0) {
                        _this.checkChapter(direction);
                    }
                })
            },
            checkChapter(direction) {
                let margin = 80;
                for (let chapterItem of this.chapterData) {
                    if (direction === 'down') {
                        if (this.scroll > chapterItem.position - margin) {
                            this.activeChapter(chapterItem);
                        }
                    } else {
                        let index, previous;
                        index = this.chapterData.indexOf(chapterItem);
                        if (index > 0) {
                            previous = this.chapterData[index - 1];
                            if (this.scroll < (chapterItem.position - margin) && this.scroll > (previous.position - margin)) {
                                if (index > 0) {
                                    this.activeChapter(previous);
                                }
                            }
                        }
                    }
                }
            },
            activeChapter(chapterItem) {
                let chapter, dateInMs, offset;
                if (chapterItem.chapter !== this.currentChapter) {
                    this.currentChapter = chapterItem.chapter;
                    chapter = chapterItem.chapter;
                    this.selectRegion(chapter);
                    dateInMs = new Date(chapter.date).getTime();
                    offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, dateInMs);
                    this.setOffset(offset);
                }
            },
            selectRegion(chapter) {
                let region = this.$store.getters[chapter.selection.module + '/getItemByProperty']('title', chapter.selection.title, true);
                if (region) {
                    this.currentRegion = region;
                }
            },
            setOffset(offset) {
                let difference, time, steps, frequency, step, currentOffset, endOffset;
                clearInterval(this.interval);
                endOffset = offset;
                currentOffset = this.view.offset;
                frequency = 50;
                time = 1500;
                steps = time / frequency;
                difference = endOffset - currentOffset;

                if (difference > 0) {
                    step = Math.ceil(difference / steps);
                } else {
                    step = Math.floor(difference / steps);
                }
                this.interval = setInterval(() => {
                    currentOffset += step;
                    if (step > 0) {
                        if (currentOffset >= endOffset - step) {
                            this.view.offset = endOffset;
                            clearInterval(this.interval);
                        }
                    }
                    if (step < 0) {
                        if (currentOffset <= endOffset + step) {
                            this.view.offset = endOffset;
                            clearInterval(this.interval);
                        }
                    }
                    this.view.offset = currentOffset;
                }, frequency);
            },
            rewind() {
                let chapter, dateInMs, offset;
                chapter = this.chapters[0];
                dateInMs = new Date(chapter.date).getTime();
                offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, dateInMs);
                this.view.offset = offset;
            },
            limitLength(string) {
                let l = 50;
                if (string.length > l) {
                    return string.slice(0,l) + '(...)';
                } else {
                    return string;
                }
            }
        },
        mounted() {
            this.rewind();
            // wait for embed stuff to be finished rendered
            setTimeout(()=> {
                this.initScrolly();
            }, 2000);
            setTimeout(()=> {
                twttr.widgets.load();
            }, 200)
        }
    }
</script>


<template>
    <div class="story">
        <div class="story__head">

            <div class="story__head-left">
                <div class="story__navigation">
                    <b>{{getTranslatedItem(story.title)}}</b>
                    <span v-if="currentChapter">
                        &nbsp;{{limitLength(getTranslatedItem(currentChapter.title))}}
                    </span>
                </div>
                <div class="story__map">
                    <map-signaling
                        :show-tools="true"
                        :show-legend="true"
                        :show-download="false"
                        :view="view"/>
                </div>
            </div>

            <div class="story__head-right">
                <div class="story__tests">
                    <positive-tests
                        v-if="currentRegion"
                        :view="view"
                        :region="currentRegion"
                        :weeks="4"
                        :height="190"/>
                </div>
                <div
                        v-if="currentRegion"
                        class="story__region">
                    {{currentRegion.title}}
                </div>
                <time-slider
                        :view="view"/>
            </div>
        </div>
        <div
            ref="body"
            class="story__body">
            <div class="story__content">
                <h3>{{getTranslatedItem(story.title)}}</h3>
                <div class="story__chapters">
                    <story-chapter
                        v-for="chapter in chapters"
                        :chapter="chapter"/>
                </div>
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
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            position: relative;
            z-index: 1;
            display: flex;

            .story__head-left {
                height: 100%;
                width: 50%;
                border-right: 1px solid #ddd;

                .story__navigation {
                    height: 30px;
                    border-bottom: 1px solid #ddd;
                    padding: 4px 8px;
                    display: flex;
                    align-items: center;

                    span {
                        margin-left: 4px;
                    }
                }

                .story__map {
                    height: calc(100% - 30px);
                    padding: 8px;

                    .map {
                        height: 100%;
                    }
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
            background: #D6E2EA;

            .story__content {
                width: 600px;
                margin: 40px auto;
                max-width: 100%;

                h3 {
                    font-family: $serif;
                    font-size: 36px;
                    line-height: 1.15;
                    margin-bottom: 200px;
                }

                a {
                    color: #000;
                }

                img {
                    width: 300px;
                    margin-bottom: 12px;
                }

                .twitter-tweet {
                    width: 300px!important;
                }
            }
        }
    }
</style>