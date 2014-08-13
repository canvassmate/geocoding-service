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

const clstr = require('utils/cli.js').clstr;
const log = config.logger('router');

/**
  Routes
  @class Routes
 */

/**
  Set up routes
  @param {Application} app Your application.
  @method setup
 */
module.exports.setup = function(router) {
  log.info('configuring routes');
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
  function logroute(method) {
    log.trace(clstr(method, 'bold') + clstr(' \'' + path + '\' ', 'grey') + clstr(controller.name(), 'blue'));
  }

  if (typeof controller.get !== 'undefined') {
    router.get(path, controller.get);
    logroute('GET');
  }

  if (typeof controller.post !== 'undefined') {
    router.post(path, controller.post);
    logroute('POST');
  }

  if (typeof controller.put !== 'undefined') {
    router.put(path, controller.path);
    logroute('PUT');
  }

  if (typeof controller.del !== 'undefined') {
    router.del(path, controller.del);
    logroute('DELETE');
  }
}
