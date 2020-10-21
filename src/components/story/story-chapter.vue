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
            right: calc(100% + 20px);
            top: -2px;
            text-align: right;
            white-space: nowrap;
            background: #fff;
            border-radius: 3px;
            padding: 4px 8px;
            box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
            z-index: 2;

            &:before {
                width: 18px;
                height: 1px;
                background: #fff;
                content: '';
                position: absolute;
                right: -20px;
                top: 10px;
                z-index: 1;
            }

            &:after {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                content: '';
                background: #fff;
                position: absolute;
                right: -26px;
                top: 4px;
                border: 2px solid #D6E2EA;
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