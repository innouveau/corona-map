window.geoSettings = {
    colombia: {
        geo: 'data/colombia/geo.json',
        titleKey: 'NOMBRE_DPT',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    argentina: {
        geo: 'data/argentina/geo.json',
        titleKey: 'provincia',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    mexico: {
        geo: 'data/mexico/geo.json',
        titleKey: 'state_name',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    india: {
        geo: 'data/india/geo.json',
        titleKey: 'NAME_1',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    australia: {
        geo: 'data/australia/geo.json',
        titleKey: 'STATE_NAME',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    china: {
        geo: 'data/china/geo.json',
        titleKey: 'name_1',
        getNutsKey: function(item) {
            return item.properties.name;
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    canada: {
        geo: 'data/canada/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return item.properties.name;
        },
        getRegion: function(item, nutsCode, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    },
    brazil: {
        geo: 'data/brazil/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, nutsCode, title) {
            return populationDict[title];
        },
        addCountryCode: null
    },
    russia: {
        geo: 'data/russia/geo.json',
        titleKey: 'NAME_1',
        getNutsKey: function(item) {
            return 'BR_' + item.properties.sigla;
        },
        getRegion: function(item, nutsCode, title) {
            let translateTable, theTitle;
            translateTable = {
                "Khanty-Mansiy": "Khanty-Mansi Avtonomnyy Okrug",
                "Adygey": "Adygea",
                "Altay": "Altai Krai",
                "Arkhangel'sk": "Arkhangelsk Oblast",
                "Astrakhan'": "Astrakhan Oblast",
                "City of St. Petersburg": "Saint Petersburg",
                "Gorno-Altay": "Altai Republic",
                "Kabardin-Balkar": "Kabardino-Balkaria",
                "Maga Buryatdan": "Buryatia",
                "Mariy-El": "Mari El",
                "Moscow City": "Moscow",
                "Moskva": "Moscow Oblast",
                "Nizhegorod": "Nizhny Novgorod Oblast",
                "Orel": "Russia",
                "Primor'ye": "Primorsky Krai",
                "Ryazan'": "Ryazan Oblast",
                "Stavropol'": "Stavropol Krai",
                "Tver'": "Tver Oblast",
                "Tyumen'": "Tyumen Oblast",
                "Ul'yanovsk": "Ulyanovsk Oblast",
                "Yamal-Nenets": "Yamalo-Nenets Avtonomnyy Okrug",
                "Yaroslavl'": "Yaroslavl Oblast",
                "Yevrey": "Jewish Avtonomnyy Okrug",
                //"Sevastopol'": "",
                "Zabaikalskiy Krai": "Zabaykalsky",
                "Perm'": "Perm Krai"
            };
            if (translateTable[title]) {
                theTitle = translateTable[title];
            } else {
                theTitle = title;
            }
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(theTitle) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null
    }
};