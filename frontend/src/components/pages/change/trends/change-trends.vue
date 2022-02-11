<script>
    import View from "@/classes/View";
    import ChangeTrendsRegions from "./change-trends-regions";
    import changeTools from '@/tools/change';
    import { getChangeOfType } from "@/tools/calculator";

    export default {
        name: 'change-trends',
        components: {
            ChangeTrendsRegions,
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            set() {
                const regions = this.$store.getters['ui/regions'];
                return regions.map(region => {
                    return {
                        region,
                        value: getChangeOfType(region, this.view.offset, 7, this.view.currentSource.key)
                    }
                })
            },
            setTop() {
                return this.set.filter(item => item.value > (1 + changeTools.margin))
            },
            setBottom() {
                return this.set.filter(item => item.value < (1 - changeTools.margin))
            },
            isVaccination() {
                return this.view.currentSource.key === 'vaccination';
            }
        },
    }
</script>


<template>
    <div class="change-trends trends">

        <change-trends-regions
            :view="view"
            :direction="'top'"
            :set="setTop"/>

        <change-trends-regions
            v-if="!isVaccination"
            :view="view"
            :direction="'bottom'"
            :set="setBottom"/>
    </div>
</template>
