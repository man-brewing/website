'use strict';

var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var https = require('https');
var logger = require('../lib/log.js');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

/**
 * Connect to the MySQL database.
 */
con.connect(function (err) {
    if (err) throw err;
    logger.debug('Database connected');
});

/**
 * Redirect to the environment chart page.
 */
router.get('/', function (req, res, next) {
    res.redirect('/beerroom/environment');
});


/**
 * Serves the main page for the beerroom application.
 */
router.get('/environment', (req, res) => {
    logger.debug('GET /environment');

    var chartLabels = [];
    var temperatureData = [];
    var humidityData = [];

    // get the number of records in the environment database
    var countQuery = 'SELECT COUNT(*) AS rows FROM DataLog';
    con.query(countQuery, function (err, countResult) {
        if (err) throw err;

        logger.debug('Retrieved ' + countResult[0].rows + ' total records');

        // populate the chart with only the most recent records
        var currentQuery = 'SELECT dl.temperature, dl.humidity, dl.timestamp FROM DataLog dl ORDER BY dl.timestamp DESC LIMIT 50';
        con.query(currentQuery, function (err, result) {
            if (err) throw err;

            logger.debug('Pulled top ' + result.length + ' records');

            // build the arrays for the charts
            for (var i = 0; i < result.length; i++) {
                temperatureData.push((result[i].temperature * 9 / 5 + 32).toFixed(2));
                humidityData.push(result[i].humidity.toFixed(2));
                chartLabels.push(result[i].timestamp);
            }

            // populate the pug template data
            var pugData = {
                title: 'M.A.N. Brewing',
                recordCount: countResult[0].rows,
                celsius: result.length ? result[0].temperature.toFixed(2) : 0.00,
                fahrenheit: result.length ? (result[0].temperature * 9 / 5 + 32).toFixed(2) : 0.00,
                humidity: result.length ? result[0].humidity.toFixed(2) : 0.00,
                timestamp: result.length ? result[0].timestamp : 0.00,
                tempData: JSON.stringify(temperatureData),
                humidityData: JSON.stringify(humidityData),
                chartLabels: JSON.stringify(chartLabels)
            };

            res.render('beerroom', pugData);
        });
    });
});

/**
 * Handles POST requests from the environment monitor and
 * saves the data to the database.
 */
router.post('/environment', (req, res) => {
    logger.debug('POST /environment');

    // get ambient weather data
    https.get('https://api.openweathermap.org/data/2.5/weather?id=' + process.env.WEATHER_CITY_ID + '&appid=' + process.env.WEATHER_API_KEY + '&units=metric', (resp) => {
        let data = '';
        var ambient_temp = 0.00;
        var ambient_humid = 0.00;

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        resp.on('end', () => {
            var jsonWeather = JSON.parse(data);
            ambient_temp = jsonWeather.main.temp;
            ambient_humid = jsonWeather.main.humidity;

            // save those data to the database
            var insertQuery = 'INSERT INTO DataLog (temperature, humidity, ambient_temp, ambient_humid) VALUES (' + mysql.escape(req.body.temp) + ', ' + mysql.escape(req.body.humidity) + ', ' + mysql.escape(ambient_temp) + ', ' + mysql.escape(ambient_humid) + ')';
            con.query(insertQuery, function (err, result) {
                if (err) throw err;

                if (result.affectedrows < 1) {
                    logger.error('Something went wrong inserting new environment record');
                }

                res.send("received");
            });
        });
    }).on("error", (err) => {
        logger.error("Error: " + err.message);
    });
});


module.exports = router;