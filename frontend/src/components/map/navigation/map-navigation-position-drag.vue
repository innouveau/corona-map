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
        reset(event) {
            this.startPosition.x = event.clientX;
            this.startPosition.y = event.clientY;
        },
        drag(event) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                const max = 100;
                const deltaX = event.clientX - this.startPosition.x;
                const deltaY = event.clientY - this.startPosition.y;
                if (Math.abs(deltaX) < max && Math.abs(deltaY) < max) {
                    this.$store.commit('settings/move', { x: deltaX, y: deltaY });
                    this.reset(event);
                }
            }, 1)
        },
        dragend(event) {
            this.startPosition.x = 0;
            this.startPosition.y = 0;
        }
    }
}
</script>


<template>
    <div
        @dragstart="dragStart"
        @drag="drag"
        @dragend="dragend"
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
}
</style>
