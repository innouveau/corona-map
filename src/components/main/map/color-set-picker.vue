<script>
    export default {
        name: 'color-set-picker',
        components: {},
        props: {},
        data() {
            return {
                colorSets: [
                    {
                        label: 'traffic-light',
                        value: 'regular'
                    }, {
                        label: 'color-blindness',
                        value: 'colorblind1'
                    }, {
                        label: 'gradient-1',
                        value: 'colorblind2'
                    }, {
                        label: 'gradient-2',
                        value: 'variant3'
                    }
                ]
            }
        },
        computed: {
            activeColorSet: {
                get() {
                    return this.$store.state.ui.color;
                },
                set(value) {
                    this.$store.commit('ui/updateProperty', {key: 'color', value});

                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="color-set-picker">
        <select
            v-model="activeColorSet">
            <option
                v-for="colorSet in colorSets"
                :value="colorSet.value">
                {{translate(colorSet.label, true)}}
            </option>
        </select>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .color-set-picker {
        margin-top: 12px;

        select {
            pointer-events: all;
        }
    }
</style>