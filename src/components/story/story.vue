<script>
    import View from "@/classes/View";
    import storyChapter from "./story-chapter";
    import dateTools from '@/tools/date';
    import storyHead from "./story-head";
    import storyIntro from "./story-intro";
    import $ from 'jquery';
    import Loader from "../elements/loader";
    import StoryHint from "./story-hint";

    export default {
        name: 'story',
        components: {
            StoryHint,
            Loader,
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
                measuring: [],
                ready: false,
                scrollTimeout: null,
                isScrolling: false,
                hasScrolled: false
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
            offset() {
                return this.view.offset;
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
                    this.scrollStart();
                    this.setOffsetByScrol(scroll);
                })
            },
            scrollStart() {
                this.hasScrolled = true;
                this.isScrolling = true;
                clearTimeout(this.scrollTimeout);
                this.scrollTimeout = setTimeout(() => {
                    this.isScrolling = false;
                }, 100)
            },
            setOffsetByScrol(scroll) {
                let chapter = this.story.getChapterByScroll(scroll);

                if (chapter) {
                    this.view.offset = chapter.getOffsetByScroll(scroll);
                    if (chapter !== this.currentChapter) {
                        this.activeChapter(chapter);
                    }
                }
            },
            setScrollByOffset(offset) {
                if (!this.isScrolling) {
                    let chapter = this.story.getChapterByOffset(offset);
                    if (chapter && chapter !== this.currentChapter) {
                        //let scroll = chapter.getScrollByOffset(offset);
                        $('.story__body').scrollTop(chapter.ui.top - 40);
                        //$('.story__body').animate({ scrollTop: chapter.ui.top });
                        this.activeChapter(chapter);
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
                        this.view.currentRegion = region;
                    }
                } else {
                    this.view.currentRegion = null;
                }
            },
            rewind() {
                let chapter = this.chapters[0];
                this.activeChapter(chapter);
                this.view.offset = dateTools.getOffsetByDate(chapter.date);
            },
            measureChapters() {
                let base, _this;
                _this = this;
                base = $(this.$refs.body).offset().top;
                $('.story-chapter').each(function(i) {
                    let top, height;
                    top = Math.round($(this).offset().top - base);
                    height = Math.round($(this).outerHeight());
                    _this.chapters[i].ui = {
                        top: top,
                        bottom: (top + height)
                    };
                });
            },
            init() {
                this.ready = false;
                $('.story__body').scrollTop(0);
                this.rewind();
                this.initScrolly();
                setTimeout(() => {
                    this.prepairHtml();
                }, 2000)
            },
            prepairHtml() {
                twttr.widgets.load();
                setTimeout(() => {
                    this.measureChapters();
                });
                setTimeout(() => {
                    this.ready = true;
                }, 0)
            }
        },
        mounted() {
            this.init();

        },
        watch: {
            currentLanguage: {
                handler: function() {
                    this.init();
                },
                deep: true
            },
            offset: {
                handler: function() {
                    if (this.view) {
                        this.setScrollByOffset(this.view.offset);
                    }
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
            :current-region="view.currentRegion"
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
                        v-for="(chapter, index) in chapters"
                        :chapter="chapter"/>
                </div>
                <div class="story__outro">
                    Hoewel met zorg samengesteld, kan deze reconstructie feitelijke
                    onjuistheden bevatten. Ook hebben we geprobeerd om beeldrechten
                    te respecteren, met de juiste credits.<br>
                    Neem contact op met <a href="mailto:info@innouveau.nl">info@innouveau.nl</a>
                    voor tips, correcties en dergelijke.
                </div>
            </div>
        </div>

        <story-hint
            :has-scrolled="hasScrolled"/>

        <div
            v-if="!ready"
            class="loader__container">
            <loader/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .story {
        height: 100%;

        .loader__container {
            height: calc(100% - 300px);
            position: absolute;
            left: 0;
            top: 300px;
            width: 100%;
        }

        .story__body {
            height: calc(100% - 300px);
            overflow: auto;
            //background: #D6E2EA;

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

                .story__outro {
                    margin-top: 200px;
                    font-style: italic;
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