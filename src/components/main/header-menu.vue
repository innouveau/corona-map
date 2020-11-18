<script>
    import menuButton from "./menu-button";
    import totalInfections from "@/components/elements/total-infections";
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';
    import View from "@/classes/View";

    export default {
        name: 'header-menu',
        components: {
            totalInfections,
            menuButton,
            Datepicker
        },
        props: {
            view: {
                type: View,
                required: true
            },
            editable: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                date: dateTools.getDateByOffset(this.view.offset * this.$store.state.maps.current.data.positivePcrTests.interval)
            }
        },
        computed: {
            buttons() {
                return [
                    {
                        label: 'Kaart',
                        value: 'map'
                    }, {
                        label: 'Trends',
                        value: 'trends'
                    }, {
                        label: 'Detail',
                        value: 'city'
                    }
                ]
            },
            currentMap() {
                return this.$store.state.maps.current
            },
            hasTests() {
                return this.currentMap && this.currentMap.settings.hasTests;
            },
            mapTitle() {
                let title = this.currentMap.title;
                if (!this.currentMap.ready) {
                    title += ' (' + this.translate('work-in-progress') + ')';
                }
                return title;
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            },
            dateString() {
                return this.$store.getters['ui/getDateByOffset']((this.view.offset * this.currentMap.data.positivePcrTests.interval), 'EE dd MMM', this.currentLanguage.iso_code)
            },
            offset() {
                return this.view.offset;
            },
            isMainPage() {
                return this.$route.name === 'main' || this.$route.name === 'change';
            },
            videoMode() {
                return this.$store.state.ui.videoMode;
            },
            disabledDates() {
                if (this.currentMap.data.positivePcrTests.interval === 1) {
                    return {
                        days: []
                    };
                } else {
                    return {
                        days: [1,2,3,4,5,6]
                    }
                }
            }
        },
        methods: {
            updateOffset(value) {
                let dateString = dateTools.formatDate(value);
                this.view.offset = (dateTools.getOffsetByDate(dateString)) / this.currentMap.data.positivePcrTests.interval;
            },
            updateDatePicker() {
                this.date = dateTools.getDateByOffset(this.view.offset * this.currentMap.data.positivePcrTests.interval);
            }
        },
        watch: {
            offset: {
                handler: function() {
                    this.updateDatePicker();
                },
                deep: true
            }
        }
    }
</script>


<template>
    <div class="header-menu">
        <div class="title">
            <div class="title__main">
                <div class="title__main-label">
                    Corona status
                </div>
                <div class="title__map">
                    {{mapTitle}}
                </div>
            </div>

            <div class="title__sub">
                <div class="date-string">
                    <datepicker
                        v-if="editable"
                        :disabled-dates="disabledDates"
                        :value="date"
                        @input="updateOffset"/>
                    <div v-else class="date-string__string">
                        {{dateString}}
                    </div>
                </div>
                <total-infections
                    v-if="hasTests && !videoMode"
                    :view="view"/>
            </div>
        </div>

        <div
            v-if="isMainPage"
            class="menu">
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

        .title {
            height: 48px;
            display: flex;
            align-items: center;

            .title__main {
                font-size: 22px;
                margin-right: 12px;
                display: flex;
                align-items: center;
                font-family: $serif;
                border-right: 1px solid #ddd;
                padding: 8px 16px;
                height: 100%;
                white-space: nowrap;

                .title__map {
                    margin-left: 8px;
                    font-weight: 700;
                }
            }

            .title__sub {
                font-size: 18px;
                display: flex;
                height: 100%;

                .date-string {
                    display: flex;
                    align-items: center;
                    font-family: $monospace;
                    margin-right: 4px;
                    border-right: 1px solid #ddd;
                    height: 100%;
                    padding-right: 8px;

                    .date-string__string {
                        white-space: nowrap;
                    }

                    input {
                        width: 120px;
                        background: transparent;
                        padding: 3px;
                        font-size: inherit;
                        cursor: pointer;
                        color: #000;

                        &:hover {
                            background: #ddd;
                        }
                    }
                }

                .total-infections {
                    display: flex;
                    align-items: center;

                    .total-infections__n {
                        padding: 2px 8px;
                        border-radius: 2px;
                        font-family: $monospace;
                        display: flex;
                    }
                }
            }
        }

        .menu {
            height: 32px;
            display: none;
            background: #fff;
            border-top: 1px solid #ddd;
        }

        @include mobile() {

            .title {
                height: 48px;
                padding-right: 60px;

                .title__main {
                    font-size: 16px;
                    line-height: 1.2;
                    margin-right: 6px;
                    display: block;

                    .title__map {
                        margin-left: 0;
                    }
                }

                .title__sub {
                    font-size: 14px;
                    display: block;
                    border-right: 1px solid #ddd;

                    .date-string {
                        display: block;
                        margin-right: 0;
                        height: auto;
                        border-right: 0;

                        input {
                            width: 100px;
                            background: transparent;
                            padding: 3px;
                            font-size: inherit;
                            cursor: pointer;

                            &:hover {
                                background: #ddd;
                            }
                        }
                    }

                    .total-infections {

                        .total-infections__n {
                            background: rgb(252, 203, 3);
                        }
                    }
                }
            }

            .menu {
                display: flex;
            }
        }
    }
</style>