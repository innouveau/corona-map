<script>
    import Regio from "@/classes/Regio";

    export default {
        name: 'sewage-tools-regio',
        components: {},
        props: {
            regio: {
                type: Regio,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                active: this.settings.regios.indexOf(this.regio.title) > -1
            }
        },
        computed: {},
        methods: {
            toggle() {
                let index = this.settings.regios.indexOf(this.regio.title);
                if (index > -1) {
                    this.settings.regios.splice(index, 1);
                } else {
                    this.settings.regios.push(this.regio.title);
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
    <div class="sewage-tools-regio">
        <input
            type="checkbox"
            v-model="active">
        <div class="sewage-tools-regio__title">
            {{regio.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-tools-regio {
        display: flex;
        align-items: center;
        font-size: 9px;


        input {
            margin-right: 3px;
        }

        .sewage-tools-regio__title {

        }
    }
</style>