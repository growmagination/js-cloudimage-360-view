"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSizeLimit = void 0;
var getSizeLimit = function getSizeLimit(currentSize) {
  if (currentSize <= 25) return '25';
  if (currentSize <= 50) return '50';
  return (Math.ceil(currentSize / 100) * 100).toString();
};
exports.getSizeLimit = getSizeLimit;