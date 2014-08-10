/**
  log4js-ext.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-10
  copyright (c) 2014 Silicon Illusions. all rights reserved.

  @module app
  @submodule config
 */
'use strict';

function Logger(tag) {
  if (typeof Logger.log4js === 'undefined') {
    Logger.log4js = require('log4js');
    Logger.log4js.configure('./app/config/log4js.json', { reloadSecs: 60, cwd: './var/log' });  
  }

  this.logger = Logger.log4js.getLogger(tag);
}

Logger.prototype.trace = function(msg) {
  this.logger.trace(msg);
};

Logger.prototype.debug = function(msg) {
  this.logger.debug(msg);
};

Logger.prototype.info = function(msg) {
  this.logger.info(msg);
};

Logger.prototype.warn = function(msg) {
  this.logger.warn(msg);
};

Logger.prototype.error = function(msg) {
  this.logger.error(msg);
};

module.exports.logger = function(tag) {
  return new Logger(tag);
};
