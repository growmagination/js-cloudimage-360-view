"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSizeAccordingToPixelRatio = void 0;
var getSizeAccordingToPixelRatio = function getSizeAccordingToPixelRatio(size) {
  var splittedSizes = size.toString().split('x');
  var result = [];
  [].forEach.call(splittedSizes, function (splittedSize) {
    result.push(splittedSize * Math.round(window.devicePixelRatio || 1));
  });
  return result.join('x');
};
exports.getSizeAccordingToPixelRatio = getSizeAccordingToPixelRatio;