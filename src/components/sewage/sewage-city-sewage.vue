<script>
    import City from "@/classes/City";
    import SewageTreatmentPlant from "@/classes/SewageTreatmentPlant";

    export default {
        name: 'sewage-city-sewage',
        components: {},
        props: {
            sewage: {
                type: SewageTreatmentPlant,
                required: true
            },
            city: {
                type: City,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            width() {
                return (this.settings.start - this.settings.end + 1) * (this.settings.width + this.settings.margin);
            },
            measurements() {
                return this.sewage.measurements.filter(measurement => {
                    return measurement.dateOffset <= this.settings.start && measurement.dateOffset >= this.settings.end;
                }).map(measurement => {
                    return {
                        value: measurement.RNA_per_ml,
                        offset: this.settings.start - measurement.dateOffset,
                        date: measurement.date,
                        representative_measurement: measurement.representative_measurement
                    };
                })
            },
            maxHeight() {
                return Math.max(...this.measurements.map(m => this.getHeight(m))) + 30;
            },
            average() {
                if (this.measurements.length === 0) {
                    return 0;
                }
                return Math.round(this.measurements.reduce((a, b) => a + b.value, 0) / this.measurements.length);
            }
        },
        methods: {
            getHeight(measurement) {
                return measurement.value / this.settings.calibration;
            },
            getLeft(measurement) {
                return measurement.offset * (this.settings.width + this.settings.margin);
            }
        }
    }
</script>


<template>
    <div class="sewage-city-sewage">
        <div
            :style="{
                'width': width + 'px',
                'height': maxHeight + 'px'
            }"
            class="sewage-city-sewage__graph">
            <div
                v-for="measurement in measurements"
                :style="{
                    'height': getHeight(measurement) + 'px',
                    'left': getLeft(measurement) + 'px',
                    'width': settings.width + 'px',
                    'margin-right': settings.margin + 'px'
                }"
                :title="measurement.value"
                :class="{'sewage-city-sewage__bar--representative': measurement.representative_measurement}"
                class="sewage-city-sewage__bar">
                <div class="sewage-city-sewage__measurement">
                    {{measurement.value}}
                </div>
            </div>
        </div>
        <div class="sewage-city-sewage__title">
            <b>Rioolmetingen {{sewage.name}}</b><br>
            Capaciteit: {{sewage.capacity}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city-sewage {
        display: flex;
        margin-bottom: 2px;

        .sewage-city-sewage__graph {
            position: relative;
            min-height: 60px;
            border-bottom: 1px solid #000;
            background: #ddd;

            .sewage-city-sewage__bar {
                background: #888;
                position: absolute;
                bottom: 0;

                &.sewage-city-sewage__bar--representative {
                    background: #000;
                }

                .sewage-city-sewage__measurement {
                    position: absolute;
                    left: 4px;
                    top: -14px;
                    transform: translate(-50%);
                    font-size: 9px;
                    color: #888;
                }
            }
        }

        .sewage-city-sewage__title {
            padding: 4px;
        }
    }
</style>