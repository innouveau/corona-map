<script>
    import View from "@/classes/View";

    export default {
        name: 'age-distribution-tools',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            ageDistributionAbsolute: {
                get() {
                    return this.$store.state.settings.ageDistributionAbsolute;
                },
                set(value) {
                    this.$store.commit('settings/updateProperty', {key: 'ageDistributionAbsolute', value: !this.ageDistributionAbsolute});
                }
            },
            description() {
                if (this.ageDistributionAbsolute) {
                    return 'Positieve tests per leeftijdsgroep, gedurende 7 dagen';
                } else {
                    return 'Positieve tests per 100.000 inw. van die leeftijdsgroep, gedurende 7 dagen';
                }
            },
            showException() {
                return this.view.offset < 3;
            }
        },
        methods: {
            move(x) {
                this.view.offset += x;
            }
        }
    }
</script>


<template>
    <div class="age-distribution-tools">
        <div class="age-distribution-tools__text">
            {{description}}
        </div>
        <div class="age-distribution-tools__text">
            <div v-if="showException">
                * Data van laatste dagen wordt nog aangevuld, daarom wordt deze verborgen.
            </div>
        </div>
        <div class="age-distribution-tools__tools">
            <div class="age-distribution-absolute">
                <input
                    type="checkbox"
                    v-model="ageDistributionAbsolute"/> Absolute waardes
            </div>
            <div
                @click="move(1)"
                class="icon-button">
                <img src="assets/img/tools/back.svg" alt="">
            </div>
            <div
                @click="move(7)"
                class="icon-button">
                <img src="assets/img/tools/7xback.svg" alt="">
            </div>
            <div
                v-if="view.offset > 6"
                @click="move(-7)"
                class="icon-button">
                <img src="assets/img/tools/7xforward.svg">
            </div>
            <div
                v-if="view.offset > 0"
                @click="move(-1)"
                class="icon-button">
                <img src="assets/img/tools/forward.svg">
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-distribution-tools {
        font-size: 12px;

        .age-distribution-tools__text {
            //height: 18px;
        }


        .age-distribution-tools__tools {
            display: flex;

            .age-distribution-absolute {
                display: flex;
                align-items: center;
                margin-right: 10px;
            }

            .icon-button {
                margin-right: 4px;
            }
        }
    }
</style>
