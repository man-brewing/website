'use strict';
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var con = mysql.createConnection({
    host: "sulaco",
    user: "service",
    password: "service",
    database: "BeerRoom"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/beerroom/environment');
});

router.get('/beerroom/environment', (req, res) => {
    var countQuery = 'SELECT COUNT(*) AS rows FROM DataLog';
    con.query(countQuery, function (err, result) {
        if (err) throw err;

        var recordCount = result[0].rows;

        var currentQuery = 'SELECT dl.temperature, dl.humidity, dl.timestamp FROM DataLog dl ORDER BY dl.timestamp DESC LIMIT 50';
        con.query(currentQuery, function (err, result) {
            if (err) throw err;

            var celsius = result[0].temperature.toFixed(2);
            var fahrenheit = (result[0].temperature * 9 / 5 + 32).toFixed(2);
            var humidity = result[0].humidity.toFixed(2);
            var timestamp = result[0].timestamp;

            res.render('index', { title: 'M.A.N. Brewing', recordCount: recordCount, celsius: celsius, fahrenheit: fahrenheit, humidity: humidity, timestamp: timestamp });
        });
    });
});

router.post('/beerroom/environment', (req, res) => {
    res.send("received");

    console.log("temp: " + req.body.temp + ", humidity: " + req.body.humidity);

    var insertQuery = 'INSERT INTO DataLog (temperature, humidity) VALUES (' + mysql.escape(req.body.temp) + ', ' + mysql.escape(req.body.humidity) + ')';
    con.query(insertQuery, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result.insertId);
    });
});

module.exports = router;
