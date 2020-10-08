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
                date: dateTools.getDateByOffset(this.view.offset * this.$store.state.maps.current.settings.testDataInterval)
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
                return this.$store.state.maps.current ? this.$store.state.maps.current.title : '';
            },
            currentLanguage() {
                return this.$store.state.languages.current;
            },
            dateString() {
                return this.$store.getters['ui/getDateByOffset']((this.view.offset * this.currentMap.settings.testDataInterval), 'EE dd MMM', this.currentLanguage.iso_code)
            },
            offset() {
                return this.view.offset;
            },
            isMainPage() {
                return this.$route.name === 'main';
            },
            videoMode() {
                return this.$store.state.ui.videoMode;
            },
            disabledDates() {
                if (this.currentMap.settings.testDataInterval === 1) {
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
                this.view.offset = (dateTools.getDateOffset(this.$store.state.ui.todayInMs, value.getTime())) / this.currentMap.settings.testDataInterval;
            },
            updateDatePicker() {
                this.date = dateTools.getDateByOffset(this.view.offset * this.currentMap.settings.testDataInterval);
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
                Corona status {{mapTitle}}
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
        z-index: 1;

        .title {
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;

            .title__main {
                font-size: 24px;
                font-weight: 700;
                margin-right: 12px;
            }

             .title__sub {
                font-size: 20px;
                display: flex;

                .date-string {
                    display: block;
                    margin-top: 2px;
                    font-family: $monospace;
                    margin-right: 4px;

                    .date-string__string {
                        white-space: nowrap;
                    }

                    input {
                        width: 120px;
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
                    width: 80px;
                    display: flex;

                    .total-infections__n {
                        padding: 2px 8px;
                        border-radius: 2px;
                        font-family: $monospace;
                        transition: all 0.1s ease;
                        background: rgb(252, 203, 3);
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
                }

                .title__sub {
                    font-size: 14px;

                    .date-string {
                        display: block;
                        margin-top: 2px;
                        margin-right: 0;
                        font-family: $monospace;

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
                        width: 80px;
                        display: flex;

                        .total-infections__n {
                            padding: 2px 8px;
                            border-radius: 2px;
                            font-family: $monospace;
                            display: inline-block;
                            transition: all 0.1s ease;
                            background: rgb(252, 203, 3);
                            display: flex;
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