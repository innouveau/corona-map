<script>
    export default {
        name: 'radio',
        components: {},
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="radio">
        <div class="radio__inner"></div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .radio__set {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        cursor: pointer;

        .radio {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1px solid #555;
            padding: 2px;
            margin-right: 8px;

            .radio__inner {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: transparent;
            }
        }

        .radio___label {
            text-transform: capitalize;
        }

        &.radio__set--active {

            .radio {

                .radio__inner {
                    background: #555;
                }
            }
        }
    }
</style>