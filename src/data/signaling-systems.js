let signalingSystems = [
    {
        id: 1,
        title: 'WHO',
        days: 7,
        population: 100000,
        thresholds: [
            {
                n: 0,
                color: {
                    regular: 'rgb(144,250,5)',
                    colorblind1: '#333',
                    colorblind2: '#ffffb2',
                    variant3: '#f2f0f7'
                }
            }, {
                n: 25,
                color: {
                    regular: 'rgb(255,255,0)',
                    colorblind1: '#66c2a5',
                    colorblind2: '#fecc5c',
                    variant3: '#cbc9e2'
                }
            }, {
                n: 50,
                color: {
                    regular: 'rgb(250,172,5)',
                    colorblind1: '#8da0cb',
                    colorblind2: '#fd8d3c',
                    variant3: '#9e9ac8'
                }
            }, {
                n: 100,
                color: {
                    regular: 'rgb(255,0,0)',
                    colorblind1: '#fc8d62',
                    colorblind2: '#e31a1c',
                    variant3: '#6a51a3'
                }
            }, {
                n: Infinity,
                color: {
                    regular: 'rgb(40,40,40)',
                    colorblind1: 'rgb(40,40,40)',
                    colorblind2: 'rgb(40,40,40)',
                    variant3: 'rgb(40,40,40)'
                }
            }
        ]
    }, {
        id: 5,
        title: 'Routekaart (NL)',
        days: 7,
        population: 100000,
        thresholds: [
            {
                n: 0,
                label: 'Geen',
                color: {
                    regular: 'rgb(144,250,5)',
                    colorblind1: '#333',
                    colorblind2: '#ffffb2',
                    variant3: '#f2f0f7'
                }
            }, {
                n: 50,
                label: 'Waakzaam',
                color: {
                    regular: '#F093BC',
                    colorblind1: '#66c2a5',
                    colorblind2: '#fecc5c',
                    variant3: '#cbc9e2'
                }
            }, {
                n: 150,
                label: 'Zorgelijk',
                color: {
                    regular: '#D95F94',
                    colorblind1: '#8da0cb',
                    colorblind2: '#fd8d3c',
                    variant3: '#9e9ac8'
                }
            }, {
                n: 250,
                label: 'Ernstig',
                color: {
                    regular: '#BA2667',
                    colorblind1: '#fc8d62',
                    colorblind2: '#e31a1c',
                    variant3: '#6a51a3'
                }
            }, {
                n: Infinity,
                label: 'Zeer ernstig',
                color: {
                    regular: '#670630',
                    colorblind1: 'rgb(40,40,40)',
                    colorblind2: 'rgb(40,40,40)',
                    variant3: 'rgb(40,40,40)'
                }
            }
        ]
    }, {
        // id 4 is used in map-tools-popup.vue and thresholds.js
        id: 4,
        title: 'Non-qualitative',
        days: 7,
        population: 100000,
        thresholds: [
            {
                n: 0,
                color: {
                    regular: 'rgb(255,255,255)',
                    colorblind1: 'rgb(255,255,255)',
                    colorblind2: 'rgb(255,255,255)',
                    variant3: 'rgb(255,255,255)'
                }
            }, {
                n: 500,
                color: {
                    regular: 'rgb(250,250,250)',
                    colorblind1: 'rgb(250,250,250)',
                    colorblind2: 'rgb(250,250,250)',
                    variant3: 'rgb(250,250,250)'
                }
            }, {
                n: Infinity,
                color: {
                    regular: 'rgb(0, 0, 0)',
                    colorblind1: 'rgb(0, 0, 0)',
                    colorblind2: 'rgb(0, 0, 0)',
                    variant3: 'rgb(0, 0, 0)'
                }
            }
        ]
    }
];

export default signalingSystems;