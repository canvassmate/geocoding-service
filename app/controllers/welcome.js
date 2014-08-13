/**
  welcome.js
  canvassmate-geocodingservice

  created by matux <matias.pequeno@gmail.com> on 2014-08-12
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Welcome controller
  @module app
  @submodule controllers
 */
'use strict';

/**
  Welcome controller class
  @class Welcome
 */

module.exports.get = function(req, res) {
  let dict = {
    title: 'Canvassmate Geocoding Web Service',
    key: config.keys.google
  };
  res.render('index', dict, function(err, html) {
    res.send(html);
  });
};
