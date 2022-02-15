export default {
    name: 'map-navigation-zoom-scroll',
    methods: {
        handleScroll(event) {
            const max = 400;
            const scrollDistance = Math.min(Math.abs(event.deltaY), max);
            const scrollDirection = Math.sign(event.deltaY);
            const factor = 1 -(scrollDirection * scrollDistance / (max * 1.1));
            this.$store.commit('settings/zoom', factor);
        }
    },
    mounted () {
        this.$el.addEventListener('wheel', this.handleScroll);
    },
    destroyed () {
        this.$el.removeEventListener('wheel', this.handleScroll);
    },
}
