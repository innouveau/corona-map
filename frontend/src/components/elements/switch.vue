<script>
    export default {
        name: 'v-switch',
        components: {},
        props: {
            toggle: {
                type: Function,
                required: true
            },
            isActive: {
                type: Boolean,
                required: true
            },
            size: {
                type: Number,
                required: false,
                default: 3
            }
        },
        computed: {},
        methods: {
            toggleLocal() {
                this.toggle();
            }
        }
    }
</script>


<template>
    <div
        @click="toggleLocal()"
        :class="{
            'switch--active': isActive
        }"
        class="switch">
        <div class="switch__button"></div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .switch {
        height: 16px;
        width: 32px;
        border-radius: 16px;
        background: #ddd;
        position: relative;
        transition: background 0.2s ease;
        cursor: pointer;
        font-size: 16px;
        border: 1px solid #888;
        margin-right: 12px;

        .switch__button {
            position: absolute;
            left: -1px;
            top: -1px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #fff;
            border: 1px solid #555;
            transition: left 0.15s ease;
        }

        &.switch--active {
            background: #555;

            .switch__button {
                left: 17px;
            }
        }
    }
</style>