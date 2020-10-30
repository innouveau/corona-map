<script>
    export default {
        name: 'sewage-city-measurement',
        components: {},
        props: {
            measurement: {
                type: Object,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            height() {
                return this.measurement.value / this.settings.calibration;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{
            'height': height + 'px',
            'width': settings.width + 'px',
            'margin-right': settings.margin + 'px'
        }"
        :class="{
            'sewage-city-measurement--interpreted': measurement.interpreted,
            'sewage-city-measurement--unreliable': measurement.unreliable,
        }"
        class="sewage-city-measurement"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city-measurement {
        background: #000;

        &.sewage-city-measurement--interpreted {
            background: #bbb;
        }

        &.sewage-city-measurement--unreliable {
            opacity: 0.2;
        }



        &.sewage-city-sewage__bar--representative {
            background: #000;
        }

        &.sewage-city-sewage__bar--outlier {
            background: yellow;
        }

        .sewage-city-sewage__measurement {
            position: absolute;
            left: 4px;
            top: -14px;
            transform: translate(-50%);
            font-size: 9px;
            color: #888;
        }
    }
</style>