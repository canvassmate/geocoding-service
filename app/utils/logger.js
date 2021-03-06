/**
  logger.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-10
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  Logging utility
  @module app
  @submodule utils
 */
'use strict';

const INVALID_FRAME = -1; // signals the need to track the base (non-Logger) frame in the stack
const stacktrace = require('stack-trace'),
      path = require('path');

module.exports = function(tag, lvl) {
  return new Logger(tag, lvl);
};

/**
  A utility that wraps around log4js and extends its functionality without changing its usage.

  @class Logger
  @param {String} tag='default' An optional tag to describe this Logger
  @param {String} lvl='ALL' An optional Logging level (`TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `ALL`)
  @constructor
  @static
 */
function Logger(tag, lvl) {
  if (typeof Logger.log4js === 'undefined') {
    console.log('log4js init');
    Logger.log4js = require('log4js');
    // configuration
    let appenders = [ { type: 'console', layout: { type: 'pattern', pattern: '%[[%d{ABSOLUTE}][%.1p]%m%]' } },
                      { type: 'file', absolute: false, filename: 'logfile.log', maxLogSize: 20480, backups: 3 } ];
    Logger.log4js.configure({ appenders: appenders }, { cwd: './var/log' });
    Logger.baseStackFrame = INVALID_FRAME;
  }

  this.logger = Logger.log4js.getLogger(tag);
  this.logger.setLevel(typeof lvl === 'undefined' ? 'ALL' : lvl);
}

/**
  Prefixes the current stacktrace frame to the provided message.

  @method prefixtrace
  @param {String} msg Message to which the frame will be prefixed.
  @param {Number} frame Optional stacktrace frame
  @return {String} Original message prefixed with current stacktrace frame.
 */
Logger.prototype.prefixtrace = function(msg, frame) {
  const st = stacktrace.get();
  frame = typeof frame === 'undefined' ? 0 : frame;

  if (Logger.baseStackFrame < 0) {
    while (st[++Logger.baseStackFrame].getTypeName() === 'Logger') {
      continue;
    }
  }

  const site = st[Logger.baseStackFrame + frame],
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
Logger.prototype.trace = function(msg, frame) {
  this.logger.trace(this.prefixtrace(msg, frame));
};

/**
  Wraps around log4js' method of the same name.
  @method debug
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Logger.prototype.debug = function(msg, frame) {
  this.logger.debug(this.prefixtrace(msg, frame));
};

/**
  Wraps around log4js' method of the same name.
  @method info
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Logger.prototype.info = function(msg, frame) {
  this.logger.info(this.prefixtrace(msg, frame));
};

/**
  Wraps around log4js' method of the same name.
  @method warn
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Logger.prototype.warn = function(msg, frame) {
  this.logger.warn(this.prefixtrace(msg, frame));
};

/**
  Wraps around log4js' method of the same name.
  @method error
  @param {String} msg Log message.
  @param {Number} frame Optional stacktrace frame
 */
Logger.prototype.error = function(msg, frame) {
  this.logger.error(this.prefixtrace(msg, frame));
};
