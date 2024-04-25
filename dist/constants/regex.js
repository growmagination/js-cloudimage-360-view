"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ORGINAL_SIZE_REGEX = exports.AND_SYMBOL_REGEX = void 0;
var ORGINAL_SIZE_REGEX = /width=\d+|w=\d+|h=\d+|&width=\d+|&w=\d+|&h=\d+|func=\w+|\?$/g;
exports.ORGINAL_SIZE_REGEX = ORGINAL_SIZE_REGEX;
var AND_SYMBOL_REGEX = /\?&/g;
exports.AND_SYMBOL_REGEX = AND_SYMBOL_REGEX;