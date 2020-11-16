<script>
    import GGD from "@/classes/region/GGD";
    import Country from "@/classes/region/Country";
    import AgeGroupWeek from "./age-group-week";
    import View from "@/classes/View";

    export default {
        name: 'age-group',
        components: {AgeGroupWeek},
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: GGD | Country,
                required: true
            },
            ageGroup: {
                type: Object,
                required: true
            },
            weeks: {
                type: Array,
                required: true
            }
        },
        computed: {
            population() {
                let population = 0;
                for (let city of this.region.getRegions()) {
                    let ageGroup = city.ageGroups.find(a => a.title === this.ageGroup.title);
                    if (ageGroup) {
                        population += ageGroup.population;
                    }
                }
                return population;
            },
            width() {
                return 7 * this.$store.state.settings.step;
            },
            opacityCover() {
                let uncertainDays = 3;
                if (this.view.offset > uncertainDays) {
                    return 0;
                } else {
                    return 100 - (this.view.offset * (100 / uncertainDays))
                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="age-group">
        <div class="age-group__weeks">
            <age-group-week
                v-for="week in weeks"
                :view="view"
                :week="week"
                :age-group="ageGroup"
                :region="region"
                :population="population"/>
            <div
                :style="{
                    'width': width + 'px',
                    'opacity': opacityCover + '%'
                }"
                class="age-group__cover"></div>
        </div>
        <div
            :style="{'width': width + 'px'}"
            class="age-group__title">
            {{ageGroup.title}}
        </div>
        <div
            :style="{'width': width + 'px'}"
            class="age-group__population">
            {{population}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-group {
        display: flex;
        width: 100%;
        height: 32px;

        .age-group__title {
            height: 100%;
            padding: 4px 8px;
            align-items: center;
            justify-content: center;
            display: flex;
            flex-shrink: 0;
        }

        .age-group__population {
            height: 100%;
            padding: 4px 8px;
            align-items: center;
            justify-content: center;
            display: flex;
            flex-shrink: 0;
        }

        .age-group__weeks {
            height: 100%;
            display: flex;
            border-bottom: 1px solid #fff;
            position: relative;

            .age-group__cover {
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                background: #fff;
                z-index: 1;
                transition: all 0.2s ease;
            }
        }
    }
</style>