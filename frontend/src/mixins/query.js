import dateTools from '@/tools/date';

export default {
    name: 'query',
    components: {},
    props: {},
    computed: {
        route() {
            return this.$route.name;
        },
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
        query() {
            let query = "?";
            // read in app.vue
            const map = encodeURI(this.currentMap.title);
            const language = this.currentLanguage.iso_code;
            // read in page.vue
            const date = dateTools.getDateByOffset(this.view.offset);
            const source = this.view.currentSource.key;
            const region = this.currentRegion ? encodeURI(this.currentRegion.title) : "";
            const regiontype = this.$store.state.ui.currentRegionType;
            // signaling
            // gradient

            query += "map=" + map;
            query += "&source=" + source;
            query += '&language=' + language;
            query += '&regiontype=' + regiontype;
            if (this.currentRegion) {
                query += "&region=" + region;
            }
            if (this.view.offset > 0) {
                query += "&date=" + date;
            }
            if (this.route === "cumulative") {
                const start = dateTools.getDateByOffset(this.view.offsetStart);
                query += "&start=" + start;
            }
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
            this.updateQuery();
        }
    }
}
