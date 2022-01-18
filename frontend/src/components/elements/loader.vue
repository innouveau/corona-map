<script>
    export default {
        name: 'loader',
        props: {
            text: {
                type: String,
                required: false
            }
        }
    }
</script>


<template>
    <div class="loader">
        <div class="spinner"></div>
        <div v-if="text" class="loader__text">
            {{text}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .loader {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $grey-1;

        &__text {
            position: absolute;
            left: 50%;
            top: calc(50% + 70px);
            transform: translate(-50%, -50%);
        }

        .spinner,
        .spinner:before,
        .spinner:after {
            border-radius: 50%;
            width: 2.5em;
            height: 2.5em;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation: load7 1.8s infinite ease-in-out;
            animation: load7 1.8s infinite ease-in-out;
        }
        .spinner {
            color: #303030;
            font-size: 10px;
            margin: 80px auto;
            position: relative;
            text-indent: -9999em;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
        }
        .spinner:before,
        .spinner:after {
            content: '';
            position: absolute;
            top: 0;
        }
        .spinner:before {
            left: -3.5em;
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
        }
        .spinner:after {
            left: 3.5em;
        }
        @-webkit-keyframes load7 {
            0%,
            80%,
            100% {
                box-shadow: 0 2.5em 0 -1.3em;
            }
            40% {
                box-shadow: 0 2.5em 0 0;
            }
        }
        @keyframes load7 {
            0%,
            80%,
            100% {
                box-shadow: 0 2.5em 0 -1.3em;
            }
            40% {
                box-shadow: 0 2.5em 0 0;
            }
        }
    }
</style>
