<script>
    import Chapter from "@/classes/story/Chapter";

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
    <div class="story-chapter">
        <div class="story__label">
            {{getTranslatedItem(chapter.dateTitle)}}
        </div>
        <div class="story-chapter__header">
            {{getTranslatedItem(chapter.title)}}
        </div>
        <div
            v-html="getTranslatedItem(chapter.content)"
            class="story-chapter__content"> </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .story-chapter {
        border-left: 1px solid #fff;
        padding: 0 0 100px 40px;
        position: relative;

        .story__label {
            position: absolute;
            right: 100%;
            top: -2px;
            padding-right: 20px;
            text-align: right;
            color: #fff;
            width: 120px;
            text-decoration: underline;

            &:after {
                width: 9px;
                height: 9px;
                border-radius: 50%;
                content: '';
                background: #fff;
                position: absolute;
                right: -4px;
                top: 2px;
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
        }
    }
</style>