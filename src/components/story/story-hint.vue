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
        <div class="story-hint__edge">

        </div>
        <div class="story-hint__main">
            <div class="story-hint__content">
                <div
                        v-html="translate('scroll-hint', true)"
                        class="story-hint__text"></div>
                <div class="story-hint__arrow">↓</div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .story-hint {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        pointer-events: none;
        text-align: center;
        width: 100%;
        opacity: 1;

        .story-hint__edge {
            height: 80px;
            background: rgba(255,255,255,0); /* Old browsers */
            background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(255,255,255,0', endColorstr='rgba(255,255,255,1',GradientType=0 ); /* IE6-9 */

        }

        .story-hint__main {
            background: #fff;

            .story-hint__content {
                width: 350px;
                max-width: 100%;
                margin: 0 auto;
                padding: 20px;
                animation: bounce 3s infinite;

                .story-hint__arrow {
                    font-size: 24px;
                }
            }
        }



        &.story-hint--hidden {
            opacity: 0;
            transition: all 0.5s ease;
            transition-delay: 1s;
        }
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY( 0);
        }
        40% {
            transform: translateY(-12px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
</style>