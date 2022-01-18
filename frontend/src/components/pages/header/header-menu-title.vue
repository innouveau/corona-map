<script>
export default {
    name: 'header-menu-title',
    components: {},
    computed: {
        currentMap() {
            return this.$store.state.maps.current
        },
        mapTitle() {
            let title = this.currentMap.title;
            if (!this.currentMap.ready) {
                title += ' (' + this.translate('work-in-progress') + ')';
            }
            return title;
        },
        pageTitle() {
            const routeName = this.$route.name;
            return routeName.charAt(0).toUpperCase() + routeName.slice(1);
        },
    },
    methods: {}
}
</script>


<template>
    <div class="header-menu-title">
        <div class="header-menu-title__page">
            Corona {{pageTitle}}
        </div>
        <div class="header-menu-title__map">
            {{mapTitle}}
        </div>
    </div>
</template>


<style lang="scss">
@import '@/styles/variables.scss';

.header-menu-title {
    font-size: 20px;
    display: flex;
    align-items: center;
    font-family: $serif;
    border-right: 1px solid #ddd;
    padding: 8px 16px;
    height: 100%;
    white-space: nowrap;

    &__page {
        margin-right: 8px;
    }

    &__map {
        font-weight: 700;
    }

    @include header-menu-breakpoint() {
        display: block;
        font-size: 15px;
        line-height: 1;
    }
}
</style>
