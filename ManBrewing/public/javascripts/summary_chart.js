window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

window.onload = function () {
    var config = {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Room Temperature °F',
                borderColor: window.chartColors.red,
                backgroundColor: window.chartColors.red,
                data: tempData,
                fill: false,
                yAxisID: 'y-axis-1'
            }, {
                label: 'Room Humidity %',
                borderColor: window.chartColors.blue,
                backgroundColor: window.chartColors.blue,
                data: humidityData,
                fill: false,
                yAxisID: 'y-axis-2'
            }, {
                label: 'Outside Temperature °F',
                borderColor: window.chartColors.orange,
                backgroundColor: window.chartColors.orange,
                data: ambientTData,
                fill: false,
                yAxisID: 'y-axis-1'
            }, {
                label: 'Outside Humidity %',
                borderColor: window.chartColors.purple,
                backgroundColor: window.chartColors.purple,
                data: ambientHData,
                fill: false,
                yAxisID: 'y-axis-2'
            }]
        },
        options: {
            responsive: true,
            stacked: false,
            hoverMode: 'index',
            title: {
                display: true,
                text: 'Beer Room Environment'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Timestamp'
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1'
                }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false
                    }
                }]
            }
        }
    };

    var ctx = document.getElementById('environmentChart').getContext('2d');
    window.myLine = new Chart.Line(ctx, config);
};
