<script>
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';

    export default {
        name: 'sewage-tools',
        components: {
            Datepicker
        },
        data() {
            return {
                startDate: this.$store.getters['ui/getDateByOffset'](this.settings.start, false),
                endDate: this.$store.getters['ui/getDateByOffset'](this.settings.end, false)
            }
        },
        props: {
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {},
        methods: {
            updateStart(value) {
                this.settings.start = dateTools.getDateOffset(this.$store.state.ui.todayInMs, value.getTime());
            },
            updateEnd(value) {
                this.settings.end = dateTools.getDateOffset(this.$store.state.ui.todayInMs, value.getTime());
            }
        },
        watch: {
            startDate: {
                handler: function() {
                    console.log(this.startDate);
                }
            }
        }
    }
</script>


<template>
    <div class="sewage-tools">
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Van
            </div>
            <div class="sewage-tools__value">
                <datepicker
                    :value="startDate"
                    @input="updateStart"/>
            </div>
        </div>
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Tot
            </div>
            <div class="sewage-tools__value">
                <datepicker
                    :value="endDate"
                    @input="updateEnd"/>
            </div>
        </div>
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Zoek
            </div>
            <div class="sewage-tools__value">
                <input v-model="settings.search" placeholder="Zoek...">
            </div>
        </div>
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Min. inwoners
            </div>
            <div class="sewage-tools__value">
                <input type="number" v-model.number="settings.minPopulation">
            </div>
        </div>
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Max. inwoners
            </div>
            <div class="sewage-tools__value">
                <input type="number" v-model.number="settings.maxPopulation">
            </div>
        </div>
<!--        <div class="sewage-tools__section">-->
<!--            <input type="number" v-model.number="settings.calibration">-->
<!--            <input type="checkbox" v-model="settings.ignoreOutliers">-->
<!--        </div>-->
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-tools {

        .sewage-tools__section {
            padding: 12px;
            border-bottom: 1px solid #ddd;

            .sewage-tools__label {
                margin-bottom: 2px;
            }

            .sewage-tools__value {

                input {
                    width: 100%;
                    background: #abddff;
                }
            }

            .vdp-datepicker {

            }
        }
    }
</style>