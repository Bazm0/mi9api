'use strict';

//Config Settings
var _ = require('lodash');
var logger = require('../utils/logger');



var routes = {

  goodLuck: function(req, res) {
    res.status(200).send('mi9: How about you post something!');
  },

  badLuck: function(req, res) {
    res.status(200).send('mi9: How about you post something!');
  },

  partyTime: function(req, res) {

    res.header('Access-Control-Allow-Origin', '*');

    req.setEncoding('utf-8');
    var jsonRequest = '';

    req.on('data', function(data) {
      jsonRequest += data;
    });

    req.on('error', function(error) {
      logger.error('Error: %s', error);
      res.status(400).send({
        'error': 'Could not stream request: deserialization failed'
      });
    });

    req.on('end', function() {
      logger.debug('jsonRequest:  %s', jsonRequest);

      var requestBlob;

      try {

        requestBlob = JSON.parse(jsonRequest);

        var result = _.reduce(requestBlob.payload, function(result, item) {
          if (item.drm === true && parseInt(item.episodeCount) > 0) {
            logger.debug('item: ', item);
            result.push({
              image: item.image.showImage,
              slug: item.slug,
              title: item.title
            });
          }
          return result;
        }, []);


        res.status(200).send(result);


      } catch (e) {
        logger.error('Error: %s', e);
        res.status(400).send({
          'error': 'Could not decode request: JSON parsing failed'
        });
      }

    });

  }

};



module.exports = routes;