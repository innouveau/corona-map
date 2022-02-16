<script>
    import View from "@/classes/View";
    import PopulationTestRegion from "./population-test-region";

    export default {
        name: 'population-test-group',
        components: {PopulationTestRegion},
        props: {
            group: {
                type: Object,
                required: true
            },
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            },
            regions() {
                return this.group.regions.map(region => {
                    return this.$store.getters['regions/getItemByProperty']('title', region.title, true);
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="population-test-group">
        <div class="population-test-group__title">
            Group {{group.label}}: {{group.title}}
        </div>
        <div class="population-test-group__regions">
            <population-test-region
                v-for="region in regions"
                :region="region"
                :view="view"
                :group="group"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .population-test-group {
        border-bottom: 1px solid #ddd;
        padding: 4px 0;

        .population-test-group__title {
            font-weight: 700;
            font-size: 14px;
            margin-left: 12px;
        }
    }
</style>
