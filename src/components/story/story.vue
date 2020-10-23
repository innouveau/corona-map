<script>
    import View from "@/classes/View";
    import storyChapter from "./story-chapter";
    import $ from 'jquery';
    import dateTools from '@/tools/date';
    import storyHead from "./story-head";
    import storyIntro from "./story-intro";

    export default {
        name: 'story',
        components: {
            storyIntro,
            storyHead,
            storyChapter,

        },
        props: {},
        data() {
            return {
                view: new View({id: 1}),
                chapterData: [],
                interval: null,
                scroll: 0,
                currentChapter: null,
                currentRegion: null,
                currentRegionForAgeGroups: null
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
                    let top, height;
                    top = Math.round($(this).offset().top - base);
                    height = Math.round($(this).outerHeight());
                    _this.chapterData.push({
                        top: top,
                        bottom: (top + height),
                        chapter: _this.chapters[i]
                    });
                });
            },
            initScrolly() {
                let body, _this;
                body = this.$refs.body;
                _this = this;
                $(body).scroll(function() {
                    let scroll = $(body).scrollTop();
                    _this.setScrol(scroll);
                })
            },
            setScrol(scroll) {
                let chapterItem;
                const getChapterItem = (scroll) => {
                    for (let chapterItem of this.chapterData) {
                        if (scroll >= chapterItem.top && scroll < chapterItem.bottom) {
                            return chapterItem;
                        }
                    }
                };

                chapterItem = getChapterItem(scroll);
                if (chapterItem) {
                    let percentage, dateInMs, chapter, chapterIndex, nextChapter, offsetChapter, offsetNextChapter, offset;
                    percentage = (scroll - chapterItem.top) / (chapterItem.bottom - chapterItem.top);
                    chapter = chapterItem.chapter;
                    chapterIndex = this.chapterData.indexOf(chapterItem);
                    offsetChapter = dateTools.getDateOffset(this.$store.state.ui.todayInMs,  new Date(chapter.date).getTime());
                    if (chapterIndex < this.chapterData.length - 1) {
                        nextChapter = this.chapterData[chapterIndex + 1].chapter;
                        offsetNextChapter = dateTools.getDateOffset(this.$store.state.ui.todayInMs,  new Date(nextChapter.date).getTime());
                        offset = offsetChapter - Math.round(percentage * (offsetChapter - offsetNextChapter ));
                        this.view.offset = offset;
                    } else {
                        this.view.offset = offsetChapter;
                    }

                    if (chapterItem.chapter !== this.currentChapter) {
                        this.activeChapter(chapterItem.chapter)
                    }
                }
            },

            activeChapter(chapter) {
                this.currentChapter = chapter;
                this.selectRegion(chapter);
            },
            selectRegion(chapter) {
                if (chapter.selection.tests) {
                    let region = this.$store.getters[chapter.selection.tests.module + '/getItemByProperty']('title', chapter.selection.tests.title, true);
                    if (region) {
                        this.currentRegion = region;
                    }
                } else {
                    this.currentRegion = null;
                }
            },
            rewind() {
                let chapter, dateInMs, offset;
                chapter = this.chapters[0];
                this.activeChapter(chapter);
                dateInMs = new Date(chapter.date).getTime();
                offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, dateInMs);
                this.view.offset = offset;
            },
        },
        mounted() {
            this.rewind();
            // wait for embed stuff to be finished rendered
            this.initScrolly();
            setTimeout(()=> {
                this.measureChapters();
            }, 500);
            setTimeout(()=> {
                twttr.widgets.load();
            }, 200)
        }
    }
</script>


<template>
    <div class="story">
        <story-head
            :view="view"
            :current-region="currentRegion"
            :current-chapter="currentChapter"
            :story="story"/>
        <div
            ref="body"
            class="story__body">
            <div class="story__content">
                <story-intro
                    :story="story"/>
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

        .story__body {
            height: calc(100% - 300px);
            overflow: auto;
            background: #D6E2EA;

            .story__content {
                width: 600px;
                margin: 40px auto;
                max-width: 100%;

                a {
                    color: #000;
                }

                img {
                    margin-bottom: 12px;
                }

                iframe {
                    max-width: 100%;
                }

                .twitter-tweet, blockquote {
                    width: 300px!important;
                    max-width: 100%;
                    // reserve height for measuring
                    height: 550px;
                }
            }
        }

        @include mobile() {

            .story__body {

                .story__content {
                    width: 100%;
                    margin: 40px 0;
                    padding: 0 12px;
                }
            }
        }
    }
</style>