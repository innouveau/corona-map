<script>
import View from "@/classes/View";
import topRelativeWeek from "./top-relative-week";
import topRelativeDay from "./top-relative-day";
import topAbsoluteDay from "./top-absolute-day";
import ListVaccination from "./vaccination/list-vaccination";

export default {
    name: "main-trends",
    components: {
        ListVaccination,
        topAbsoluteDay,
        topRelativeDay,
        topRelativeWeek,
    },
    props: {
        view: {
            type: View,
            required: true,
        },
    },
    computed: {
        hasDays() {
            return this.$store.state.maps.current.settings.interval === 1;
        },
        isVaccination() {
            return this.view.currentSource.key === "vaccination";
        },
    },
};
</script>

<template>
    <div class="main-trends">
        <div v-if="isVaccination">
            <list-vaccination :view="view" :direction="'top'" />
            <list-vaccination :view="view" :direction="'bottom'" />
        </div>

        <div v-else>
            <top-relative-week :view="view" />
            <top-relative-day v-if="hasDays" :view="view" />
            <top-absolute-day v-if="hasDays" :view="view" />
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";
</style>
