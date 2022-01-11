<script>
    import region from "@/components/pages/main/trends/region";

    export default {
        name: 'changed-status-regions',
        components: {
            region
        },
        props: {},
        computed: {
            thresholds() {
                return this.$store.state.signalingSystems.current.thresholds;
            },
            sets(){
                let regions = this.$store.getters['ui/regions'];
                return this.thresholds.slice().reverse().map(threshold => {
                    return regions.filter(region => {
                        return region.changedStatus && region.getThreshold() === threshold
                    }).map(region => {
                        let previousThreshold, mutation;
                        previousThreshold = region.getThreshold(1);
                        if (threshold.n > previousThreshold.n) {
                            mutation = '↑';
                        } else {
                            mutation = '↓'
                        }
                        return {
                            region,
                            mutation
                        }
                    })
                })
            },
            typeLabel() {
                return this.$store.getters['ui/typeLabel'](true).toLowerCase();
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="section changed-status-regions">
        <div class="section__header">
            {{typeLabel}} die van status veranderd zijn
        </div>
        <div class="section__body">
            <div
                v-for="set in sets"
                class="regions__list">
                <div
                    v-for="item in set"
                    class="region__container">
                    <region :region="item.region"/>
                    <div
                        v-if="item.mutation === '↓'"
                        class="region__mutation">
                        ({{item.mutation}})
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .section {
        margin-bottom: 20px;

        .section__header {
            margin-bottom: 6px;
            font-weight: 700;
        }
    }
</style>
