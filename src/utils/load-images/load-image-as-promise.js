"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImageAsPromise = void 0;
var loadImageAsPromise = function loadImageAsPromise(src, cb) {
  var image = new Image();
  image.src = src;
  var onImageLoad = function onImageLoad() {
    return cb(image);
  };
  image.onload = onImageLoad;
  image.onerror = onImageLoad;
};
exports.loadImageAsPromise = loadImageAsPromise;