"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pad = void 0;
var pad = function pad(n) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  n += '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};
exports.pad = pad;