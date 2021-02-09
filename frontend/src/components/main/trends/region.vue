<script>
    import View from "@/classes/View";
    import _Region from "@/classes/region/_Region";
    import swatch from "@/components/elements/swatch";

    export default {
        name: 'region',
        components: {
            swatch
        },
        props: {
            region: {
                type: _Region,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            isCurrent() {
                return this.region === this.$store.state[this.currentMap.module].current;
            }
        },
        methods: {
            selectRegion() {
                if (this.region.regionType === 'city' || this.region.regionType === 'district') {
                    this.view.currentRegion = this.region;
                }
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
            }
        }
    }
</script>


<template>
    <div
        @click="selectRegion()"
        :class="{'region--current': isCurrent}"
        class="region">
        <swatch :threshold="region.getThreshold(0, view.offset, view.currentSource)"/>

        <div class="region__title">
            {{region.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .regions__list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

        .region__container {
            display: flex;
            align-items: center;
            margin-right: 4px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .region {
        display: flex;
        align-items: center;
        margin-right: 4px;
        cursor: pointer;
        border-bottom: 1px solid transparent;

        &:last-child {
            margin-right: 0;
        }

        &.region--current {
            border-bottom: 1px solid #000;
        }
    }
</style>