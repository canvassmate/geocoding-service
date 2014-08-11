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
      let status = 500, error;
      const lat = req.query.lat, lon = req.query.lon;
      log.debug('lat: ' + lat + ', lon: ' + lon);

      if (typeof lat === 'undefined' || typeof lon === 'undefined') {
        error = 'reverse_geocode: missing params';
        status = 422;
      } else if (isNaN(lat) || isNaN(lon)) {
        error = 'reverse_geocode: either lat or lon isNaN';
        status = 422;
      } else if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        error = 'reverse_geocode: either lat or lon have invalid values';
        status = 422;
      } else {
        status = 200;
      }

      if (status !== 200) {
        log.error(error);
      }

      res.status(status).json({ error: error });
      break;
    } 
    default:
      log.warn('req doesn\'t accept json');
      res.status(406).send('req doesn\'t accept json');
      break;
  }
});

module.exports = router;
