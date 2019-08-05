'use strict';

const winston = require('winston');

/**
 * Configures the logger for this application.
 */
const logger = winston.createLogger({
    format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug'
        }),
        new winston.transports.File({
            filename: 'beerroom.log',
            level: 'info'
        })
    ],
    level: process.env.LOG_LEVEL
});

module.exports = logger;

