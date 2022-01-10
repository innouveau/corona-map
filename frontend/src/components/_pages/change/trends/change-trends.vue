<script>
    import View from "@/classes/View";
    import regionsShrinkage from "./regions-shrinkage";
    import RegionsGrowth from "./regions-growth";

    export default {
        name: 'change-trends',
        components: {
            RegionsGrowth,
            regionsShrinkage
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        computed: {
            isTrendPanel() {
                return this.$store.state.ui.menu === 'trends';
            },
            offset() {
                return this.view.offset;
            },
            showTrends() {
                return this.$store.state.ui.showTrends;
            }
        },
        methods: {
            doShowTrends(){
                this.$store.commit('ui/updateProperty', {key: 'showTrends', value: true});
            }
        },
        watch: {
            offset: {
                handler: function () {
                    this.$store.commit('ui/updateProperty', {key: 'showTrends', value: false});
                }
            }
        },
    }
</script>


<template>
    <div
        :class="{'panel--active': showTrends}"
        class="change-trends trends panel">
        <div v-if="showTrends">
            <regions-growth
                :view="view"/>
            <regions-shrinkage
                :view="view"/>
        </div>
        <div v-else>
            <p>
                {{translate('show-notification')}}
            </p>
            <div class="buttons">
                <div
                    @click="doShowTrends()"
                    class="button">
                    {{translate('show-trend')}}
                </div>
            </div>
        </div>
    </div>
</template>
