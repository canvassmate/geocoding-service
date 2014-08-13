/**
  runtime.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Index route
  @module app
  @submodule config
 */
'use strict';

const log = config.logger('runtime'),
      clstr = require('utils/cli.js').clstr;

/**
  Runtime utility
  @class runtime
 */

/**
  Adds a function to the base Object prototype that returns the actual name
  of the receiving class.

  @example
  `console.log(rt.className(obj));`

  @method className
  @param {Object} obj Object to get the name from
  @return {String} Name of the object formatted as [Object Name]
 */
const className = module.exports.className = function(obj) {
   var results = /function (.{1,})\(/.exec(obj.constructor.toString());
   var hasResults = results && results.length > 1;
   return '[object ' + (hasResults ? results[1] : 'unknown') + ']';
};

/**
  Get the stack as an array of call sites.

  @method stack
 */
module.exports.stack = function() {
  var limit = Error.stackTraceLimit;
  var obj = {};
  var prep = Error.prepareStackTrace;

  Error.prepareStackTrace = function(obj, stack) { return stack; };
  Error.stackTraceLimit = Math.max(10, limit);

  // capture the stack
  Error.captureStackTrace(obj);

  // slice this function off the top
  var stack = obj.stack.slice(1);

  Error.prepareStackTrace = prep;
  Error.stackTraceLimit = limit;

  return stack;
};

/**
  Prints all keys (properties) and values of a given Object

  @method logP
 */
module.exports.logP = function(obj, tag, logF) {
  logF = typeof logf === 'undefined' ? log.debug.bind(log) : logF;
  tag = typeof tag !== 'undefined' ? ' ' + tag + ' ' : ' ';

  var logmsg = className(obj) + tag + clstr('{\n', 'white');
  for (let key in obj)
    if (obj.hasOwnProperty(key))
      logmsg += clstr('\t' + key + ': ', 'white') + clstr('\'' + obj[key] + '\'\n', 'grey');
  logmsg += clstr('}', 'white');

  logF(logmsg, 1);
};
