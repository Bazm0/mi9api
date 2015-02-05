'use strict';

//Config Settings
var _ = require('lodash');
var logger = require('../utils/logger');



var routes = {


  processor: function(req, res) {

    var shows;

    // res.header('Access-Control-Allow-Origin', '*');

    // Now parse data
    try {

      if (req.method !== 'POST') {
        throw new Error('Invalid request operation.');
      }

      shows = JSON.parse(req.shows);

      if (!shows.payload || !_.isArray(shows.payload)) {
        throw new Error('Invalid post data.');
      }


      res.status(200).json({
        response: _.reduce(shows.payload, function(result, item) {
          if (item.drm && item.image && item.episodeCount > 0) {
            logger.debug('item: ', item);
            result.push({
              image: item.image.showImage,
              slug: item.slug,
              title: item.title
            });
          }
          return result;
        }, [])
      });


    } catch (e) {

      return res.status(400).send({
        'error': 'Could not decode request: ' + e.message
      });

    }



  }

};



module.exports = routes;