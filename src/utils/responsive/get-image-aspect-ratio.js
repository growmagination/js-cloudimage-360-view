"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageAspectRatio = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var getImageAspectRatio = function getImageAspectRatio(image, providedRatio) {
  try {
    var imageAspectRatio = image.width / image.height;
    if (typeof providedRatio === 'number') {
      imageAspectRatio = providedRatio;
    }
    if (providedRatio && (0, _typeof2.default)(providedRatio) === 'object') {
      var mediaQueries = Object.keys(providedRatio).sort(function (a, b) {
        return a - b;
      });
      var activeMedia = mediaQueries.find(function (mediaQuery) {
        return window.innerWidth <= parseInt(mediaQuery, 10);
      });
      if (activeMedia) {
        imageAspectRatio = providedRatio[activeMedia];
      }
    }
    return imageAspectRatio;
  } catch (_unused) {
    return 1;
  }
};
exports.getImageAspectRatio = getImageAspectRatio;