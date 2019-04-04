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
    var countQuery = 'SELECT COUNT(*) AS rows FROM DataLog';
    con.query(countQuery, function (err, result) {
        if (err) throw err;
        res.render('index', { title: 'M.A.N. Brewing', recordCount: result[0].rows });
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
