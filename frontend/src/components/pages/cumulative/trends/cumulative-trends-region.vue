<script>
import _Region from "../../../../classes/region/_Region";

export default {
    name: 'cumulative-trends-region',
    components: {},
    props: {
        region: {
            type: _Region,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    },
    computed: {},
    methods: {}
}
</script>


<template>
    <div class="cumulative-trends-region">
        <div class="cumulative-trends-region__title">
            {{region.title}}
        </div>
    </div>
</template>


<style lang="scss">
.cumulative-trends-region {

}
</style>
