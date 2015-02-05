'use strict';

//Config Settings
var _ = require('lodash');
var logger = require('../utils/logger');



var routes = {

  partyTime: function(req, res) {

    req.setEncoding('utf-8');
    var jsonRequest = '';

    req.on('data', function(data) {
      jsonRequest += data;
    });

    req.on('error', function(error) {
      return res.status(400).send({
        'error': 'Could not decode request: deserialization failed'
      });
    });

    req.on('end', function() {

      logger.debug('jsonRequest:  %s', jsonRequest);

      var requestBlob;

      try {


        res.header('Access-Control-Allow-Origin', '*');
        
        if (req.method !== 'POST') {
          throw new Error('Invalid request: ' + req.method);
        }

        requestBlob = JSON.parse(jsonRequest);

        if(!requestBlob.payload || !_.isArray(requestBlob.payload)) {
          throw new Error('Invalid post data.');
        }

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

        return res.status(400).send({
          'error': 'Could not decode request: ' + e.message
        });
        
      }

    });

  }

};



module.exports = routes;