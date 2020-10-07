<script>
    import _Region from "@/classes/_Region";
    import View from "@/classes/View";

    export default {
        name: 'region-details-head',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="region-details-head">
        <div
            :style="{'background': region.getColor(this.view.offset)}"
            class="dot"></div>
        <div
            :title="region.nutsCode"
            class="region-details__title">
            {{region.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-head {
        font-weight: 700;
        font-size: 20px;
        line-height: 1.2;
        margin-bottom: 12px;
        display: flex;
        align-items: center;

        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 10px;
            flex-grow: 0;
            flex-shrink: 0;
        }
    }
</style>