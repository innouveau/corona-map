<script>
    import inlineSvg from "@/components/elements/inline-svg";

    export default {
        name: 'checkbox',
        components: {
            inlineSvg
        },
        props: {
            isActive: {
                type: Boolean,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div
        :class="{'checkbox--active': isActive}"
        class="checkbox">
        <img src="assets/img/tools/checkmark.svg"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .checkbox {
        border: 1px solid #888;
        border-radius: 4px;
        margin-right: 6px;

        img {
            width: 16px;
            height: 16px;
            display: block;
            visibility: hidden;
        }

        &.checkbox--active {

            img {
                visibility: visible;
            }
        }
    }
</style>