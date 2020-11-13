<script>
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';
    import sewageToolsProvinces from "./sewage-tools-provinces";
    import SewageToolsRegios from "./sewage-tools-regios";

    export default {
        name: 'sewage-tools',
        components: {
            SewageToolsRegios,
            sewageToolsProvinces,
            Datepicker
        },
        data() {
            let clone = {...this.settings};
            clone.provinces = [...this.settings.provinces];
            clone.regios = [...this.settings.regios];

            return {
                clone,
                startDate: this.$store.getters['ui/getDateByOffset'](clone.start, false),
                endDate: this.$store.getters['ui/getDateByOffset'](clone.end, false)
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
                this.clone.start = dateTools.getDateOffset(this.$store.state.ui.todayInMs, value.getTime());
            },
            updateEnd(value) {
                this.clone.end = dateTools.getDateOffset(this.$store.state.ui.todayInMs, value.getTime());
            },
            applySettings() {
                for (let key in this.settings){
                    if (key !== 'provinces' && key !== 'regios') {
                        this.settings[key] = this.clone[key];
                    }
                }
                this.settings.provinces = [];
                this.settings.regios = [];
                for (let province of this.clone.provinces) {
                    this.settings.provinces.push(province);
                }
                for (let regio of this.clone.regios) {
                    this.settings.regios.push(regio);
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
                <input v-model="clone.search" placeholder="Zoek...">
            </div>
        </div>
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Min. inwoners
            </div>
            <div class="sewage-tools__value">
                <input type="number" v-model.number="clone.minPopulation">
            </div>
        </div>
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Max. inwoners
            </div>
            <div class="sewage-tools__value">
                <input type="number" v-model.number="clone.maxPopulation">
            </div>
        </div>
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Provincies
            </div>
            <div class="sewage-tools__value">
                <sewage-tools-provinces
                    :settings="clone"/>
            </div>
        </div>
        <div class="sewage-tools__section">
            <div class="sewage-tools__label">
                Regio's
            </div>
            <div class="sewage-tools__value">
                <sewage-tools-regios
                    :settings="clone"/>
            </div>
        </div>
        <div class="sewage-tools__section">
            <input type="checkbox" v-model="clone.ignoreAmsterdam">
            Negeer Amsterdam
        </div>
<!--        <div class="sewage-tools__section">-->
<!--            <input type="number" v-model.number="clone.calibration">-->
<!--            <input type="checkbox" v-model="clone.ignoreOutliers">-->
<!--        </div>-->

        <div class="sewage-tools__section">
            <div
                    @click="applySettings()"
                    class="button">
                Toepassen
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-tools {

        .sewage-tools__section {
            padding: 4px 12px 8px 12px;
            border-bottom: 1px solid #ddd;

            .sewage-tools__label {
                margin-bottom: 2px;
            }

            .sewage-tools__value {

                input[type=text] {
                    height: 24px;
                    width: 100%;
                }

                input {

                    background: #abddff;

                }
            }

            .vdp-datepicker {

            }
        }
    }
</style>