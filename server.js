'use strict';

var config = require('./config/config.js');

//App Modules
var express = require('express');
var errorhandler = require('errorhandler');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var partialResponse = require('express-partial-response');

//Create App & v1 Router
var app = module.exports = express();
var logger = require('./utils/logger');
var APIv1 = express.Router();
var routes = require('./routes/routes');



//Add Security Headers for increased security
app.use(helmet());

//Error Response Error
app.use(errorhandler());

//Allowing the client to filter the response to only whats needed, using the '?filter=foo,bar,baz' querystring param
app.use(partialResponse());

// Logger
app.use(morgan('combined', {
  stream: logger.stream
}));


// parse application/json
app.use(bodyParser.json());

//Add cors support
app.use(cors());

// handling 401 errors
app.use(function(err, req, res, next) {
  if (err.status !== 401) {
    return next();
  }

  res.send(err.message || 'Protected resource, please use Authorization header to get access\n');
});


// Wildcard all routes
APIv1.all('*', routes.partyTime);


// Register routes using namespace
app.use('/', APIv1);

// error handler
app.on('error', function(err) {
  if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
  } else if (process.env.NODE_ENV !== 'test') {
    logger.error('Global Error: ', err.message);
  }
});


//Start Server Listening on port if module parent
if (!module.parent) {
  app.listen(config.get('app.port'));
  logger.info('--- mi9api started on port ' + config.get('app.port') + ' ---');
}