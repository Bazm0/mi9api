'use strict';

//Config Settings
var _ = require('lodash');
var logger = require('../utils/logger');



var routes = {

  partyTime: function(req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    
    if (req.method !== 'POST') {
      return res.status(400).send({
        'error': 'Could not decode request: Invalid request: ' + req.method
      });
    }

    req.setEncoding('utf-8');
    var jsonRequest = '';

    req.on('data', function(data) {
      jsonRequest += data;
    });

    req.on('error', function(error) {
      logger.error('Error: %s', error);
      return res.status(400).send({
        'error': 'Could not decode request: deserialization failed'
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
        return res.status(400).send({
          'error': 'Could not decode request: JSON parsing failed'
        });
      }

    });

  }

};



module.exports = routes;