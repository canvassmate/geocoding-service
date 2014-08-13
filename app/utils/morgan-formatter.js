/**
  morgan-formatter.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Configuration and utility
  @module app
  @submodule extensions
 */
'use strict';

const moment = require('moment'),
      bytes = require('bytes');

/**
  Custom format functions for morgan

  @class Morgan-Formatter
 */

/**
  Custom format function inspired on morgan's 'dev'

  @method format
  @param {String} tokens
  @param {Object} req
  @param {Object} res
  @return {String} log string
  @public
 */
module.exports['default'] = function(tokens, req, res) {
  const status = res.statusCode;
  const color = status >= 500 ? 31 :
                status >= 400 ? 33 :
                status >= 300 ? 36 : 32;

  var len = parseInt(res.getHeader('Content-Length'), 10);
  len = isNaN(len) ? '' : ' - ' + bytes(len);

  return '\x1b[90m' + '[' + moment().format('HH:mm:ss.SSS') + '] ' +
    '\x1b[1m\x1b[90m' + req.method + '\x1b[22m' +
    ' ' + (req.originalUrl || req.url) + ' ' +
    '\x1b[' + color + 'm' + status +
    ' \x1b[90m' +
    (new Date() - req._startTime) +
    'ms' + len +
    '\x1b[0m';
};