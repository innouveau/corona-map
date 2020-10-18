<script>
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';

    export default {
        name: 'sewage-date',
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
    <div class="sewage-date">
        <div class="sewage-date__section">
            <datepicker
                :value="startDate"
                @input="updateStart"/>
                t/m
        </div>
        <div class="sewage-date__section">
            <datepicker
                :value="endDate"
                @input="updateEnd"/>
        </div>
        <div class="sewage-date__section">
            <input type="number" v-model.number="settings.calibration"> Calibratie
        </div>
        <div class="sewage-date__section">
            <input v-model="settings.search" placeholder="Zoek...">
        </div>
        <div class="sewage-date__section">
            <input type="number" v-model.number="settings.population"> min. inwoners
        </div>
        <div class="sewage-date__section">
            <input type="checkbox" v-model="settings.ignoreOutliers"> Negeer outschieters
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-date {
        display: flex;

        .sewage-date__section {
            padding: 12px;
            display: flex;
            align-items: center;

            &:first-child {
                padding-right: 0;
            }

            &:nth-child(2) {
                padding-left: 4px;
            }

            input {
                margin-right: 4px;
            }

            .vdp-datepicker {

                input {
                    background: #abddff;
                    width: 100px;
                }
            }
        }
    }
</style>