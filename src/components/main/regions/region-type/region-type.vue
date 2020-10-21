<script>
    import swatch from "@/components/elements/swatch";
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
            },
            width() {
                if (this.type.showRegion) {
                    return 'auto';
                } else {
                    return 'calc(100% / ' + this.n + ')';
                }
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
        :style="{'width': width}"
        class="region-type">
        <div
            v-if="type.showRegion"
            class="region-type__region">
            <swatch
                :threshold="type.getRegion().getThreshold(0, view.offset)"/>
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

        .region-type__region {
            display: flex;
            align-items: center;
            font-size: 10px;
            border-bottom: 1px solid transparent;
        }

        &.region-type--with-region {

            margin-right: 16px;

            &:after {
                content: '»';
                position: absolute;
                right: -11px;
                top: -5px;
            }

            &:last-child {
                margin-right: 0;

                &:after {
                    display: none;
                }
            }
        }

        &:not(.region-type--with-region) {
            height: 100%;

            .region-type__label {
                padding: 4px;
                border-right: 1px solid #ddd;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
            }
        }

        &.region-type--current {

            .region-type__region {
                border-bottom: 1px solid #000;
            }

            .region-type__label {
                background: #ddd;
            }

        }
    }
</style>