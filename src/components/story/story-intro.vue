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
        <h3>{{getTranslatedItem(story.title)}}</h3>
        <h4>{{getTranslatedItem(story.subtitle)}}</h4>
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
            font-family: $serif;
            font-size: 36px;
            line-height: 1.15;
            margin-bottom: 6px;
        }

        h4 {
            font-family: $serif;
            font-size: 24px;
            line-height: 1.15;
            margin-top: 0;
            margin-bottom: 12px;
            font-weight: 400;
        }

        .story-intro__image {
            height: 400px;
            background-position: 50% 50%;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
</style>