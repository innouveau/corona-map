<script>
    export default {
        name: 'hamburger-menu',
        components: {},
        props: {},
        computed: {
            languages() {
                return this.$store.state.languages.all;
            },
            pages() {
                return [
                    {
                        title: 'info',
                        route: 'main'
                    }, {
                        title: 'compare',
                        route: 'compare'
                    }, {
                        title: 'timeline',
                        route: 'timeline'
                    }
                ]
            },
            currentPage() {
                return this.$route.name;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            maps() {
                return this.$store.state.maps.all;
            },
            routePath() {
                return window.location.href.split('#')[0];
            }
        },
        methods: {
            selectLanguage(language) {
                this.$store.commit('languages/setCurrent', language);
                this.close();
            },
            isCurrentLanguage(language) {
                return this.$store.state.languages.current === language;
            },
            selectPage(page) {
                console.log(page);
                this.$router.push(page.route);
                this.close();
            },
            isCurrentPage(page) {
                return this.currentPage === page.route;
            },
            selectMap(map) {
                console.log(map);
                let url = this.routePath + '/#/timeline/?map=' + map.title;
                window.open(url);
                this.close();
            },
            isCurrentMap(map) {
                return this.currentMap === map;
            },
            openCredits() {
                this.$store.commit('ui/updateProperty', {key: 'creditsPopup', value: true});
                this.close();
            },
            close() {
                this.$store.commit('ui/updateProperty', {key: 'hamburgerMenu', value: false});
            }
        }
    }
</script>


<template>
    <div class="cover">
        <div
            @click="close()"
            class="cover__close"></div>
        <div class="hamburger-menu">
            <div class="hamburger-menu__section">
                <div class="hamburger-menu__section-head">
                    Switch language
                </div>
                <div class="hamburger-menu__section-body">
                    <div
                        v-for="language in languages"
                        @click="selectLanguage(language)"
                        :class="{'hamburger-menu__button--active': isCurrentLanguage(language)}"
                        class="hamburger-menu__button">
                        {{language.name}}
                    </div>
                </div>
            </div>
            <div class="hamburger-menu__section">
                <div class="hamburger-menu__section-body">
                    <div
                        @click="openCredits()"
                        class="hamburger-menu__button">
                        Credits
                    </div>
                </div>
            </div>
            <div class="hamburger-menu__section">
                <div class="hamburger-menu__section-head">
                    Pages
                </div>
                <div class="hamburger-menu__section-body">
                    <div
                            v-for="page in pages"
                            @click="selectPage(page)"
                            :class="{'hamburger-menu__button--active': isCurrentPage(page)}"
                            class="hamburger-menu__button">
                        {{translate(page.title, true)}}
                    </div>
                </div>
            </div>
            <div class="hamburger-menu__section">
                <div class="hamburger-menu__section-head">
                    Other maps
                </div>
                <div class="hamburger-menu__section-body">
                    <div
                            v-for="map in maps"
                            @click="selectMap(map)"
                            :class="{'hamburger-menu__button--active': isCurrentMap(map)}"
                            class="hamburger-menu__button">
                        {{map.title}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cover {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 10;

        .cover__close {
            position: absolute;
            left: 0;
            top: 0;
            width: calc(100% - 300px);
            height: 100%;
            cursor: pointer;
            z-index: 1;
        }

        .hamburger-menu {
            position: absolute;
            right: 0;
            top: 0;
            width: 300px;
            background: #fff;
            box-shadow: -4px 4px 12px rgba(0,0,0,0.2);
            height: 100%;
            overflow: auto;

            .hamburger-menu__section {
                margin-bottom: 20px;

                .hamburger-menu__section-head {
                    padding: 12px;
                    font-weight: 700;
                }

                .hamburger-menu__section-body {

                    .hamburger-menu__button {
                        padding: 12px;
                        border-bottom: 1px solid #ddd;
                        cursor: pointer;

                        &:hover {
                            background: #ddd;
                        }

                        &.hamburger-menu__button--active {
                            background: #ddd;
                        }
                    }
                }
            }
        }

        @include mobile() {

            .cover__close {
                display: none;
            }

            .hamburger-menu {
                width: 100%;
            }
        }
    }
</style>