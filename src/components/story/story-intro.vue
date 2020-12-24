<script>
    import Story from "@/classes/story/Story";

    export default {
        name: 'story-intro',
        components: {},
        props: {
            story: {
                type: Story,
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
    <div class="story-intro">
        <h3 v-html="getTranslatedItem(story.title)"/>
        <h4 v-html="getTranslatedItem(story.subtitle)"/>
        <div
            :style="{'background-image': 'url(' + story.image + ')'}"
            class="story-intro__image"></div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .story-intro {
        margin-bottom: 150px;

        h3 {
            line-height: 0.9;
            font-size: 65px;
            text-transform: uppercase;
            font-weight: 900;
            margin-bottom: 18px;
        }

        h4 {
            font-size: 22px;
            line-height: 1.35;
            margin-top: 0;
            margin-bottom: 96px;
            font-weight: 300;
            //font-family: $serif;

            .blocked {
                background: #000;
            }
        }

        .story-intro__image {
            height: 400px;
            background-position: 50% 50%;
            background-size: cover;
            background-repeat: no-repeat;
        }

        @include mobile() {

            h3 {
                font-size: 36px;
                margin-bottom: 8px;
            }

            h4 {
                font-size: 16px;
                margin-bottom: 24px;
            }

            .story-intro__image {
                height: 260px;
            }
        }
    }
</style>