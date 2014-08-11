/**
  index.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 canvassmate. all rights reserved.

  Index route
  @module app
  @submodule routes
 */
'use strict';

const express = require('express'),
      log = config.logger('router'),
      router = express.Router();

// GET home page.
router.get('/', function(req, res) {
	res.render('index', { title: 'Canvassmate Geocoding Web Service' });
});

function validateCoordinates(lat, lon) {
  var error;

  if (typeof lat === 'undefined' || typeof lon === 'undefined') {
    error = new Error('reverse_geocode: missing params');
    error.code = 422;
  } else if (isNaN(lat) || isNaN(lon)) {
    error = new Error('reverse_geocode: either lat or lon isNaN');
    error.code = 422;
  } else if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    error = new Error('reverse_geocode: either lat or lon have invalid values');
    error.code = 422;
  }

  return error;  
}

// Geocoding
router.get('/geocode', function(req, res) {
  log.error('Geocoding not implemented.');
  res.status(501);
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
        // 200

      } else {
        log.error(error.message);
        res.status(error.code).json({ error: error.message });
      }

      break;
    } 
    default:
      log.error('req doesn\'t accept json');
      res.status(406).send('req doesn\'t accept json');
      break;
  }
});

module.exports = router;
