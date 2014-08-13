/**
  geo.js
  canvassmate-geocodingservice

  created by matux <matias.pequeno@gmail.com> on 2014-08-12
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Geographic utilities
  @module app
  @submodule util
 */
'use strict';

const ApiError = require('utils/apierror.js');

module.exports.validateCoordinates = function(lat, lon) {
  var error;

  if (typeof lat === 'undefined' || typeof lon === 'undefined') {
    error = new ApiError(422, 'reverse_geocode: missing params.');
  } else if (isNaN(lat) || isNaN(lon)) {
    error = new ApiError(422, 'reverse_geocode: either lat or lon isNaN.');
  } else if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    error = new ApiError(422, 'reverse_geocode: either lat or lon have invalid values.');
  }

  return error;
};
