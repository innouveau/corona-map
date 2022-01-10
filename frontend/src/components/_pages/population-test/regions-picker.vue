<script>
    export default {
        name: 'regions-picker',
        components: {},
        props: {
            regions: {
                type: Array,
                required: true
            },
            activeRegions: {
                type: Array,
                required: true
            }
        },
        computed: {},
        methods: {
            updateRegion(region) {
                let index = this.activeRegions.indexOf(region);
                if (index === -1) {
                    this.activeRegions.push(region);
                } else {
                    this.activeRegions.splice(index, 1);
                }
            },
            isActive(region) {
                return this.activeRegions.indexOf(region) > -1;
            }
        }
    }
</script>


<template>
    <div class="regions-picker">
        <div
            v-for="region in regions"
            @click="updateRegion(region)"
            :class="{'regions-picker__region--active': isActive(region)}"
            class="regions-picker__region">
            {{region.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .regions-picker {
        height: 140px;
        border-bottom: 1px solid #ddd;
        display: flex;
        padding: 8px;
        font-size: 10px;
        overflow: auto;
        flex-wrap: wrap;
        cursor: pointer;

        .regions-picker__region {
            display: flex;
            align-items: center;
            margin-right: 4px;
            margin-bottom: 2px;
            background: #ddd;
            padding: 2px 4px;

            &.regions-picker__region--active {
                background: #7ab6ff;
            }
        }
    }
</style>