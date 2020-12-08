<script>
    import dateTools from '@/tools/date';

    export default {
        name: 'query',
        components: {},
        props: {},
        computed: {
            hasSourcePicker() {
                return this.currentMap.data.hospitalisations.status || this.currentMap.data.deceased.status;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            },
            currentRegion() {
                return this.view.currentRegion;
            },
            routePath() {
                return window.location.href.split('?')[0];
            },
            date() {
                return dateTools.getDateByOffset(this.view.offset);
            },
            query() {
                let query = '?';
                query += this.currentMap ? ('map=' + encodeURI(this.currentMap.title)) : '';
                if (this.currentRegion) {
                    if (this.currentMap) {
                        query += '&';
                    }
                    query += this.currentRegion ? ('region=' + encodeURI(this.currentRegion.title)) : '';
                }
                if (this.view.offset > 0) {
                    query += '&date=' + this.date;
                }
                if (this.hasSourcePicker) {
                    query += '&source=' + this.view.currentSource.key
                }
                query += '&language=' + this.currentLanguage.iso_code;
                return query;
            },
            url() {
                return this.routePath + this.query;
            }
        },
        methods: {
            updateQuery() {
                history.pushState(
                    {},
                    null,
                    this.url
                );
            }
        },
        watch: {
            query: function () {
                if (this.$route.name !== 'riool' && this.$route.name !== 'vergelijk') {
                    this.updateQuery();
                }
            }
        }
    }
</script>


<template>
    <div class="query"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>