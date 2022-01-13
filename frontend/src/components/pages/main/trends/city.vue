<script>
    import City from "@/classes/region/City";
    import swatch from "@/components/region/swatch";

    export default {
        name: 'city',
        components: {
            swatch
        },
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {},
        methods: {
            selectCity() {
                this.$store.commit('ui/updateProperty', {key: 'currentRegion', value: this.city});
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
            }
        }
    }
</script>


<template>
    <div
        @click="selectCity()"
        class="city">
        <swatch :threshold="city.getThreshold()"/>

        <div class="city__title">
            {{city.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities__list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;

        &:last-child {
        margin-bottom: 0;
        }

        .city__container {
            display: flex;
            align-items: center;
            margin-right: 4px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .city {
        display: flex;
        align-items: center;
        margin-right: 4px;
        cursor: pointer;

        &:last-child {
            margin-right: 0;
        }
    }
</style>
