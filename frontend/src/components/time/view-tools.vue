<script>
    import Datepicker from 'vuejs-datepicker';
    import View from "@/classes/View";
    import dateTools from '@/tools/date';
    import timeSlider from "@/components/time/time-slider/time-slider";
    import timeSpeed from "./time-speed/time-speed";

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
            },
            videoMode() {
                return this.$store.state.ui.videoMode;
            }
        },
        methods: {
            updateOffset(value) {
                let dateString = dateTools.formatDate(value);
                this.view.offset = dateTools.getOffsetByDate(dateString) / this.currentMap.data.positivePcrTests.interval;
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

        <time-slider :view="view"/>

        <time-speed :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .view-tools {
        height: 56px;
        display: flex;
        align-items: center;
        width: 100%;

        .vdp-datepicker {
            width: 200px;

            .vdp-datepicker__calendar {
                bottom: 100%;
            }
        }

        .time-slider {
            min-width: 250px;
            width: calc(100% - 200px);
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
