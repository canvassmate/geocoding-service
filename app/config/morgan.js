/**
  Configuration and utility
  @module config
 */

module.exports.format = format;

/**
 Compile `fmt` into a function.

 @param {String} fmt
 @return {Function}
 @api private
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
 @api public
 */
function format(tokens, req, res) {
  var status = res.statusCode;
  var len = parseInt(res.getHeader('Content-Length'), 10);
  var color = 32;

  if (status >= 500) color = 31
  else if (status >= 400) color = 33
  else if (status >= 300) color = 36;

  len = isNaN(len) ? '' : len = ' - ' + bytes(len);

  return '\x1b[90m' + req.method
    + ' ' + (req.originalUrl || req.url) + ' '
    + '\x1b[' + color + 'm' + res.statusCode
    + ' \x1b[90m'
    + (new Date - req._startTime)
    + 'ms' + len
    + '\x1b[0m';
}
