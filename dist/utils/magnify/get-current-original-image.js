"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentOriginalImage = void 0;
var _orientations = require("../../constants/orientations");
var _regex = require("../../constants/regex");
var getCurrentOriginalImage = function getCurrentOriginalImage(movingDirection, imagesX, imagesY, activeImageX, activeImageY) {
  var currentImage = new Image();
  var originalImagesXSrcs = imagesX.map(function (image) {
    return image.src.replace(_regex.ORGINAL_SIZE_REGEX, '').replace(_regex.AND_SYMBOL_REGEX, '?');
  });
  var originalImagesYSrcs = imagesY.map(function (image) {
    return image.src.replace(_regex.ORGINAL_SIZE_REGEX, '').replace(_regex.AND_SYMBOL_REGEX, '?');
  });
  currentImage.src = originalImagesXSrcs[activeImageX - 1];
  if (movingDirection === _orientations.ORIENTATIONS.Y) {
    currentImage.src = originalImagesYSrcs[activeImageY - 1];
  }
  return currentImage;
};
exports.getCurrentOriginalImage = getCurrentOriginalImage;