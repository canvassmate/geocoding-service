/**
  index.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Index route
  @module app
  @submodule routes
 */
'use strict';

const express = require('express');
const ApiError = require('utils/apierror.js');
const log = config.logger('router'),
      router = express.Router();

// GET home page.
router.get('/', function(req, res) {
  let dict = {
    title: 'Canvassmate Geocoding Web Service',
    key: config.keys.google
  };
  res.render('index', dict, function(err, html) {
    res.send(html);
  });
});

function validateCoordinates(lat, lon) {
  var error;

  if (typeof lat === 'undefined' || typeof lon === 'undefined') {
    error = new ApiError(422, 'reverse_geocode: missing params.');
  } else if (isNaN(lat) || isNaN(lon)) {
    error = new ApiError(422, 'reverse_geocode: either lat or lon isNaN.');
  } else if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    error = new ApiError(422, 'reverse_geocode: either lat or lon have invalid values.');
  }

  return error;
}

// Geocoding
router.get('/geocode', function(req, res) {
  switch (req.accepts('json')) {
    case 'json':
      new ApiError(501, 'Geocoding not implemented.').send(res);
      break;
    default:
      new ApiError(406, 'req doesn\'t accept json.').send(res, res.send.bind(res));
      break;
  }
});

// Reverse Geocoding
router.get('/reverse_geocode', function(req, res) {
  runtime.logP(req.headers, 'req.headers');

  switch (req.accepts('json')) {
    case 'json': {
      const lat = req.query.lat, lon = req.query.lon;
      log.debug('lat: ' + lat + ', lon: ' + lon);

      let error = validateCoordinates(lat, lon);

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
});

module.exports = router;
