/**
  index.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 Silicon Illusions. all rights reserved.

  Index route
  @module app
  @submodule routes
 */

var express = require('express');
var router = express.Router();
var log = config.getLogger('router');

// GET home page.
router.get('/', function(req, res) {
	res.render('index', { title: 'Canvassmate Geocoding Web Service' });
});

// Simple check
router.get('/api', function(req, res) {
	res.send('API is running');
});

// Error example
router.get('/error', function(req, res, next) {
	log.error("Z0MG!1 Error!");
	next(new Error('WTF Error!'));
});

module.exports = router;
