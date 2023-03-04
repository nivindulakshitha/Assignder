var backgroundColors = [
    'rgba(189, 56, 61, 0.4)',
    'rgba(253, 200, 83, 0.4)',
    'rgba(51, 178, 87, 0.4)',
    'rgba(31, 120, 180, 0.4)',
    'rgba(139, 71, 158, 0.4)',
    'rgba(248, 142, 85, 0.4)',
    'rgba(134, 186, 213, 0.4)',
    'rgba(224, 88, 91, 0.4)',
    'rgba(244, 172, 167, 0.4)',
    'rgba(193, 224, 122, 0.4)',
    'rgba(186, 70, 98, 0.4)',
    'rgba(239, 123, 71, 0.4)',
    'rgba(228, 190, 78, 0.4)',
    'rgba(102, 191, 167, 0.4)',
    'rgba(71, 157, 205, 0.4)',
    'rgba(148, 107, 178, 0.4)',
    'rgba(172, 174, 177, 0.4)',
    'rgba(255, 99, 132, 0.4)',
    'rgba(255, 159, 64, 0.4)',
    'rgba(255, 205, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)',
    'rgba(54, 162, 235, 0.4)',
    'rgba(153, 102, 255, 0.4)',
    'rgba(201, 203, 207, 0.4)'
]

var borderColors = [
    'rgb(189, 56, 61)',
    'rgb(253, 200, 83)',
    'rgb(51, 178, 87)',
    'rgb(31, 120, 180)',
    'rgb(139, 71, 158)',
    'rgb(248, 142, 85)',
    'rgb(134, 186, 213)',
    'rgb(224, 88, 91)',
    'rgb(244, 172, 167)',
    'rgb(193, 224, 122)',
    'rgb(186, 70, 98)',
    'rgb(239, 123, 71)',
    'rgb(228, 190, 78)',
    'rgb(102, 191, 167)',
    'rgb(71, 157, 205)',
    'rgb(148, 107, 178)',
    'rgb(172, 174, 177)',
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
];

// Charts variables
var SPC1;
var S4P2C1;
var S4P2C2;
var S4P2C3;
var S4P2C4;


function generateCharts(index) {
    switch (index) {
        case 0: {
            SPC1 = new Chart(document.getElementById("SPC1").getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['2022-03-01', '2022-03-02', '2022-03-03', '2022-03-04', '2022-03-05', '2022-03-06', '2022-03-07'],
                    datasets: [{
                        label: 'Wins',
                        backgroundColor: '#43AA8B',
                        data: [2, 1, 3, 1, 4, 2, 1]
                    }, {
                        label: 'Lost',
                        backgroundColor: '#F94144',
                        data: [-1, -2, -1, -3, 0, -1, 0]
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                            display: false,
                            gridLines: {
                                display: false,
                            }
                        },
                        y: {
                            stacked: true,
                            display: true,
                            ticks: {
                                callback: function (value, index, values) {
                                    return Math.abs(value);
                                }
                            }
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 5,
                            bottom: 5
                        }
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                },
            });
            
            break;
        }

        case 1: {
            S4P2C1 = new Chart(document.getElementById("S4P2C1").getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Software Engineering', 'Mathematics', 'Fundamentals of Programming', 'Principals of Staticstics'],
                    datasets: [{
                        label: ' ',
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                        data: [10, 20, 30, 40]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 10,
                            stepSize: 2,
                            display: true,
                        }
                    }
                }
            });

            break;
        }

        case 2: {
            S4P2C1 = new Chart(document.getElementById("S4P2C2").getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Software Engineering', 'Mathematics', 'Fundamentals of Programming', 'Principals of Staticstics'],
                    datasets: [{
                        label: ' ',
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                        data: [3, 2, 1, 3]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                        }
                    }
                }
            });

            break;
        }

        case 3: {
            S4P2C3 = new Chart(document.getElementById("S4P2C3").getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['2022-03-01', '2022-03-02', '2022-03-03', '2022-03-04', '2022-03-05', '2022-03-06', '2022-03-07'],
                    datasets: [{
                        label: 'Software Engineering',
                        backgroundColor: backgroundColors[0],
                        borderColor: borderColors[0],
                        borderWidth: 2,
                        data: [1, 0, 8, 5, 3, 2, 4]
                    }, {
                        label: 'Mathematics',
                        backgroundColor: backgroundColors[1],
                        borderColor: borderColors[1],
                        borderWidth: 2,
                        data: [1, 2, 7, 4, 5, 7, 2]
                    }, {
                        label: 'Fundamentals of Programming',
                        backgroundColor: backgroundColors[2],
                        borderColor: borderColors[2],
                        borderWidth: 2,
                        data: [0, 0, 3, 4, 1, 6, 4]
                    }, {
                        label: 'Principals of Staticstics',
                        backgroundColor: backgroundColors[3],
                        borderColor: borderColors[3],
                        borderWidth: 2,
                        data: [1, 2, 2, 0, 3, 1, 0]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 10,
                            stepSize: 2,
                            display: true,
                            beginAtZero: true
                        }
                    }
                }
            });

            break;
        }

        case 4: {
            S4P2C3 = new Chart(document.getElementById("S4P2C4").getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['2022-03-01', '2022-03-02', '2022-03-03', '2022-03-04', '2022-03-05', '2022-03-06', '2022-03-07'],
                    datasets: [{
                        fill: true,
                        label: 'Completed',
                        backgroundColor: 'rgba(67, 170, 139, 0.4)',
                        borderColor: 'rgb(67, 170, 139)',
                        borderWidth: 2,
                        data: [1, 2, 7, 4, 0, 0, 3]
                    }, {
                        fill: true,
                        label: 'Receive',
                        backgroundColor: 'rgba(249, 65, 68, 0.4)',
                        borderColor: 'rgb(249, 65, 68)',
                        borderWidth: 2,
                        data: [1, 0, 8, 5, 0, 1, 5]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: window.innerWidth > 1000
                        },
                        title: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 10,
                            stepSize: 2,
                            display: true,
                            beginAtZero: true
                        }
                    }
                }
            });

            break;
        }
    }
}

function shuffleColors() {
    for (let i = backgroundColors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [backgroundColors[i], backgroundColors[j]] = [backgroundColors[j], backgroundColors[i]];
        [borderColors[i], borderColors[j]] = [borderColors[j], borderColors[i]];
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        shuffleColors();
        generateCharts(0);
        generateCharts(1);
        generateCharts(2);
        generateCharts(3);
        generateCharts(4);
    }, 500);
});