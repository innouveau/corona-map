<script>
    export default {
        name: 'credits',
        components: {},
        props: {},
        computed: {},
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
            Deze kaart is gemaakt door <a href="https://innouveau.com/" target="_blank">Innouveau</a>
        </div>

        <div class="credits__section">
            Bronnen:
            <div class="sources">
                <div class="source__row">
                    <div class="source__subject">
                        Data positieve testen
                    </div>
                    <div class="source__value">
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Dagelijkse aantallen covid 19 per gemeente per dag
                            </div>
                            <div class="source__value-who">
                                RIVM
                            </div>
                            <div class="source__value-link">
                                https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.csv
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Publicatie van RIVM verzameld en gecorrigeerd
                            </div>
                            <div class="source__value-who">
                                <a href="https://twitter.com/mzelst" target="_blank">@mzelst</a> en <a href="https://twitter.com/edwinveldhuizen" target="_blank">@edwinveldhuizen</a>
                            </div>
                            <div class="source__value-link">
                                https://github.com/mzelst/covid-19/blob/master/data/municipality-totals.csv
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Cijfers Amsterdam
                            </div>
                            <div class="source__value-who">
                                GGD Amsterdam
                            </div>
                            <div class="source__value-link">
                                https://www.ggd.amsterdam.nl/coronavirus/situatie-regio-amsterdam-amstelland/
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Cijfers Europa
                            </div>
                            <div class="source__value-who">
                                <a href="https://twitter.com/datagraver" target="_blank">@datagraver</a>
                            </div>
                            <div class="source__value-link">
                                http://datagraver.com/corona/data/cases.csv
                            </div>
                        </div>
                    </div>
                </div>
                <div class="source__row">
                    <div class="source__subject">
                        Data rioolmetingen
                    </div>
                    <div class="source__value">
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Wekelijkse rioolmetingen per rwzi
                            </div>
                            <div class="source__value-who">
                                RIVM
                            </div>
                            <div class="source__value-link">
                                https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.csv
                            </div>
                        </div>
                    </div>
                </div>
                <div class="source__row">
                    <div class="source__subject">
                        Data leeftijdsverdeling
                    </div>
                    <div class="source__value">
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Dagelijkse casus covid 19
                            </div>
                            <div class="source__value-who">
                                RIVM
                            </div>
                            <div class="source__value-link">
                                https://data.rivm.nl/covid-19/COVID-19_casus_landelijk.csv
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Publicatie van RIVM verzameld
                            </div>
                            <div class="source__value-who">
                                <a href="https://twitter.com/mzelst" target="_blank">@mzelst</a>
                            </div>
                            <div class="source__value-link">
                                https://github.com/mzelst/covid-19/blob/master/data-dashboards/cases_ggd_agegroups.csv
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Data leeftijdsgroepen per gemeente
                            </div>
                            <div class="source__value-who">
                                CBS en bewerking <a href="https://twitter.com/jannoTR" target="_blank">@jannoTR</a>
                            </div>
                            <div class="source__value-link">

                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Inwoners stadsdelen Amsterdam
                            </div>
                            <div class="source__value-who">
                                Kerncijfers Amsterdam 2018
                            </div>
                            <div class="source__value-link">
                                http://82.94.199.215/pdf/2018_kerncijfers.pdf
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Inwoners stadsdelen Den Haag
                            </div>
                            <div class="source__value-who">
                                Wikipedia (betere bron nodig)
                            </div>
                            <div class="source__value-link">
                                https://nl.wikipedia.org/wiki/Portaal:Den_Haag/Stadsdelen
                            </div>
                        </div>
                    </div>
                </div>
                <div class="source__row">
                    <div class="source__subject">
                        Geo data
                    </div>
                    <div class="source__value">
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Geo data voor gemeentegrenzen
                            </div>
                            <div class="source__value-who">
                                Esri Nederland Conten
                            </div>
                            <div class="source__value-link">
                                https://hub.arcgis.com/datasets/e1f0dd70abcb4fceabbc43412e43ad4b_0
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Geo data GGD regio's
                            </div>
                            <div class="source__value-who">
                                Cartomap
                            </div>
                            <div class="source__value-link">
                                https://github.com/cartomap/nl
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Geo data Amsterdam
                            </div>
                            <div class="source__value-who">
                                Amsterdam.nl
                            </div>
                            <div class="source__value-link">
                                https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN_EXWATER&THEMA=gebiedsindeling
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Geo data Den Haag
                            </div>
                            <div class="source__value-who">
                                ckan.dataplatform
                            </div>
                            <div class="source__value-link">
                                https://ckan.dataplatform.nl/dataset/stadsdelen/resource/3de9bdcb-c949-4440-a731-f5238aaa089c
                            </div>
                        </div>
                        <div class="source__value-row">
                            <div class="source__value-what">
                                Conversie RD naar WGS
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
            </div>
        </div>
        <div class="credits__section">
            Bron van deze applicatie: <a href="https://github.com/innouveau/corona-map" target="_blank">github repo</a>
        </div>
        <div class="credits__section">
            Volg of feedback: <img class="twitter-icon" src="assets/img/twitter.png"> <a href="https://twitter.com/innouveau" target="_blank">@innouveau</a>
        </div>
        <div class="credits__section">
            <div
                @click="close()"
                class="close-button--small">
                Sluiten
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
            border: 1px solid #ddd;

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

                    .source__value-row {
                        display: flex;
                        border-bottom: 1px solid #ddd;

                        &:last-child {
                            border-bottom: 0;
                        }

                        .source__value-what {
                            width: 200px;
                            border-right: 1px solid #ddd;
                            padding: 8px;
                        }

                        .source__value-who {
                            width: 200px;
                            border-right: 1px solid #ddd;
                            padding: 8px;
                        }

                        .source__value-link {
                            width: calc(100% - 400px);
                            padding: 8px;
                        }
                    }
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