"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImagesRelativeToContainerSize = void 0;
var _loadImageAsPromise = require("./load-image-as-promise");
var loadImagesRelativeToContainerSize = function loadImagesRelativeToContainerSize(imagesSrcs, cb) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var imageSrc = imagesSrcs[index];
  if (index > imagesSrcs.length - 1) return;
  var imageLoadCallback = function imageLoadCallback(image) {
    var _index = index + 1;
    cb(image, index);
    loadImagesRelativeToContainerSize(imagesSrcs, cb, _index);
  };
  (0, _loadImageAsPromise.loadImageAsPromise)(imageSrc, imageLoadCallback);
};
exports.loadImagesRelativeToContainerSize = loadImagesRelativeToContainerSize;