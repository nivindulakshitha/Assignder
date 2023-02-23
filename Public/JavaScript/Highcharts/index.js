document.addEventListener("DOMContentLoaded", function () {
    Highcharts.chart("4C1", {
        chart: {
            type: "column",
            height: 80,
        },
        legend: {
            enabled: false,
        },
        xAxis: {
            labels: {
                enabled: false,
            },
            title: {
                enabled: false,
            },
        },
        yAxis: {
            labels: {
                enabled: false,
            },
            title: {
                enabled: false,
            },
            min: -1.5,
            max: 1.5
        },
        series: [
            {
                name: "a",
                data: [1, -1, 1, -1],
            },
            {
                name: "s",
                data: [-1, -1, -1, 1],
            },
            {
                name: "b",
                data: [1, -1, 1, -1],
            },
            {
                name: "d",
                data: [-1, 1, -1, 1],
            },
        ],
    });

    Highcharts.chart("S4P1C1", {
        chart: {
            type: "column",
            height: 80,
        },
        legend: {
            enabled: false,
        },
        xAxis: {
            labels: {
                enabled: false,
            },
            title: {
                enabled: false,
            },
        },
        yAxis: {
            labels: {
                enabled: false,
            },
            title: {
                enabled: false,
            },
            min: -1.5,
            max: 1.5
        },
        series: [
            {
                name: "a",
                data: [1, -1, 1, -1],
            },
            {
                name: "s",
                data: [-1, -1, -1, 1],
            },
            {
                name: "b",
                data: [1, -1, 1, -1],
            },
            {
                name: "d",
                data: [-1, 1, -1, 1],
            },
        ],
    });
});

Highcharts.theme = {
    colors: [
        "rgba(255, 99, 132, 0.9)",
        "rgba(255, 159, 64, 0.9)",
        "rgba(255, 205, 86, 0.9)",
        "rgba(75, 192, 192, 0.9)",
        "rgba(54, 162, 235, 0.9)",
        "rgba(153, 102, 255, 0.9)",
        "rgba(201, 203, 207 0.9)",
    ],
    chart: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    title: {
        text: null,
    },
    subtitle: {
        text: null,
    },
    tooltip: {
        backgroundColor:
            appTheme === "dark" ? "rgb(248 249 250 0.2)" : "rgb(33 37 41 0.2)",
        valueDecimals: 2,
        style: {
            color: appTheme === "dark" ? "rgb(33 37 41)" : "rgb(248 249 250)",
        },
    },
};

Highcharts.setOptions(Highcharts.theme);
