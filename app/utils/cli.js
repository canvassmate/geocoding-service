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
  @param {String} style Style in string format.
  @return {String} colorized string.
 */
module.exports.clstr = function(str, style) {
  return '\x1B[' + styles[style][0] + 'm' + str + '\x1B[' + styles[style][1] + 'm';
};
