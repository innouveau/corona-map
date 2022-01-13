<script>
    import swatch from "@/components/region/swatch";
    import View from "@/classes/View";
    import ageGroupTool from "@/tools/age-group";

    export default {
        name: 'region-type',
        components: {
            swatch
        },
        props: {
            view: {
                type: View,
                required: true
            },
            type: {
                type: Object,
                required: true
            },
            n: {
                type: Number,
                required: false,
                default: 1
            }
        },
        computed: {
            isActive() {
                return this.$store.state.ui.currentRegionType === this.type.tag;
            },
            caseDataRequested() {
                return this.$store.state.ui.caseDataRequested;
            }
        },
        methods: {
            select() {
                this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.type.tag});
                if ((this.type.tag === 'ggd' || this.type.tag === 'country') && !this.caseDataRequested){
                    ageGroupTool.load();
                }
            }
        }
    }
</script>


<template>
    <div
        @click="select()"
        :class="{
            'region-type--current': isActive,
            'region-type--with-region': type.showRegion
        }"
        class="region-type">
        <div
            v-if="type.showRegion"
            class="region-type__region">
            <div class="region-type__value">
                {{type.getRegion().title}}
            </div>
        </div>
        <div
            v-else
            class="region-type__label">
            {{translate(type.tag, true)}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-type {
        position: relative;
        cursor: pointer;
        margin-right: 16px;
        height: 16px;
        font-size: 10px;

        &:after {
            content: '»';
            position: absolute;
            right: -11px;
            top: calc(50% - 1px);
            transform: translateY(-50%);
        }

        &:last-child {
            margin-right: 0;

            &:after {
                display: none;
            }
        }

        .region-type__region {
            display: flex;
            align-items: center;
            border-bottom: 1px solid transparent;
        }




        &.region-type--current {

            .region-type__region,
            .region-type__label {
                border-bottom: 1px solid $map-color-dark;
            }
        }
    }
</style>
