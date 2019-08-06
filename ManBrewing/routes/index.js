'use strict';

var express = require('express');
var router = express.Router();
var logger = require('./../lib/log.js');

/**
 * Redirect to the environment chart page.
 */
router.get('/', function (req, res, next) {
    logger.debug('GET index');
    
    var pugData = {
        title: 'M.A.N. Brewing'
    };

    res.render('index', pugData);
});

module.exports = router;
