<script>
    export default {
        name: 'map-label',
        components: {},
        props: {
            label: {
                type: Object,
                required: true
            }
        },
        computed: {
            position() {
                // use same settings as map-signaling
                let settings = {
                    width: this.$store.state.settings.canvasWidth,
                    height: this.$store.state.settings.canvasHeight,
                    shiftX: 0,
                    shiftY: 0,
                    zoom: this.$store.state.settings.zoom,
                };
                return this.label.region.getCentroid(settings)
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{
            'border-left': '4px solid ' + label.color,
            'left': position.x + 'px',
            'top': position.y + 'px'
        }"
        class="map-label">
        <div class="map-label__title">
            {{label.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-label {
        position: absolute;
        background: #fff;
        padding: 2px 4px;
        display: flex;
        box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
        font-size: 9px;
        transform: translate(-50%, -50%);
        height: 16px;

        .map-label__title {
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
</style>