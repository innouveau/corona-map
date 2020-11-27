<script>
    export default {
        name: 'map-source-picker',
        components: {},
        props: {},
        computed: {
            sources() {
                return [{
                    key: 'positiveTests',
                    label: 'cases'
                }, {
                    key: 'hospitalisations',
                    label: 'hospitalisations'
                }];
            }
        },
        methods: {
            pickSource(source) {
                this.$store.commit('ui/updateProperty', {key: 'currentSource', value: source.key});
            },
            isActive(source){
                return source.key === this.$store.state.ui.currentSource;
            }
        }
    }
</script>


<template>
    <div class="map-source-picker">
        <div
            v-for="source in sources"
            @click="pickSource(source)"
            :class="{'map-source-picker__button--active': isActive(source)}"
            class="map-source-picker__button">
            {{source.label}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-source-picker {
        font-size: 10px;
        display: flex;

        .map-source-picker__button {
            margin-right: 12px;
            cursor: pointer;
            border-bottom: 1px solid transparent;
            position: relative;

            &:after {
                content: '/';
                position: absolute;
                right: -8px;
                top: 1px;
            }

            &.map-source-picker__button--active {
                border-bottom: 1px solid $map-color-super-dark;
            }

            &:last-child {
                margin-right: 0;

                &:after {
                    display: none;
                }
            }
        }
    }
</style>