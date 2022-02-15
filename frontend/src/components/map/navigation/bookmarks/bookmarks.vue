<script>
import Bookmark from "./bookmark";
export default {
    name: 'bookmarks',
    components: {Bookmark},
    data() {
        return {
            dropdown: false
        }
    },
    computed: {
        bookmarks() {
            return this.$store.state.maps.current.settings.map.bookmarks;
        }
    },
    methods: {
        toggle() {
            this.dropdown = !this.dropdown;
        },
        close() {
            this.dropdown = false;
        }
    }
}
</script>


<template>
    <div class="bookmarks map-navigation__section">
        <h3 @click="toggle">
            Bookmarks <span>▼</span>
        </h3>
        <menu
            v-if="dropdown"
            class="bookmarks__dropdown">
            <bookmark
                v-for="(bookmark, index) in bookmarks"
                :key="index"
                @close="close"
                :bookmark="bookmark" />
        </menu>
    </div>
</template>


<style lang="scss">
.bookmarks {
    position: relative;

    h3 {
        cursor: pointer;

        span {
            font-size: 8px;
        }
    }

    &__dropdown {
        padding: 0;
        position: absolute;
        left: 16px;
        top: 20px;
        width: 100px;
        background: #fff;
        z-index: 10;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    }
}
</style>
