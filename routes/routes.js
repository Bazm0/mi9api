'use strict';

//Config Settings
var _ = require('lodash');
var logger = require('../utils/logger');



var routes = {

  partyTime: function(req, res) {


    try {

      res.header('Access-Control-Allow-Origin', '*');
      // check request method 
      if (req.method !== 'POST') {
        throw new Error('Invalid request: ' + req.method);
      }

      var shows = JSON.parse(req.shows);

      if (!shows.payload || !_.isArray(shows.payload)) {
        throw new Error('Invalid post data.');
      }

      var result = _.reduce(shows.payload, function(result, item) {
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


  }

};



module.exports = routes;