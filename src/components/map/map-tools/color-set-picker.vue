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
        computed: {},
        methods: {
            select(colorSet){
                this.$store.commit('ui/updateProperty', {key: 'color', value: colorSet.value});
                this.$parent.close();
            },
            isActive(colorSet) {
                return this.$store.state.ui.color === colorSet.value;
            }
        }
    }
</script>


<template>
    <div class="color-set-picker">
        <div class="map-tools-popup__head">
            {{translate('color-set', true)}}
        </div>
        <div class="map-tools-popup__body">
            <div
                v-for="colorSet in colorSets"
                @click="select(colorSet)"
                :class="{'map-tools-popup__button--active': isActive(colorSet)}"
                class="map-tools-popup__button">
                <div class="map-tools-popup__checkmark">
                    <img src="assets/img/tools/checkmark.svg">
                </div>
                <div class="map-tools-popup__title">
                    {{translate(colorSet.label, true)}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .color-set-picker {

    }
</style>