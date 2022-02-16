import numberTools from '@/tools/number';

export default {
    name: 'trend-mixin',
    data() {
        return {
            list: []
        }
    },
    props: {
        direction: {
            type: String,
            required: true,
            default: 'top'
        },
    },
    computed: {
        currentRegionType() {
            return this.$store.state.ui.currentRegionType;
        },
        currentMap() {
            return this.$store.state.maps.current;
        },
        regions() {
            let regions = this.$store.getters['ui/regions'].filter(region => !region.noData);
            // check if the country has regions in this map
            if (this.currentRegionType === 'country') {
                regions = regions.filter(country => {
                    return this.$store.state.regions.all.filter(r => {
                        return r.country_id === country.id;
                    }).length > 0;
                })
            }
            return regions;
        }
    },
    methods: {
        updateList() {
            let score = [];
            this.list = [];
            for (let region of this.regions) {
                let value = this.getValue(region);
                if (!isFinite(value)) {
                    value = 0;
                }
                score.push({
                    region, value
                })
            }
            score.sort((a,b) => {
                return this.direction === 'top' ? b.value - a.value : a.value - b.value;
            })
            this.list = score.slice(0, 10);
        },
        formatted(value) {
            return numberTools.format(Math.round(value), true);
        }
    },
    mounted() {
        this.updateList();
    },
    watch: {
        currentRegionType: {
            handler: function () {
                this.updateList();
            }
        }
    }
}
