'use strict';

//Config Settings
var _ = require('lodash');
var logger = require('../utils/logger');



var routes = {

  processor: function(req, res) {

    res.header('Access-Control-Allow-Origin', '*');

    // Now parse data
    try {

      if (req.method !== 'POST') {
        throw new Error('Invalid request operation.');
      }

      var shows = JSON.parse(req.shows);

      if (_.isUndefined(shows.payload) || !_.isArray(shows.payload)) {
        throw new Error('Incorrect post request data.');
      }


      // var result = shows.payload
      //   .filter(function(show) {
      //     return show.image && show.drm && show.episodeCount > 0;
      //   })
      //   .map(function(show) {
      //     return {
      //       image: show.image.showImage,
      //       slug: show.slug,
      //       title: show.title
      //     };
      //   });


      // res.status(200).send(result);


      res.send({response: _.chain(shows.payload)
        .filter(function(item) {
          return item.image && item.drm && item.episodeCount > 0;
        })
        .map(function(item) {
          return {
            image: item.image.showImage,
            slug: item.slug,
            title: item.title
          };
        }).value()});


    } catch (e) {

      return res.status(400).send({
        'error': 'Could not decode request: ' + e.message
      });

    }



  }

};



module.exports = routes;