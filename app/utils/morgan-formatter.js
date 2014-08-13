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
      bytes = require('bytes'),
      clstr = require('utils/cli.js').clstr;

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
  const status = res.statusCode,
        color = status >= 500 ? 'red' :
                status >= 400 ? 'yellow' :
                status >= 300 ? 'cyan' : 'green';

  var len = parseInt(res.getHeader('Content-Length'), 10);
  len = isNaN(len) ? '' : ' - ' + bytes(len);

  return clstr('[' + moment().format('HH:mm:ss.SSS') + '] ', 'grey') +
    clstr(req.method, 'grey', 'bold') +
    clstr(' ' + (req.originalUrl || req.url) + ' ', 'grey') +
    clstr(status + ' ', color) +
    clstr((new Date() - req._startTime) + 'ms' + len, 'grey');
};
