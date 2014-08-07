/**
  users.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 Silicon Illusions. all rights reserved.

  Users route
  @module app
  @submodule routes
 */
var express = require('express');
var router = express.Router();

// GET users listing
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

module.exports = router;
