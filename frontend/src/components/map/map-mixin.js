export default {
    name: 'map-mixin',
    data() {
        return {
            id: Math.round(Math.random() * 1000000)
        }
    },
    computed: {
        ctx() {
            return this.canvas.getContext('2d');
        },
        currentMap() {
            return this.$store.state.maps.current;
        },
        sizes() {
            return this.$store.state.settings.sizes;
        },
        navigation() {
            return this.$store.state.settings.navigation;
        },
        mapRenderKey() {
            return 'map-' + this.sizes.canvas.width + '-' + this.navigation.zoom + this.navigation.position.x + '-' + this.navigation.position.y;
        }
    },
    methods: {
        clear() {
            this.ctx.clearRect(0, 0, this.sizes.container.width, this.sizes.container.height);
        }
    },
    watch: {
        navigation: {
            handler: function() {
                this.draw();
            },
            deep: true
        },
    }
}
