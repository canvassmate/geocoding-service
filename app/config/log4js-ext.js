/**
  log4js-ext.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-10
  copyright (c) 2014 Silicon Illusions. all rights reserved.

  @module app
  @submodule config
 */
'use strict';

const INVALID_FRAME = -1; // signals the need to track the base (non-Logger) frame in the stack
const stacktrace = require('stack-trace'),
      path = require('path');

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

Logger.prototype.prefixtrace = function(msg) {
  const st = stacktrace.get(); 

  if (Logger.baseStackFrame < 0) {
    while (st[++Logger.baseStackFrame].getTypeName() === 'Logger') {
      continue;
    }
  }

  const site = st[Logger.baseStackFrame],
        file = path.basename(site.getFileName()),
        line = site.getLineNumber(),
        func = site.getFunctionName();

  return '(' + file + ':' + line + (func !== null ? ':' + func : '') + ') ' + msg;
};

Logger.prototype.trace = function(msg) {
  this.logger.trace(this.prefixtrace(msg));
};

Logger.prototype.debug = function(msg) {
  this.logger.debug(this.prefixtrace(msg));
};

Logger.prototype.info = function(msg) {
  this.logger.info(this.prefixtrace(msg));
};

Logger.prototype.warn = function(msg) {
  this.logger.warn(this.prefixtrace(msg));
};

Logger.prototype.error = function(msg) {
  this.logger.error(this.prefixtrace(msg));
};

module.exports.logger = function(tag, lvl) {
  return new Logger(tag, lvl);
};
