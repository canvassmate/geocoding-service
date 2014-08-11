/**
  log4js-ext.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-10
  copyright (c) 2014 Silicon Illusions. all rights reserved.

  @module app
  @submodule extensions
 */
'use strict';

const INVALID_FRAME = -1; // signals the need to track the base (non-Logger) frame in the stack
const stacktrace = require('stack-trace'),
      path = require('path');

module.exports.logger = function(tag, lvl) {
  return new Log4jsExt(tag, lvl);
};

/**
  A utility that wraps around log4js and extends its functionality without changing its usage.

  @class Log4js-Ext
  @param {String} tag='default' An optional tag to describe this Logger
  @param {String} lvl='ALL' An optional Logging level (`TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `ALL`)
  @constructor
  @static
 */
function Log4jsExt(tag, lvl) {
  if (typeof Log4jsExt.log4js === 'undefined') {
    console.log('log4js init');
    Log4jsExt.log4js = require('log4js');
    // configuration
    let appenders = [ { type: 'console', layout: { type: 'pattern', pattern: '%[[%d{ABSOLUTE}][%.1p]%m%]' } },
                      { type: 'file', absolute: false, filename: 'logfile.log', maxLogSize: 20480, backups: 3 } ];
    Log4jsExt.log4js.configure({ appenders: appenders }, { cwd: './var/log' });
    Log4jsExt.baseStackFrame = INVALID_FRAME;
  }

  this.logger = Log4jsExt.log4js.getLogger(tag);
  this.logger.setLevel(typeof lvl === 'undefined' ? 'ALL' : lvl);
}

/**
  Prefixes the current stacktrace frame to the provided message.

  @method prefixtrace
  @param {String} msg Message to which the frame will be prefixed.
  @param {Number} frame Optional stacktrace frame
  @return {String} Original message prefixed with current stacktrace frame.
 */
Log4jsExt.prototype.prefixtrace = function(msg, frame) {
  const st = stacktrace.get();
  frame = typeof frame === 'undefined' ? 0 : frame;

  if (Log4jsExt.baseStackFrame < 0) {
    while (st[++Log4jsExt.baseStackFrame].getTypeName() === 'Log4jsExt') {
      continue;
    }
  }

  const site = st[Log4jsExt.baseStackFrame + frame],
        file = path.basename(site.getFileName()),
        line = site.getLineNumber(),
        func = site.getMethodName();

  return '(' + file + ':' + line + (func !== null ? ':' + func : '') + ') ' + msg;
};

/**
  Wraps around log4js' method of the same name.
  @method trace
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Log4jsExt.prototype.trace = function(msg, frame) {
  this.logger.trace(this.prefixtrace(msg, frame));
};

/**
  Wraps around log4js' method of the same name.
  @method debug
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Log4jsExt.prototype.debug = function(msg, frame) {
  this.logger.debug(this.prefixtrace(msg, frame));
};

/**
  Wraps around log4js' method of the same name.
  @method info
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Log4jsExt.prototype.info = function(msg, frame) {
  this.logger.info(this.prefixtrace(msg, frame));
};

/**
  Wraps around log4js' method of the same name.
  @method warn
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Log4jsExt.prototype.warn = function(msg, frame) {
  this.logger.warn(this.prefixtrace(msg, frame));
};

/**
  Wraps around log4js' method of the same name.
  @method error
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Log4jsExt.prototype.error = function(msg, frame) {
  this.logger.error(this.prefixtrace(msg, frame));
};
