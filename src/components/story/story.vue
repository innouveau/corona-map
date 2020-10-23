<script>
    import View from "@/classes/View";
    import storyChapter from "./story-chapter";
    import dateTools from '@/tools/date';
    import storyHead from "./story-head";
    import storyIntro from "./story-intro";
    import $ from 'jquery';

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
                interval: null,
                scroll: 0,
                currentChapter: null,
                currentRegion: null,
                currentRegionForAgeGroups: null,
                measuring: []
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
            },
            tops() {
                return this.measuring.map(m => m.height);
            }
        },
        methods: {
            getTranslatedItem(item) {
                return item[this.isoCode];
            },
            initScrolly() {
                let body = this.$refs.body;
                $(body).scroll(() => {
                    let scroll = $(body).scrollTop();
                    this.setScrol(scroll);
                })
            },
            setScrol(scroll) {
                let chapterItem;
                const getChapterItem = (scroll) => {
                    for (let chapterItem of this.measuring) {
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
                    chapterIndex = this.measuring.indexOf(chapterItem);
                    offsetChapter = dateTools.getDateOffset(this.$store.state.ui.todayInMs,  new Date(chapter.date).getTime());
                    if (chapterIndex < this.measuring.length - 1) {
                        nextChapter = this.measuring[chapterIndex + 1].chapter;
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
            init() {
                this.measuring = [];
                for (let chapter of this.chapters) {
                    this.measuring.push({
                        top: 0,
                        bottom: 0,
                        height: 0,
                        chapter
                    })
                }
                $('.story__body').scrollTop(0);
                this.rewind();
                this.initScrolly();
            }
        },
        mounted() {
            twttr.widgets.load();
            this.init();
        },
        watch: {
            currentLanguage: {
                handler: function() {
                    this.init();
                },
                deep: true
            }
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
                <div
                    v-if="measuring.length === chapters.length && measuring.length > 0"
                    class="story__chapters">
                    <story-chapter
                        v-for="(chapter, index) in chapters"
                        :chapter="chapter"
                        :measuring-data="measuring[index]"/>
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