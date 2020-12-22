<script>
    import Chapter from "@/classes/story/Chapter";
    import $ from 'jquery';

    export default {
        name: 'story-chapter',
        components: {},
        props: {
            chapter: {
                type: Chapter,
                required: true
            }
        },
        computed: {},
        methods: {
            getTranslatedItem(item) {
                return item[this.isoCode];
            }
        }
    }
</script>


<template>
    <div
        ref="main"
        class="story-chapter">
        <div class="story__label">
            {{getTranslatedItem(chapter.dateTitle)}}
        </div>
        <div class="story-chapter__header">
            {{getTranslatedItem(chapter.title)}}
        </div>
        <div
            v-html="getTranslatedItem(chapter.content)"
            class="story-chapter__content"></div>
<!--        <div class="story-chapter__content">{{getTranslatedItem(chapter.content)}}</div>-->
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .story-chapter {
        border-left: 1px solid #ddd;
        padding: 0 0 100px 40px;
        position: relative;

        .story__label {
            position: absolute;
            right: calc(100% + 20px);
            top: -2px;
            text-align: right;
            white-space: nowrap;
            background: #fff;
            border-radius: 3px;
            border: 1px solid #ddd;
            color: #555;
            padding: 4px 8px 3px 8px;
            z-index: 2;

            &:before {
                width: 18px;
                height: 1px;
                background: #ddd;
                content: '';
                position: absolute;
                right: -20px;
                top: 10px;
                z-index: 1;
            }

            &:after {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                content: '';
                background: #fff;
                position: absolute;
                right: -24px;
                top: 7px;
                border: 1px solid #ddd;
                z-index: 2;
            }
        }

        .story-chapter__header {
            font-size: 28px;
            line-height: 1.15;
            margin-bottom: 32px;
            font-weight: 900;
            position: relative;

            &:after {
                width: 40px;
                height: 4px;
                content: '';
                background: #000;
                position: absolute;
                left: 0;
                top: -12px;
            }
        }

        .story-chapter__content {
            font-size: 16px;
            line-height: 1.6;

            p {

                &:first-child {
                    font-weight: 700;
                }
            }

            img {
                border: 1px solid #ddd;
                display: block;
            }

            .frame {
                border: 1px solid #ddd;
                padding: 8px;
                position: relative;
                display: inline-block;
                color: #555;
                font-size: 12px;

                img {
                    border: 1px solid #ddd;
                    display: block;
                    margin-bottom: 8px!important;
                }
            }
        }

        @include mobile() {
            padding: 0 0 100px 23px;

            .story__label {
                right: auto;
                left: 20px;
                top: -48px;

                &:before {
                    width: 18px;
                    left: -20px;
                    right: auto;

                }

                &:after {
                    right: auto;
                    left: -26px;
                }
            }
        }
    }
</style>