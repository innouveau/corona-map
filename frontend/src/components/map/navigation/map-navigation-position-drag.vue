<script>
export default {
    name: 'map-navigation-position-drag',
    components: {},
    computed: {},
    data() {
        return {
            startPosition: {
                x: 0,
                y: 0
            },
            timer: null
        }
    },
    methods: {
        dragStart(event) {
            this.reset(event);
        },
        drag(event) {
            this.onMove(event);
        },
        touchStart(event) {
            const touch = event.changedTouches[0];
            this.reset(touch);
        },
        touch(event) {
            const touch = event.changedTouches[0];
            this.onMove(touch);
        },
        reset(moveEvent) {
            this.startPosition.x = moveEvent.clientX;
            this.startPosition.y = moveEvent.clientY;
        },
        onMove(moveEvent) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                const max = 100;
                const deltaX = moveEvent.clientX - this.startPosition.x;
                const deltaY = moveEvent.clientY - this.startPosition.y;
                if (Math.abs(deltaX) < max && Math.abs(deltaY) < max) {
                    this.$store.commit('settings/move', { x: deltaX, y: deltaY });
                    this.reset(moveEvent);
                }
            }, 1)
        }
    },
    mounted() {
        this.$el.addEventListener('touchstart', this.touchStart);
        this.$el.addEventListener('touchmove', this.touch);

    }
}
</script>


<template>
    <div
        @dragstart="dragStart"
        @drag="drag"
        draggable="true"
        class="map-navigation-position-drag">
    </div>
</template>


<style lang="scss">
.map-navigation-position-drag {
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: move;
    // background: rgba(255,0,0,0.1);
}
</style>
