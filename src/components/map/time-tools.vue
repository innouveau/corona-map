<script>
    import View from '@/classes/View';

    export default {
        name: 'time-tools',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            }
        },
        data() {
            return {
                timer: null
            }
        },
        computed: {
            historyLength() {
                return this.$store.state.settings.historyLength;
            },
            isAtEnd() {
                return this.view.offset === 0;
            },
            isAtStart() {
                return this.view.offset === this.historyLength;
            },
            isPlaying() {
                return this.$store.state.ui.isPlaying;
            }
        },
        methods: {
            rewind() {
                this.view.offset = this.historyLength;
            },
            play() {
                this.$store.commit('ui/updateProperty', {key: 'isPlaying', value: true});
                this.timer = setInterval(() => {
                    if (this.view.offset > 0) {
                        this.view.offset -= 1
                    } else {
                        this.stop();
                    }
                }, 200)
            },
            move(value) {
                this.view.offset -= value
            },
            stop() {
                this.$store.commit('ui/updateProperty', {key: 'isPlaying', value: false});
                clearInterval(this.timer);
            }
        }
    }
</script>


<template>
    <div class="time-tools">
        <div
            v-if="isAtEnd"
            @click="rewind()"
            class="icon-button">
            <img src="assets/img/tools/redo.svg">
        </div>

        <div
            v-if="!isPlaying && !isAtEnd"
            @click="play()"
            class="icon-button">
            <img src="assets/img/tools/play.svg">
        </div>

        <div
            v-if="isPlaying"
            @click="stop()"
            class="icon-button">
        <img src="assets/img/tools/stop.svg">
        </div>

        <div
                v-if="isPlaying || isAtStart"
                class="icon-button--placeholder">
        </div>

        <div
            v-if="!isPlaying && !isAtStart"
            @click="move(-1)"
            class="icon-button">
            <img src="assets/img/tools/back.svg">
        </div>
        <div
            v-if="!isPlaying && !isAtEnd"
            @click="move(1)"
            class="icon-button">
            <img src="assets/img/tools/forward.svg">
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-tools {
        display: flex;
        align-items: center;

        .icon-button {
            pointer-events: all;
            margin-right: 8px;
        }

        .icon-button--placeholder {
            width: 26px;
            margin-right: 8px;
        }
    }
</style>