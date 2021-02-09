<script>
    import View from "@/classes/View";

    export default {
        name: 'age-distribution-header',
        components: {},
        props: {
            view: {
                type: View,
                required: true
            },
            weeks: {
                type: Array,
                required: true
            }
        },
        computed: {
            width() {
                return 7 * this.$store.state.settings.step;
            }
        },
        methods: {
            getDateString(week) {
                let date1, date2, format1, format2, string;
                format1 = 'd';
                format2 = 'd MMM';
                date1 = this.$store.getters['ui/getDateByOffset']((week * 7 + 6 + this.view.offset), format1);
                date2 = this.$store.getters['ui/getDateByOffset']((week * 7 + this.view.offset), format2);
                string = date1 + ' - ' + date2;
                if (this.view.offset < 3 && week === 0) {
                    string += ' *';
                }
                return string;
            }
        }
    }
</script>


<template>
    <div class="age-distribution-header">
        <div
            v-for="week in weeks"
            :style="{
            'width': width + 'px'
            }"
            class="age-distribution-header__week">
            {{getDateString(week)}}
        </div>
        <div
            :style="{'width': width + 'px'}"
            class="age-distribution-header__week age-distribution-header__week--alt">
            Leeftijd
        </div>
        <div
            :style="{'width': width + 'px'}"
            class="age-distribution-header__week age-distribution-header__week--alt">
            Inwoners
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-distribution-header {
        display: flex;
        width: 100%;
        height: 32px;


        .age-distribution-header__week {
            height: 100%;
            padding: 2px;
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #fff;
            font-size: 10px;
            flex-shrink: 0;

            &.age-distribution-header__week--alt {
                background: #aaa;
            }
        }
    }
</style>