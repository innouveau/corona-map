<script>
    import Datepicker from 'vuejs-datepicker';
    import View from "@/classes/View";
    import dateTools from '@/tools/date';
    import timeSlider from "@/components/view/time-slider";
    import timeSpeed from "./time-speed";

    export default {
        name: 'view-tools',
        components: {
            timeSpeed,
            timeSlider,
            Datepicker
        },
        props: {
            view: {
                type: View,
                required: true
            },
            showTimeTools: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                date: dateTools.getDateByOffset(this.view.offset),
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            offset() {
                return this.view.offset;
            },
            disabledDates() {
                if (this.currentMap.data.positivePcrTests.interval === 1) {
                    return {
                        days: []
                    };
                } else {
                    return {
                        days: [1,2,3,4,5,6]
                    }
                }
            }
        },
        methods: {
            updateOffset(value) {
                this.view.offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, value.getTime()) / this.currentMap.data.positivePcrTests.interval;
            },
            updateDate() {
                this.date = dateTools.getDateByOffset(this.view.offset);
            }
        },
        watch: {
            offset() {
                this.updateDate();
            }
        }
    }
</script>


<template>
    <div class="view-tools">
        <datepicker
            :value="date"
            :disabled-dates="disabledDates"
            @input="updateOffset"/>

        <time-slider
            :view="view"/>

        <time-speed
            v-if="showTimeTools"
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .view-tools {
        height: 56px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 0 8px;

        .time-slider {
            width: 300px!important;
        }

        input {
            margin-right: 20px;
        }

        @include mobile() {

            input {
                width: 80px;
            }

            .time-speed {
                display: none;
            }
        }
    }
</style>