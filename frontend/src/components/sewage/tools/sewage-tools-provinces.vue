<script>
    import SewageToolsProvince from "./sewage-tools-province";
    export default {
        name: 'sewage-tools-provinces',
        components: {SewageToolsProvince},
        props: {
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            provinces() {
                return this.$store.state.provinces.all
            }
        },
        methods: {
            toggle() {
                if (this.settings.provinces.length === 0) {
                    for (let province of this.provinces) {
                        this.settings.provinces.push(province.province_code)
                    }
                } else {
                    this.settings.provinces = [];
                }
            }
        }
    }
</script>


<template>
    <div class="sewage-tools-provinces">
        <sewage-tools-province
            v-for="province of provinces"
            :province="province"
            :settings="settings"/>
<!--        <div-->
<!--            @click="toggle()"-->
<!--            class="button">-->
<!--            Toggle allemaal-->
<!--        </div>-->
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-tools-provinces {
        display: flex;
        flex-wrap: wrap;
    }
</style>