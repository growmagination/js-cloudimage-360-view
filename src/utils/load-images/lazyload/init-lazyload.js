"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLazyload = void 0;
var _prepareFirstImageFromFolder = require("./prepare-first-image/prepare-first-image-from-folder");
var _prepareFirstImageFromList = require("./prepare-first-image/prepare-first-image-from-list");
var initLazyload = function initLazyload(imagesSrc, srcConfig, cb) {
  var _ref = srcConfig || {},
    imageList = _ref.imageList,
    lazySelector = _ref.lazySelector,
    innerBox = _ref.innerBox;
  var firstImageSrc;
  if (imageList) {
    try {
      var images = JSON.parse(imageList);
      firstImageSrc = (0, _prepareFirstImageFromList.prepareFirstImageFromList)(images, srcConfig);
    } catch (error) {
      console.error("Wrong format in image-list attribute: ".concat(error.message));
    }
  } else {
    firstImageSrc = (0, _prepareFirstImageFromFolder.prepareFirstImageFromFolder)(imagesSrc, srcConfig);
  }
  var image = new Image();
  image.setAttribute('data-src', firstImageSrc);
  image.style.position = 'absolute';
  image.style.top = 0;
  image.style.left = 0;
  image.style.width = '100%';
  image.style.maxWidth = '100%';
  image.style.maxHeight = '100%';
  if (lazySelector) image.className = lazySelector;
  innerBox.appendChild(image);
  if (cb) {
    image.onload = function () {
      return cb(image);
    };
  }
};
exports.initLazyload = initLazyload;