/**
  morgan-ext.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 Silicon Illusions. all rights reserved.

  Configuration and utility
  @module config
 */
var moment = require('moment');
var bytes = require('bytes');

module.exports.format = format;

/**
  Compile `fmt` into a function.

  @param {String} fmt Format to compile
  @return {Function}
  @private
 */
function compile(fmt) {
  fmt = fmt.replace(/"/g, '\\"');
  var js = '  return "' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function(_, name, arg){
    return '"\n    + (tokens["' + name + '"](req, res, "' + arg + '") || "-") + "';
  }) + '";'
  return new Function('tokens, req, res', js);
}

/**
  Custom format function inspired on morgan's `dev`

  @param {String} tokens
  @param {Object} req
  @param {Object} res
  @return {String} log string
  @public
 */
function format(tokens, req, res) {
  var status = res.statusCode;
  var color = status >= 500 ? 31 :
              status >= 400 ? 33 :
              status >= 300 ? 36 : 32;

  var len = parseInt(res.getHeader('Content-Length'), 10);
  len = isNaN(len) ? '' : ' - ' + bytes(len);

  return '\x1b[90m' + '[' + moment().format('HH:mm:ss.SSS') + '] ' +
    '\x1b[1m\x1b[90m' + req.method + '\x1b[22m' +
    ' ' + (req.originalUrl || req.url) + ' ' +
    '\x1b[' + color + 'm' + status +
    ' \x1b[90m' +
    (new Date - req._startTime) +
    'ms' + len +
    '\x1b[0m';
}
