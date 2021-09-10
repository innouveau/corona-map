<script>
    export default {
        name: 'region-details-vaccination-age-group',
        components: {},
        props: {
            ageGroup: {
                type: Object,
                required: true
            },
            reference: {
                type: Object | null,
                required: true
            }
        },
        computed: {

        },
        methods: {
            isN(n) {
                return !isNaN(n);
            }
        }
    }
</script>


<template>
    <div class="region-details-vaccination-age-group">
        <div class="region-details-vaccination-age-group__label">
            {{ageGroup.ageGroup}}
        </div>
        <div class="region-details-vaccination-age-group__container">
            <div
                v-if="isN(ageGroup.vaccination_coverage_partly)"
                :style="{'width': ageGroup.vaccination_coverage_partly + '%'}"
                class="region-details-vaccination-age-group__bar region-details-vaccination-age-group__bar-partly">
                {{ageGroup.vaccination_coverage_partly}}%
            </div>
            <div
                v-if="isN(ageGroup.vaccination_coverage_completed)"
                :style="{'width': ageGroup.vaccination_coverage_completed + '%'}"
                class="region-details-vaccination-age-group__bar region-details-vaccination-age-group__bar-fully">
                {{ageGroup.vaccination_coverage_completed}}%
            </div>
            <div
                v-if="reference && isN(reference.vaccination_coverage_completed)"
                :style="{'left': reference.vaccination_coverage_completed + '%'}"
                class="region-details-vaccination-age-group__reference"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-vaccination-age-group {
        display: flex;
        height: 12px;
        font-size: 12px;
        margin-bottom: 6px;

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

        &__bar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            padding-right: 3px;
            align-items: center;
            color: #fff;
            font-size: 9px;
        }

        &__bar-partly {
            background: #aaa;
        }

        &__bar-fully {
            background: #2d70e3;
        }

        &__reference {
            position: absolute;
            top: -4px;
            width: 0;
            height: 0;
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            border-top: 4px solid #000;
            transform: translate(-2px);
        }
    }
</style>