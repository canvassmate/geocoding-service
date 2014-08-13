/**
  apierror.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-10
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  @module app
  @submodule extensions
 */
'use strict';

const log = config.logger('router');

module.exports = ApiError;

function ApiError(status, msg) {
  Error.call(this);
  Error.prepareStackTrace = function(err, stack) { return stack; };
  Error.captureStackTrace(this); //, arguments.callee);

  this.message = msg;
  this.name = rt.className(this);
  this.code = status;

  log.error(this, 1);
}

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

ApiError.prototype.send = function(res, method) {
  if (typeof method === 'undefined') {
    method = res.json.bind(res);
  }

  res.status(this.code);
  method({ error: this.message });

  return this;
};

ApiError.prototype.toString = function() {
  return this.name + ': (' + this.code + ') ' + this.message;
};
