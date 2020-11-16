window.geoSettings = {
    scandinavia: {
        geo: 'data/scandinavia/geo-ready.json',
        ready: true,
        exclude: []
    },
    venezuela: {
        geo: 'data/venezuela/geo.json',
        titleKey: 'NAME_1',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase() === title.toLowerCase()) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: ['Dependencias Federales'],
        include: []
    },
    bolivia: {
        geo: 'data/bolivia/geo.json',
        titleKey: 'NOM_DEP',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase() === title.toLowerCase()) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: ['Lago Uru Uru', 'Lago Poopo', 'Lag Titicaca'],
        include: []
    },
    poland: {
        geo: 'data/poland/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    france: {
        geo: 'data/france/geo.json',
        titleKey: 'nom',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    germany: {
        geo: 'data/germany/geo.json',
        titleKey: 'GEN',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    spain: {
        geo: 'data/spain/geo-ready.json',
        ready: true,
        exclude: []
    },
    usa: {
        geo: 'data/usa/geo.json',
        titleKey: 'NAME',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    southamerica: {
        geo: 'data/south_america/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: ['peru', 'colombia', 'brazil', 'mexico', 'argentina', 'chile',
            'bolivia', 'venezuela'],
        include: []
    },
    world: {
        geo: 'data/world/geo.json',
        titleKey: 'ADMIN',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (title.toLowerCase() === 'iran' && region.region.toLowerCase() === 'iran') {
                    return region;
                } else {
                    if (title.toLowerCase() !== 'iran' && region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                        return region;
                    }
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: ['germany', 'spain', 'russia', 'china', 'peru', 'colombia', 'brazil',
            'poland', 'bolivia', 'venezuela', 'norway', 'sweden', 'finland', 'united kingdom',
            'canada', 'australia', 'india', 'mexico', 'argentina', 'chile', 'italy',
            'france', 'antarctica', 'ashmore and cartier island', 'french southern and antarctic lands',
            'Ashmore and Cartier Islands', 'Bajo Nuevo Bank (Petrel Is.)', 'Clipperton Island',
            'Cyprus No Mans Area', 'Cook Islands', 'Comoros', 'Coral Sea Islands',
            'Dhekelia Sovereign Base Area', 'Federated States of Micronesia', 'Guernsey',
            'Heard Island and McDonald Islands', 'British Indian Ocean Territory', 'Baykonur Cosmodrome',
            'Siachen Glacier', 'Kiribati', 'Macao S.A.R', 'Marshall Islands',
            'Norfolk Island', 'Niue', 'Nauru', 'Pitcairn Islands', 'Spratly Islands',
            'Palau', 'Palestine', 'Scarborough Reef', 'Serranilla Bank',
            'South Georgia and South Sandwich Islands', 'Saint Helena', 'Solomon Islands',
            'Somaliland', 'Tonga', 'Tuvalu', 'United States Minor Outlying Islands',
            'United States of America', 'US Naval Base Guantanamo Bay', 'United States Virgin Islands',
            'Vanuatu', 'Wallis and Futuna', 'Akrotiri Sovereign Base Area'],
        include: ['North Korea', 'Turkmenistan', 'Lesotho']
    },
    chile: {
        geo: 'data/chile/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: ['test'],
        include: []
    },
    peru: {
        geo: 'data/peru/geo.json',
        titleKey: 'NOMBDEP',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    colombia: {
        geo: 'data/colombia/geo.json',
        titleKey: 'NOMBRE_DPT',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.toLowerCase().indexOf(title.toLowerCase()) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    argentina: {
        geo: 'data/argentina/geo.json',
        titleKey: 'provincia',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    mexico: {
        geo: 'data/mexico/geo.json',
        titleKey: 'state_name',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    india: {
        geo: 'data/india/geo.json',
        titleKey: 'NAME_1',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    australia: {
        geo: 'data/australia/geo.json',
        titleKey: 'STATE_NAME',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    china: {
        geo: 'data/china/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return item.properties.name;
        },
        getRegion: function(item, title) {
            let dict, newTitle;
            dict = {
                '新疆维吾尔自治区': 'Xinjiang',
                '西藏自治区': 'Tibet',
                '内蒙古自治区': 'Inner Mongolia',
                '青海省': 'Qinghai',
                '四川省': 'Sichuan',
                '黑龙江省': 'Heilongjiang',
                '甘肃省': 'Gansu',
                '云南省': 'Yunnan',
                '广西壮族自治区': 'Guangxi',
                '湖南省': 'Hunan',
                '陕西省': 'Shanxi',
                '广东省': 'Guangdong',
                '吉林省': 'Jilin',
                '河北省': 'Hebei',
                '湖北省': 'Hubei',
                '贵州省': 'Guizhou',
                '山东省': 'Shandong',
                '江西省': 'Jiangxi',
                '河南省': 'Henan',
                '辽宁省': 'Liaoning',
                '山西省': 'Shaanxi',
                '安徽省': 'Anhui',
                '福建省': 'Fujian',
                '浙江省': 'Zhejiang',
                '江苏省': 'Jiangsu',
                '重庆市': 'Chongqing',
                '宁夏回族自治区': 'Ningxia',
                '海南省': 'Hainan',
                '台湾省': 'Taiwan',
                '北京市': 'Beijing',
                '天津市': 'Tianjin',
                '上海市': 'Shanghai',
                '香港特别行政区': 'Hong Kong',
                '澳门特别行政区': 'Macau',
            };
            newTitle = dict[title];

            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(newTitle) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: ['香港特别行政区'],
        include: []
    },
    canada: {
        geo: 'data/canada/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return item.properties.name;
        },
        getRegion: function(item, title) {
            for (let key in populationDict) {
                let region = populationDict[key];
                if (region.region.indexOf(title) > -1) {
                    return region;
                }
            }
            return null;
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    brazil: {
        geo: 'data/brazil/geo.json',
        titleKey: 'name',
        getNutsKey: function(item) {
            return '';
        },
        getRegion: function(item, title) {
            return populationDict[title];
        },
        addCountryCode: null,
        exclude: [],
        include: []
    },
    russia: {
        geo: 'data/russia/geo.json',
        titleKey: 'NAME_1',
        getNutsKey: function(item) {
            return 'BR_' + item.properties.sigla;
        },
        getRegion: function(item, title) {
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
        addCountryCode: null,
        exclude: [],
        include: []
    }
};