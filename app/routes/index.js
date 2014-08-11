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
      runtime = require('../config/runtime');
const router = express.Router();
const log = config.logger('router');

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
  switch (req.accepts('json')) {
    case 'json': {
      let lat = req.query.lat,
          lon = req.query.lon;

      if (typeof lat === 'undefined' || typeof lon === 'undefined') {
        log.error('reverse_geocode: missing params');
        res.status(422);
      } else {
        log.debug('lat: ' + lat + ', lon: ' + lon);

        res.status(200).json({});
      }
      break;
    } 
    default:
      log.warn('req doesn\'t accept json');
      res.status(406);
      break;
  }
});

module.exports = router;
