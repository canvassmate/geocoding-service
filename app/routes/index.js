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

// GET home page.
router.get('/', function(req, res) {
	res.render('index', { title: 'Canvassmate Geocoding Web Service' });
});

module.exports = router;
