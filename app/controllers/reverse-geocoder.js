/**
  reverse-geocoder.js
  canvassmate-geocodingservice

  created by matux <matias.pequeno@gmail.com> on 2014-08-12
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Reverse Geocoder controller
  @module app
  @submodule controllers
 */
'use strict';

const ApiError = require('utils/apierror.js'),
      geo = require('utils/geo.js'),
      path = require('path');

const log = config.logger('router');

/**
  Reverse Geocoding controller class
  @class Reverse Geocoder
 */

module.exports.name = function() {
  return path.basename(__filename, '.js');
};

module.exports.get = function(req, res) {
  rt.logP(req.headers, 'req.headers');

  switch (req.accepts('json')) {
    case 'json': {
      const lat = req.query.lat, lon = req.query.lon;
      log.debug('lat: ' + lat + ', lon: ' + lon);

      let error = geo.validateCoordinates(lat, lon);

      if (typeof error === 'undefined') {
        res.status(200).json({yay:'yay'});
      } else {
        error.send(res);
      }

      break;
    } 
    default:
      new ApiError(406, 'req doesn\'t accept json.').send(res.send.bind(res));
      break;
  }
};