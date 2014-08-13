/**
  cli.js
  canvassmate-geocodingservice

  created by matux (matias.pequeno@gmail.com) on 2014-08-12
  copyright (c) 2014 Canvassmate, Ltd. all rights reserved.

  CLI utilities
  @module app
  @submodule utils
 */
'use strict';

/**
  CLI utilities
  @class CLI
  @static
 */

const styles = {
  'bold'  : [1,  22], 'italic' : [3,  23], 'underline' : [4,  24], 'inverse' : [7, 27], // styles
  'white' : [37, 39], 'grey'   : [90, 39], 'black'     : [90, 39], // grayscale
  'blue'  : [34, 39], 'cyan'   : [36, 39], 'green'     : [32, 39], 'magenta' : [35, 39], 'red' : [31, 39], 'yellow' : [33, 39] // colors
};

/**
  Colorizes a string using ANSI escape color codes

  @method clstr
  @param {String} str String to colorize.
  @param {String} style Style in string format, accumulative.
  @return {String} colorized string.
 */
module.exports.clstr = function(str, style) {
  function esc(i, st) {
    return '\x1B[' + styles[st||style][i] + 'm';
  }

  // Quick route out if we don't have accumulative styles
  if (arguments.length === 2) {
    return esc(0) + str + esc(1);
  }

  var colorized = '';
  for (let j = 0; j < 1; ++j) {
    for (let i = 1; i < arguments.length; ++i) 
      colorized += esc(j, arguments[i]);
    colorized += str;
  }
  return colorized;
};
