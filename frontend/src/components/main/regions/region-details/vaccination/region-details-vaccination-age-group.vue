<script>
    export default {
        name: 'region-details-vaccination-age-group',
        components: {},
        props: {
            ageGroup: {
                type: Object,
                required: true
            }
        },
        computed: {

        },
        methods: {}
    }
</script>


<template>
    <div class="region-details-vaccination-age-group">
        <div class="region-details-vaccination-age-group__label">
            {{ageGroup.ageGroup}}
        </div>
        <div class="region-details-vaccination-age-group__container">
            <div
                :style="{'width': ageGroup.vaccination_coverage_partly + '%'}"
                class="region-details-vaccination-age-group__bar-partly"/>
            <div
                :style="{'width': ageGroup.vaccination_coverage_completed + '%'}"
                class="region-details-vaccination-age-group__bar-fully"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-vaccination-age-group {
        display: flex;
        height: 12px;
        font-size: 12px;
        margin-bottom: 1px;

        &__label {
            width: 60px;
            padding: 4px;
            display: flex;
            align-items: center;
        }

        &__container {
            width: calc(100% - 60px);
            position: relative;
            height: 100%;
            background: #ddd;
        }

        &__bar-partly {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: #2351a1;
        }

        &__bar-fully {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: #2d70e3;
        }
    }
</style>