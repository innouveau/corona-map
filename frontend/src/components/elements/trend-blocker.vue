<script>
import View from "@/classes/View";

export default {
    name: "trend-blocker",
    computed: {
        displayTrends() {
            return this.$store.state.ui.showTrends;
        },
        offset() {
            return this.view.offset;
        },
        offsetStart() {
            return this.view.offsetStart;
        },
        currentSource() {
            return this.view.currentSource;
        },
        currentPage() {
            return this.$route.name;
        },
        currentRegionType() {
            return this.$store.state.ui.currentRegionType;
        },
    },
    props: {
        view: {
            type: View,
            required: true,
        },
    },
    methods: {
        showTrends() {
            this.$store.commit("ui/updateProperty", {
                key: "showTrends",
                value: true,
            });
        },
        hideTrends() {
            this.$store.commit("ui/updateProperty", {
                key: "showTrends",
                value: false,
            });
        },
    },
    watch: {
        offset: function () {
            this.hideTrends();
        },
        offsetStart: function () {
            this.hideTrends();
        },
        currentSource: function () {
            this.hideTrends();
        },
        currentPage: function (a) {
            this.hideTrends();
        },
        currentRegionType: function () {
            this.hideTrends();
        },
    },
    beforeMount() {
        this.hideTrends();
    },
};
</script>

<template>
    <div class="trend-blocker">
        <slot v-if="displayTrends" />

        <div v-else>
            <p>
                {{ translate("show-notification") }}
            </p>
            <div class="buttons">
                <div @click="showTrends()" class="button">
                    {{ translate("show-trend") }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
