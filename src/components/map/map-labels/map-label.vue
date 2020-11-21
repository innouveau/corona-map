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
            },
            size(){
                return 80
            },
            x1(){
                return 0;
            },
            x2() {
                return Math.abs(this.label.position.x);
            },
            y1(){
                return (this.label.position.x < 0 || this.label.position.y > 0) ? 0 : -this.label.position.y;
            },
            y2(){
                return (this.label.position.x < 0 || this.label.position.y > 0) ? Math.abs(this.label.position.y) : 0;
            },
            left() {
                return this.label.position.x < 0 ? 0 : -this.label.position.x;
            },
            top() {
                return this.label.position.y < 0 ? 0 : -this.label.position.y;
            },
            width() {
                return Math.abs(this.label.position.x);
            },
            height() {
                return Math.abs(this.label.position.y);
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{

            'left': (position.x + label.position.x) + 'px',
            'top': (position.y + label.position.y) + 'px'
        }"
        class="map-label">
        <div
            :style="{'border-left': '2px solid ' + label.color}"
            class="map-label__content">
            <div class="map-label__title">
                {{label.title}}
            </div>
            <div class="map-label__region">
                {{label.region.title}}
            </div>
        </div>

        <div
            :style="{
                'left': left + 'px',
                'top': top + 'px',
                'width': width + 'px',
                'height': height + 'px'
            }"
            class="map-label__pointer">
            <svg>
                <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" stroke="#888"></line>
                <line :x1="x1" :y1="(y1 - 1)" :x2="x2" :y2="(y2 - 1)" stroke="#000"></line>
            </svg>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-label {
        position: absolute;

        .map-label__content {
            background: #fff;
            padding: 2px 4px;
            display: flex;
            box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
            font-size: 9px;
            transform: translate(-50%, -50%);
            height: 16px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;

            .map-label__title {
                height: 100%;
                display: flex;
                align-items: center;
                border-right: 1px solid #ddd;
                padding-right: 2px;
            }

            .map-label__region {
                white-space: nowrap;
                padding: 2px;
                display: flex;
                align-items: center;
            }
        }

        .map-label__pointer {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 0;
            //background: rgba(255,0,0,0.1);
            //border: 1px solid #000;

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>