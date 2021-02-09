<script>
    import dateTools from '@/tools/date';

    export default {
        name: 'sewage-graph-date',
        components: {},
        props: {
            offset: {
                type: Number,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            dateString() {
                return dateTools.getDateByOffset(this.offset);
            },
            day() {
                return Number(this.dateString.split('-')[2]);
            },
            roundNumber() {
                return this.day === 1 || this.day === 15;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{
            'width': settings.width + 'px',
            'height': settings.width + 'px',
            'margin-right': settings.margin + 'px'
        }"
        :class="{'sewage-graph-date--round': roundNumber}"
        class="sewage-graph-date">
        <div
            v-if="roundNumber"
            class="sewage-graph-date__label">
            {{dateString}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-graph-date {
        border-radius: 50%;
        background: #ddd;
        position: relative;

        .sewage-graph-date__label {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 4px;
            white-space: nowrap;
            font-size: 8px;
        }

        &.sewage-graph-date--round {
            background: #000;
        }
    }
</style>