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
        methods: {}
    }
</script>


<template>
    <div class="signaling-system-picker">
        <select v-model="activeSignalingSystem">
            <option
                    v-for="signalingSystem in signalingSystems"
                    :value="signalingSystem">
                {{signalingSystem.title}}
            </option>
        </select>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .signaling-system-picker {
        margin-top: 6px;

        select {
            pointer-events: all;
        }
    }
</style>