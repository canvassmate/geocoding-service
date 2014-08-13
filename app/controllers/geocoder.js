/**
  geocoder.js
  canvassmate-geocodingservice

  created by matux <matias.pequeno@gmail.com> on 2014-08-12
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Geocoder controller
  @module app
  @submodule controllers
 */
'use strict';

const ApiError = require('utils/apierror.js');
const path = require('path');

/**
  Geocoding controller class
  @class Geocoder
 */

module.exports.name = function() {
  return path.basename(__filename, '.js');
};

module.exports.get = function(req, res) {
  switch (req.accepts('json')) {
    case 'json':
      new ApiError(501, 'Geocoding not implemented.').send(res);
      break;
    default:
      new ApiError(406, 'req doesn\'t accept json.').send(res, res.send.bind(res));
      break;
  }
};