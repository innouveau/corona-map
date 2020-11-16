<script>
    import Province from "@/classes/region/Province";

    export default {
        name: 'sewage-tools-province',
        components: {},
        props: {
            province: {
                type: Province,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                active: this.settings.provinces.indexOf(this.province.province_code) > -1
            }
        },
        computed: {},
        methods: {
            toggle() {
                let index = this.settings.provinces.indexOf(this.province.province_code);
                if (index > -1) {
                    this.settings.provinces.splice(index, 1);
                } else {
                    this.settings.provinces.push(this.province.province_code);
                }
            },
        },
        watch: {
            active: function () {
                this.toggle()
            }
        }
    }
</script>


<template>
    <div class="sewage-tools-province">
        <input
            type="checkbox"
            v-model="active">
        <div class="sewage-tools-province__title">
            {{province.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-tools-province {
        display: flex;
        align-items: center;
        font-size: 9px;


        input {
            margin-right: 3px;
        }

        .sewage-tools-province__title {

        }
    }
</style>