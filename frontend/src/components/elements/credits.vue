<script>
    export default {
        name: 'credits',
        methods: {
            close() {
                this.$store.commit('ui/updateProperty', {key: 'creditsPopup', value: false});
            }
        }
    }
</script>


<template>
    <div class="credits">
        <div
            @click="close()"
            class="close-button"></div>
        <div class="credits__section">
            {{translate('made-by', true)}} <a href="https://innouveau.com/" target="_blank">Innouveau</a>.<br><br>
            {{translate('not-without', false)}}
            <a href="https://twitter.com/datagraver" target="_blank">@datagraver</a>,
            <a href="https://twitter.com/mzelst" target="_blank">@mzelst</a> {{translate('and')}}
            <a href="https://twitter.com/edwinveldhuizen" target="_blank">@edwinveldhuizen</a>
            {{translate('help-with-data', false)}}
        </div>

        <div class="credits__section">
            {{translate('sources', true)}}
            <div class="sources">
                <div class="sources__section">
                    <div class="sources__section-head">
                        {{translate('data-positive-tests', true)}}
                    </div>
                    <div class="sources__section-body">
                        <div class="source__value-row source__value-row--head">
                            <div class="source__value-map">
                                {{translate('map', true)}}
                            </div>
                            <div class="source__value-what">
                                {{translate('description', true)}}
                            </div>
                            <div class="source__value-who">
                                {{translate('organisation', true)}}
                            </div>
                            <div class="source__value-notes">
                                {{translate('notes', true)}}
                            </div>
                            <div class="source__value-link">
                                {{translate('link', true)}}
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Nederland
                            </div>
                            <div class="source__value-what">
                                Dagelijkse aantallen covid 19 per gemeente per dag
                            </div>
                            <div class="source__value-who">
                                RIVM
                            </div>
                            <div class="source__value-notes">
                                Verzameld en gecorrigeerd door <a href="https://twitter.com/mzelst" target="_blank">@mzelst</a> en <a href="https://twitter.com/edwinveldhuizen" target="_blank">@edwinveldhuizen</a>
                            </div>
                            <div class="source__value-link">
                                https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.csv<br>
                                https://github.com/mzelst/covid-19/blob/master/data/municipality-totals.csv
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Amsterdam
                            </div>
                            <div class="source__value-what">
                                Wekelijkse positieve en totaal afgenomen tests in GGD regio Amsterdam
                            </div>
                            <div class="source__value-who">
                                GGD Amsterdam
                            </div>
                            <div class="source__value-notes">

                            </div>
                            <div class="source__value-link">
                                https://www.ggd.amsterdam.nl/coronavirus/situatie-regio-amsterdam-amstelland/
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Den Haag
                            </div>
                            <div class="source__value-what">
                                Wekelijkse positieve en totaal afgenomen tests in GGD regio Haaglanden
                            </div>
                            <div class="source__value-who">
                                GGD Haaglanden
                            </div>
                            <div class="source__value-notes">

                            </div>
                            <div class="source__value-link">
                                https://dashboard.ggdhaaglanden.nl/dashboard/corona/teststraten/
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Slovakia PCR
                            </div>
                            <div class="source__value-what">
                                Daily positives
                            </div>
                            <div class="source__value-who">
                                NCZISK
                            </div>
                            <div class="source__value-notes">

                            </div>
                            <div class="source__value-link">
                                https://covid-19.nczisk.sk/sk
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Slovakia speedtest
                            </div>
                            <div class="source__value-what">
                                Positive cases from speedtest program
                            </div>
                            <div class="source__value-who">

                            </div>
                            <div class="source__value-notes">

                            </div>
                            <div class="source__value-link">
                                https://www.scribd.com/document/484566629/Kompletn%C3%BD-Preh%C4%BEad-Mesta-a-Obce
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Europa en Wereld
                            </div>
                            <div class="source__value-what">
                                Dagelijkse aantallen positieve tests per regio
                            </div>
                            <div class="source__value-who">

                            </div>
                            <div class="source__value-notes">
                                Verzameld en geordend door <a href="https://twitter.com/datagraver" target="_blank">@datagraver</a>
                            </div>
                            <div class="source__value-link">
                                https://github.com/CSSEGISandData/COVID-19 (China, Canada and Australia)<br>
                                https://github.com/ec-jrc/COVID-19 (Europe)<br>
                                https://github.com/GoogleCloudPlatform/covid-19-open-data
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sources__section">
                    <div class="sources__section-head">
                        Data geo
                    </div>
                    <div class="sources__section-body">
                        <div class="source__value-row source__value-row--head">
                            <div class="source__value-map">
                                {{translate('map', true)}}
                            </div>
                            <div class="source__value-who">
                                {{translate('organisation', true)}}
                            </div>
                            <div class="source__value-link">
                                {{translate('link', true)}}
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Nederland
                            </div>
                            <div class="source__value-who">
                                Esri Nederland
                            </div>
                            <div class="source__value-link">
                                https://hub.arcgis.com/datasets/e1f0dd70abcb4fceabbc43412e43ad4b_0
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Nederland (GGD regio's)
                            </div>
                            <div class="source__value-who">
                                Cartomap
                            </div>
                            <div class="source__value-link">
                                https://github.com/cartomap/nl
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Amsterdam
                            </div>
                            <div class="source__value-who">
                                Amsterdam.nl
                            </div>
                            <div class="source__value-link">
                                https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN_EXWATER&THEMA=gebiedsindeling
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Den Haag
                            </div>
                            <div class="source__value-who">
                                ckan.dataplatform
                            </div>
                            <div class="source__value-link">
                                https://ckan.dataplatform.nl/dataset/stadsdelen/resource/3de9bdcb-c949-4440-a731-f5238aaa089c
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Europa
                            </div>
                            <div class="source__value-who">
                                Eurostat
                            </div>
                            <div class="source__value-link">
                                https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/nuts#nuts21
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Slovakia
                            </div>
                            <div class="source__value-who">
                                freemap.sk
                            </div>
                            <div class="source__value-link">
                                http://wiki.freemap.sk/HraniceAdministrativnychUzemi
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Conversie RD coordinaten naar WGS
                            </div>
                            <div class="source__value-who">
                                thomasvnl
                            </div>
                            <div class="source__value-link">
                                https://github.com/thomasvnl/rd-to-wgs84/blob/master/conversions.py
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sources__section">
                    <div class="sources__section-head">
                        Data leeftijdsverdeling
                    </div>
                    <div class="sources__section-body">
                        <div class="source__value-row source__value-row--head">
                            <div class="source__value-map">
                                {{translate('map', true)}}
                            </div>
                            <div class="source__value-what">
                                {{translate('description', true)}}
                            </div>
                            <div class="source__value-who">
                                {{translate('organisation', true)}}
                            </div>
                            <div class="source__value-notes">
                                {{translate('notes', true)}}
                            </div>
                            <div class="source__value-link">
                                {{translate('link', true)}}
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Nederland (GGD niveau)
                            </div>
                            <div class="source__value-what">
                                Dagelijkse casus covid 19
                            </div>
                            <div class="source__value-who">
                                RIVM
                            </div>
                            <div class="source__value-notes">
                                Verzameld en opgeteld door <a href="https://twitter.com/mzelst" target="_blank">@mzelst</a>
                            </div>
                            <div class="source__value-link">
                                https://data.rivm.nl/covid-19/COVID-19_casus_landelijk.csv<br>
                                https://github.com/mzelst/covid-19/blob/master/data-dashboards/cases_ggd_agegroups.csv
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Nederland (GGD niveau)
                            </div>
                            <div class="source__value-what">
                                Data leeftijdsgroepen per gemeente
                            </div>
                            <div class="source__value-who">
                                CBS
                            </div>
                            <div class="source__value-notes">
                                Bewerking <a href="https://twitter.com/jannoTR" target="_blank">@jannoTR</a>
                            </div>
                            <div class="source__value-link">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="sources__section">
                    <div class="sources__section-head">
                        Data rioolmetingen
                    </div>
                    <div class="sources__section-body">
                        <div class="source__value-row source__value-row--head">
                            <div class="source__value-map">
                                {{translate('map', true)}}
                            </div>
                            <div class="source__value-what">
                                {{translate('description', true)}}
                            </div>
                            <div class="source__value-who">
                                {{translate('organisation', true)}}
                            </div>
                            <div class="source__value-notes">
                                {{translate('notes', true)}}
                            </div>
                            <div class="source__value-link">
                                {{translate('link', true)}}
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-map">
                                Nederland
                            </div>
                            <div class="source__value-what">
                                Onregelmatige update rioolmetingen Nederlandse RWZI's
                            </div>
                            <div class="source__value-who">
                                RIVM
                            </div>
                            <div class="source__value-notes">

                            </div>
                            <div class="source__value-link">
                                https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.csv
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <div class="credits__section">
            {{translate('source-of-application', true)}}: <a href="https://github.com/innouveau/corona-map" target="_blank">github repo</a>
        </div>
        <div class="credits__section">
            {{translate('follow-or-feedback', true)}}: <img class="twitter-icon" src="assets/img/twitter.png"> <a href="https://twitter.com/innouveau" target="_blank">@innouveau</a>
        </div>
        <div class="credits__section">
            <div
                @click="close()"
                class="close-button--small">
                {{translate('close', true)}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .credits {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 10;
        overflow: auto;
        font-size: 12px;

        .sources {
            margin-top: 12px;

            .sources__section {
                margin-bottom: 40px;

                .sources__section-head {
                    font-weight: 700;
                    margin-bottom: 8px;
                    font-size: 14px;
                }

                .sources__section-body {
                    border: 1px solid #aaa;
                    background: #ddd;

                    .source__value-row {
                        display: flex;
                        border-bottom: 1px solid #aaa;

                        &.source__value-row--head {
                            font-weight: 700;
                        }

                        &:last-child {
                            border-bottom: 0;
                        }

                        .source__value-map {
                            width: 200px;
                            border-right: 1px solid #aaa;
                            padding: 8px;
                        }

                        .source__value-what {
                            width: 200px;
                            border-right: 1px solid #aaa;
                            padding: 8px;
                        }

                        .source__value-who {
                            width: 200px;
                            border-right: 1px solid #aaa;
                            padding: 8px;
                        }

                        .source__value-notes {
                            width: 200px;
                            border-right: 1px solid #aaa;
                            padding: 8px;
                        }

                        .source__value-link {
                            width: calc(100% - 800px);
                            padding: 8px;
                        }
                    }
                }
            }

            .source__row {
                display: flex;
                border-bottom: 1px solid #ddd;

                &:last-child {
                    border-bottom: 0;
                }

                .source__subject {
                    width: 200px;
                    border-right: 1px solid #ddd;
                    padding: 8px;
                    font-weight: 700;
                }

                .source__value {
                    width: calc(100% - 200px);


                }
            }
        }

        .credits__section {
            padding: 20px;
            border-bottom: 1px solid #ddd;

            &:last-child {
                border-bottom: 0;
            }

            .twitter-icon {
                display: inline-block;
                height: 24px;
                width: auto;
                margin-bottom: -5px;
            }
        }

        .close-button--small {
            text-decoration: underline;
            cursor: pointer;
        }

        a {
            color: #000;
        }

        @include mobile() {
            left: 0;
            width: 100%;
            top: 0;
            height: 100%;
            overflow: auto;

            .sources {

                .source__row {
                    display: block;

                    &:last-child {
                        border-bottom: 0;
                    }

                    .source__subject {
                        width: 100%;
                        border-right: 0;
                        border-bottom: 1px solid #ddd;
                    }

                    .source__value {
                        width: 100%;

                        .source__value-row {
                            flex-wrap: wrap;

                            .source__value-what {
                                width: 100%;
                                border-right: 0;
                                border-bottom: 1px solid #ddd;
                            }

                            .source__value-who {
                                width: 100%;
                                border-right: 0;
                                border-bottom: 1px solid #ddd;
                                padding-left: 32px;
                            }

                            .source__value-link {
                                width: 100%;
                                padding-left: 32px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
