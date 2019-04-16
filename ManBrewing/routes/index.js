'use strict';
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/beerroom/environment');
});

router.get('/beerroom', function (req, res, next) {
    res.redirect('/beerroom/environment');
});

router.get('/beerroom/environment', (req, res) => {
    var chartLabels = [];
    var temperatureData = [];
    var humidityData = [];

    var countQuery = 'SELECT COUNT(*) AS rows FROM DataLog';
    con.query(countQuery, function (err, countResult) {
        if (err) throw err;

        var currentQuery = 'SELECT dl.temperature, dl.humidity, dl.timestamp FROM DataLog dl ORDER BY dl.timestamp DESC LIMIT 50';
        con.query(currentQuery, function (err, result) {
            if (err) throw err;

            for (var i = 0; i < result.length; i++) {
                temperatureData.push((result[i].temperature * 9 / 5 + 32).toFixed(2));
                humidityData.push(result[i].humidity.toFixed(2));
                chartLabels.push(result[i].timestamp);
            }

            var pugData = {
                title: 'M.A.N. Brewing',
                recordCount: countResult[0].rows,
                celsius: result[0].temperature.toFixed(2),
                fahrenheit: (result[0].temperature * 9 / 5 + 32).toFixed(2),
                humidity: result[0].humidity.toFixed(2),
                timestamp: result[0].timestamp,
                tempData: JSON.stringify(temperatureData),
                humidityData: JSON.stringify(humidityData),
                chartLabels: JSON.stringify(chartLabels)
            };

            res.render('index', pugData);
        });
    });
});

router.post('/beerroom/environment', (req, res) => {
    res.send("received");

    var insertQuery = 'INSERT INTO DataLog (temperature, humidity) VALUES (' + mysql.escape(req.body.temp) + ', ' + mysql.escape(req.body.humidity) + ')';
    con.query(insertQuery, function (err, result) {
        if (err) throw err;
    });
});

module.exports = router;
