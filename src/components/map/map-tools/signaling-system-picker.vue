<script>
    export default {
        name: 'signaling-system-picker',
        components: {},
        props: {},
        computed: {
            signalingSystems() {
                return this.$store.state.signalingSystems.all;
            },
            activeSignalingSystem: {
                get() {
                    return this.$store.state.signalingSystems.current;
                },
                set(signalingSystem) {
                    this.$store.commit('signalingSystems/setCurrent', signalingSystem);

                }
            }
        },
        methods: {
            select(signalingSystem){
                this.$store.commit('signalingSystems/setCurrent', signalingSystem);
                this.$parent.close();
            },
            isActive(signalingSystem) {
                return this.$store.state.signalingSystems.current === signalingSystem ;
            }
        }
    }
</script>


<template>
    <div class="signaling-system-picker">
        <div class="map-tools-popup__head">
            {{translate('signaling-system', true)}}
        </div>
        <div class="map-tools-popup__body">
            <div
                v-for="signalingSystem in signalingSystems"
                @click="select(signalingSystem)"
                :class="{'map-tools-popup__button--active': isActive(signalingSystem)}"
                class="map-tools-popup__button">
                <div class="map-tools-popup__checkmark">
                    <img src="assets/img/tools/checkmark.svg">
                </div>
                <div class="map-tools-popup__title">
                    {{signalingSystem.title}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .signaling-system-picker {}
</style>