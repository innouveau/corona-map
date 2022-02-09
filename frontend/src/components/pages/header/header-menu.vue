<script>
    import menuButton from "./menu-button";
    import dayScore from "./day-score";
    import View from "@/classes/View";
    import HeaderMenuTitle from "./header-menu-title";

    export default {
        name: 'header-menu',
        components: {
            HeaderMenuTitle,
            dayScore,
            menuButton
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
        data() {
            return {
                buttons: [
                    {
                        value: 'map'
                    }, {
                        value: 'details'
                    }, {
                        value: 'trends'
                    }
                ]
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            },
            isCumulative() {
                return this.$route.name === "cumulative";
            },
            dateString() {
                const lang = this.currentLanguage.iso_code
                if (this.isCumulative) {
                    const offsetDate = this.$store.getters['ui/getDateByOffset']((this.view.offset * this.currentMap.data.sources.positiveTests.interval), 'dd MMM yyyy', lang);
                    const startDate = this.$store.getters['ui/getDateByOffset']((this.view.offsetStart * this.currentMap.data.sources.positiveTests.interval), 'dd MMM yyyy', lang);
                    return startDate + " - " + offsetDate
                } else {
                    return this.$store.getters['ui/getDateByOffset']((this.view.offset * this.currentMap.data.sources.positiveTests.interval), 'EE dd MMM yyyy', lang);
                }
            },
            isPanelPage() {
                return this.$route.name === 'main' || this.$route.name === 'change' || this.$route.name === 'cumulative';
            },
            videoMode() {
                return this.$store.state.ui.videoMode;
            },
            isPlaying() {
                return this.$store.state.ui.isPlaying;
            }
        }
    }
</script>


<template>
    <div
        :class="{'header-menu--cumulative': isCumulative }"
        class="header-menu">
        <div class="header-menu__main">
            <header-menu-title />

            <div class="header-menu__data">
                <div
                    v-if="view.currentSource"
                    class="header-menu__date">
                    {{dateString}}
                </div>

                <day-score
                    v-if="!videoMode && !isCumulative && view.currentSource && view.currentSource.loaded && !isPlaying"
                    :view="view"/>
            </div>
        </div>

        <div
            v-if="isPanelPage"
            class="header-menu__navigation">
            <menu-button
                v-for="button in buttons"
                :button="button"/>
        </div>
    </div>
</template>


<style lang="scss">
@import '@/styles/variables.scss';

.header-menu {
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    position: relative;
    z-index: 5;

    &__main {
        height: 48px;
        display: flex;
        align-items: center;
    }

    &__data {
        display: flex;
        font-size: 16px;
        font-family: $monospace;
        white-space: nowrap;
    }

    &__date {
        display: flex;
        height: 100%;
        align-items: center;
        border-right: 1px solid #ddd;
        padding: 8px 12px;
    }

    &__navigation {
        height: 32px;
        display: none;
        background: #fff;
        border-top: 1px solid #ddd;
    }

    @include header-menu-breakpoint() {

        &__main {
            height: 48px;
            padding-right: 44px;
        }

        .header-menu-title {
            width: 50%;
        }

        &__data {
            width: 50%;
            display: block;
            font-size: 12px;
            border-right: 1px solid #ddd;
            height: 100%;
        }

        &__date {
            width: 100%;
            height: 50%;
            border-right: 0;
            border-bottom: 1px solid #ddd;
            padding: 4px 8px;
        }

        &__navigation {
            display: flex;
        }

        &--cumulative {

            .header-menu__date {
                height: 100%;
                white-space: normal;
            }
        }
    }
}
</style>
