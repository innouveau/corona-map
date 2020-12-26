<script>
    export default {
        name: 'story-hint',
        components: {},
        props: {
            hasScrolled: {
                type: Boolean,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div
        :class="{'story-hint--hidden': hasScrolled}"
        class="story-hint">
        <div
            v-html="translate('scroll-hint', true)"
            class="story-hint__text"></div>
        <div class="story-hint__arrow">↓</div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .story-hint {
        position: absolute;
        left: 50%;
        bottom: 20px;
        background: orange;
        padding: 20px;
        z-index: 1;
        box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        pointer-events: none;
        animation: bounce 3s infinite;
        //border-bottom: 2px solid #000;
        text-align: center;
        width: 300px;
        opacity: 1;

        .story-hint__arrow {
            font-size: 24px;
        }

        &.story-hint--hidden {
            opacity: 0;
            transition: all 0.5s ease;
            transition-delay: 1.5s;
        }
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, 0);
        }
        40% {
            transform: translate(-50%, -12px);
        }
        60% {
            transform: translate(-50%, -5px);
        }
    }
</style>