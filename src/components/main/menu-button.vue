<script>
    export default {
        name: 'menu-button',
        components: {},
        props: {
            button: {
                type: Object,
                required: true
            }
        },
        computed: {
            isActive() {
                return this.$store.state.ui.menu === this.button.value;
            }
        },
        methods: {
            select() {
                if (this.button.value === 'trends') {
                    this.$store.commit('ui/updateProperty', {key: 'showTrends', value: true});
                }
                this.$store.commit('ui/updateProperty', {key: 'menu', value: this.button.value});

            }
        }
    }
</script>


<template>
    <div
        @click="select('map')"
        :class="{'menu-button--active': isActive}"
        class="menu-button">
        <div class="menu-button__label">
            {{button.label}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .menu-button {
        border-right: 1px solid #aaa;
        height: 100%;
        width: calc(100% / 3);
        cursor: pointer;

        .menu-button__label {
            border-bottom: 4px solid transparent;
            height: 100%;
            justify-content: center;
            display: flex;
            align-items: center;
            padding: 0 12px;
        }

        &.menu-button--active {

            .menu-button__label {
                border-bottom: 4px solid red;
            }
        }

        &:last-child {
            border-right: 0;
        }
    }
</style>