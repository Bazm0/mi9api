'use strict';

//Config Settings
var _ = require('lodash');
var logger = require('../utils/logger');



var routes = {

  partyTime: function(req, res) {
 
 var shows;

 res.header('Access-Control-Allow-Origin', '*');
 
    try {
        if (req.method !== 'POST') {
            throw 'Invalid request method. Expected POST.';
        }

        shows = JSON.parse(req.shows);

        if (!shows.payload || !shows.payload.push) {
            throw 'Request data is incorrectly formatted.';
        }



      res.json({
            response:
                shows.payload
                    .filter(function (payloadItem) {
                        return payloadItem.image &&
                                payloadItem.drm &&
                                payloadItem.episodeCount > 0;
                    })
                    .map(function (payloadItem) {
                        return { 
                            image: payloadItem.image.showImage, 
                            slug: payloadItem.slug, 
                            title: payloadItem.title
                        };
                    })
        });


        // var results = _.reduce(shows.payload, function(result, item) {
        //   if (item.drm && item.image && item.episodeCount > 0) {

        //     logger.debug('item: ', item);
        //     result.push({
        //       image: item.image.showImage,
        //       slug: item.slug,
        //       title: item.title
        //     });
        //   }
        //   return result;
        // }, []);

        // res.status(200).send(results);

        // res.json({
        //     response:
        //         data.payload
        //             .filter(function (payloadItem) {
        //                 return payloadItem.image &&
        //                         payloadItem.drm &&
        //                         payloadItem.episodeCount > 0;
        //             })
        //             .map(function (payloadItem) {
        //                 return { 
        //                     image: payloadItem.image.showImage, 
        //                     slug: payloadItem.slug, 
        //                     title: payloadItem.title
        //                 };
        //             })
        // });
    }
    catch (e) {

      return res.status(400).send({
        'error': 'Could not decode request: ' + e.message
      });

    }

    // var shows;

    // res.header('Access-Control-Allow-Origin', '*');
    
    // try {

    //   // check request method 
    //   if (req.method !== 'POST') {
    //     throw new Error('Invalid request: ' + req.method);
    //   }

    //   shows = JSON.parse(req.shows);

    //   if (!shows.payload || !_.isArray(shows.payload)) {
    //     throw new Error('Invalid post data.');
    //   }

    //   var result = _.reduce(shows.payload, function(result, item) {
    //     if (item.drm && payloadItem.image && item.episodeCount > 0) {
    //       logger.debug('item: ', item);
    //       result.push({
    //         image: item.image.showImage,
    //         slug: item.slug,
    //         title: item.title
    //       });
    //     }
    //     return result;
    //   }, []);


    //   res.status(200).send(result);


    // } catch (e) {

    //   return res.status(400).send({
    //     'error': 'Could not decode request: ' + e.message
    //   });

    // }


  }

};



module.exports = routes;