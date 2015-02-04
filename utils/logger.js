'use strict';

var winston = require('winston');
winston.emitErrs = true;

var logFile = process.env.NODE_ENV !== 'development' ? __dirname + '/../logs/api_node.log' : '/var/log/metadata-api/api_node.log';

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: logFile,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};