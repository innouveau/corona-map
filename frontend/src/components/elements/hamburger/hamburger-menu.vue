<script>
    import LanguageSwitch from "./language/language-switch";

    export default {
        name: 'hamburger-menu',
        components: { LanguageSwitch },
        props: {},
        computed: {
            pages() {
                return [
                    {
                        title: 'info',
                        route: 'main'
                    }, {
                        title: 'change',
                        route: 'change'
                    }, {
                        title: 'cumulative',
                        route: 'cumulative'
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
            },
            isActive() {
                return this.$store.state.ui.hamburgerMenu;
            },
        },
        methods: {
            selectPage(page) {
                this.$router.push({name: page.route, query: { map: this.$store.state.maps.current.title }});
                this.close();
            },
            isCurrentPage(page) {
                return this.currentPage === page.route;
            },
            selectMap(map) {
                let url = this.routePath + '#/timeline/?map=' + map.title;
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
    <div
        :class="{'hamburger-menu--active': isActive}"
        class="cover">
        <div
            @click="close()"
            class="cover__close"></div>
        <div class="hamburger-menu">
            <a href="https://innouveau.com/" target="_blank" class="hamburger-menu__header">
                <div class="hamburger-menu__title">
                    Corona status
                </div>
                <div class="hamburger-menu__sub">
                    <div class="hamburger-menu__by">
                        Application by
                    </div>
                    <div class="hamburger-menu__identity">
                        <div class="square"></div>
                        <div class="circle"></div>
                        Innouveau
                    </div>
                </div>
            </a>
            <language-switch/>

            <div class="hamburger-menu__body">
                <div class="hamburger-menu__section">
                    <div class="hamburger-menu__section-head">
                        {{translate('pages', true)}}
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
                        {{translate('other-maps', true)}}
                    </div>
                    <div class="hamburger-menu__section-body">
                        <div
                            v-for="map in maps"
                            @click="selectMap(map)"
                            :class="{'hamburger-menu__button--active': isCurrentMap(map)}"
                            class="hamburger-menu__button">
                            {{map.title}} <span v-if="!map.ready">({{translate('work-in-progress')}})</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hamburger-menu__footer">
                <div class="hamburger-menu__footer-text">
                    {{translate('footer-text', true)}}
                </div>
                <div
                    @click="openCredits()"
                    class="hamburger-menu__footer-button">
                    Credits
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
        opacity: 0;
        transition: all 0.2s ease;
        pointer-events: none;

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
            right: -350px;
            top: 0;
            width: 300px;
            background: #fff;
            box-shadow: -4px 4px 12px rgba(0,0,0,0.2);
            height: 100%;
            transition: all 0.2s ease;

            .hamburger-menu__header {
                height: 80px;
                padding: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                color: #000;
                text-decoration: none;
                display: block;
                z-index: 1;
                position: relative;

                .hamburger-menu__title {
                    font-weight: 900;
                    font-size: 24px;
                    margin-bottom: 2px;
                }

                .hamburger-menu__sub {
                    display: flex;
                    align-items: center;

                    .hamburger-menu__by {
                        margin-right: 12px;
                    }

                    .hamburger-menu__identity {
                        font-family: 'Dosis', sans-serif;
                        display: flex;
                        align-items: center;
                        font-size: 12px;
                        font-weight: 700;

                        .square {
                            width: 12px;
                            height: 12px;
                            margin: 1px 3px 0 0;
                            background: #FFD400;
                        }

                        .circle {
                            width: 13px;
                            height: 13px;
                            border-radius: 50%;
                            background: #DE7070;
                            margin-right: 4px;
                        }
                    }
                }
            }

            .hamburger-menu__body {
                height: calc(100% - 220px);
                overflow: auto;
            }

            .hamburger-menu__footer {
                height: 100px;
                background: #DE7070;
                color: #fff;

                .hamburger-menu__footer-text {
                    padding: 12px;
                    height: 60px;
                }

                .hamburger-menu__footer-button {
                    height: 40px;
                    padding: 0 12px;
                    display: flex;
                    align-items: center;
                    background: #000;
                    cursor: pointer;

                    &:hover {
                        background: #DE7070;
                    }
                }


            }

            .hamburger-menu__section {
                margin-bottom: 20px;

                &:last-child {
                    margin-bottom: 0;
                }

                .hamburger-menu__section-head {
                    padding: 12px;
                    font-weight: 700;
                }

                .hamburger-menu__section-body {

                    .hamburger-menu__button {
                        padding: 6px 12px;
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

        &.hamburger-menu--active {
            opacity: 1;

            .cover__close {
                pointer-events: all;
            }

            .hamburger-menu {
                right: 0;
                pointer-events: all;
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
