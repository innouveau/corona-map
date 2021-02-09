<script>
    export default {
        name: 'age-group-x',
        components: {},
        props: {
            ageGroup: {
                type: Object,
                required: true
            }
        },
        computed: {
            currentAgeGroup() {
                return this.$store.state.ageGroups.current;
            },
            isCurrent() {
                return this.currentAgeGroup && this.currentAgeGroup.title === this.ageGroup.title;
            }
        },
        methods: {
            toggle() {
                this.$store.commit('ageGroups/updatePropertyOfItem', {item: this.ageGroup, property: 'active', value: !this.ageGroup.active});
            }
        }
    }
</script>


<template>
    <div
        @click="toggle()"
        :class="{
            'age-group-x--current': isCurrent,
            'age-group-x--inactive': !ageGroup.active
        }"
        class="age-group-x">
        <div
            :style="{'background': ageGroup.color}"
            class="age-group-x__swatch"></div>
        <div class="age-group-x__title">
            {{ageGroup.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-group-x {
        display: flex;
        align-items: center;
        font-size: 10px;
        padding: 1px 0;
        cursor: pointer;

        .age-group-x__swatch {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 4px;
        }

        .age-group-x__title {
            margin-bottom: -2px;
            border-bottom: 1px solid transparent;
        }

        &.age-group-x--current {

            .age-group-x__title {
                border-bottom: 1px solid #000;
            }
        }

        &.age-group-x--inactive {
            opacity: 0.2;
        }
    }
</style>