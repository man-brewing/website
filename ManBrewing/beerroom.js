'use strict';

require('dotenv').config();
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('./lib/log.js');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// port config
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon('/beerroom/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/beerroom", express.static(path.join(__dirname, 'public')));

app.locals.moment = require('moment');

app.use('/', routes);
app.use('/users', users);

/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    logger.error('404 Not Found');
    logger.error(req);

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 *
 * Development error handler, will print stacktrace
 */
if (process.env.ENV === 'DEVELOPMENT') {
    app.use(function (err, req, res, next) {
        logger.fatal(err);
        logger.fatal(req);

        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production error handler, no stacktraces leaked to user
 */
app.use(function (err, req, res, next) {
    logger.fatal(err);
    logger.fatal(req);

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * Starts the server on the configure port and starts listening for requests.
 */
var server = app.listen(app.get('port'), function () {
    logger.info('Express server listening on port ' + server.address().port);
});
