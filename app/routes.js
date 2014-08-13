/**
  routes.js
  canvassmate-geocodingservice

  created by matux <matias.pequeno@gmail.com> on 2014-08-04
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Index route
  @module app
  @submodule routes
 */
'use strict';

const isdef = require('utils/runtime.js').isdef;

/**
  Routes
  @class Routes
 */

/**
  Set up routes
  @method setup
 */
module.exports.setup = function(router) {
  if (typeof router === 'undefined') {
    router = require('express').Router();
  }
  configure(router, '/', require('controllers/welcome.js'));
  configure(router, '/geocode', require('controllers/geocoder.js'));
  configure(router, '/reverse_geocode', require('controllers/reverse-geocoder.js'));
};

/**
  Configure a single controller's routes

  @method configure
  @param {String} path
  @param {Object} controller
 */
function configure(router, path, controller) {
  if (isdef(controller.get)) router.get(path, controller.get);
  if (isdef(controller.post))router.post(path, controller.post);
  if (isdef(controller.put)) router.put(path, controller.path);
  if (isdef(controller.del)) router.del(path, controller.del);
}
