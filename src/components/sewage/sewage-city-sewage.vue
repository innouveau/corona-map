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
            measurementsObjects() {
                return this.sewage.measurements.filter(measurement => {
                    return measurement.dateOffset <= this.settings.start && measurement.dateOffset >= this.settings.end;
                }).map(measurement => {
                    return {
                        measurement: measurement,
                        offset: this.settings.start - measurement.dateOffset
                    };
                })
            },
            maxHeight() {
                return Math.max(...this.measurementsObjects.map(m => m.measurement).map(m => this.getHeight(m))) + 30;
            },
            average() {
                if (this.measurements.length === 0) {
                    return 0;
                }
                return Math.round(this.measurements.reduce((a, b) => a + b.RNA_per_ml, 0) / this.measurements.length);
            }
        },
        methods: {
            getHeight(measurement) {
                return measurement.RNA_per_ml / this.settings.calibration;
            },
            getLeft(measurementsObject) {
                return measurementsObject.offset * (this.settings.width + this.settings.margin);
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
                v-for="measurementsObject in measurementsObjects"
                :style="{
                    'height': getHeight(measurementsObject.measurement) + 'px',
                    'left': getLeft(measurementsObject) + 'px',
                    'width': settings.width + 'px',
                    'margin-right': settings.margin + 'px'
                }"
                :class="{
                    'sewage-city-sewage__bar--representative': measurementsObject.measurement.representative_measurement,
                    'sewage-city-sewage__bar--outlier': measurementsObject.measurement.isOutlier,
                }"
                class="sewage-city-sewage__bar">
                <div class="sewage-city-sewage__measurement">
                    {{measurementsObject.measurement.RNA_per_ml}}
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

                &.sewage-city-sewage__bar--outlier {
                    background: yellow;
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