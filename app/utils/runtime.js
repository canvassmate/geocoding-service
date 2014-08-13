/**
  runtime.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-04
  copyright (c) 2014 Silicon Illusions. all rights reserved.

  Index route
  @module app
  @submodule config
 */
'use strict';

const log = config.logger('runtime');

/**
  Runtime utility

  @class runtime
 */

module.exports.getClassName = getClassName;

/**
  Adds a function to the base Object prototype that returns the actual name
  of the receiving class.

  @example
  `console.log(runtime.getClassName(obj));`

  @method getClassName
  @param {Object} obj Object to get the name from
  @return {String} Name of the object formatted as [Object Name]
 */
function getClassName(obj) {
   var results = /function (.{1,})\(/.exec(obj.constructor.toString());
   var hasResults = results && results.length > 1;
   return '[object ' + (hasResults ? results[1] : 'unknown') + ']';
}

/**
  Get the stack as an array of call sites.

  @method getStack
 */
module.exports.getStack = function() {
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

  @method getStack
 */
module.exports.logP = function(obj, tag, logF) {
  logF = typeof logf === 'undefined' ? log.debug.bind(log) : logF;
  tag = typeof tag !== 'undefined' ? ' ' + tag + ' ' : ' ';

  var logmsg = getClassName(obj) + tag + '\x1B[37m{\n';
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      logmsg += '\t\x1B[37m' + key + ': \x1b[90m\'' + obj[key] + '\'\x1B[39m\n';
    }
  }

  logF(logmsg + '}', 1);
};

/**
  Checks if func is defined
  @method isdef
  @param {Function} func
  @return {Boolean} true if is defined
 */
module.exports.isdef = function(f) {
  return typeof f !== 'undefined';
};

/**
  Checks if func is undefined
  @method isndef
  @param {Function} func
  @return {Boolean} true if is undefined
 */
module.exports.isndef = function(f) {
  return typeof f === 'undefined';
};
