"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preloadImages = void 0;
var _loadImagesRelativeToContainerSize = require("./load-images-relative-to-container-size");
var _prepareImagesFromFolder = require("./images-from-folder/prepare-images-from-folder");
var _prepareImagesFromList = require("./images-from-list/prepare-images-from-list");
/* eslint-disable no-console */

var preloadImages = function preloadImages(srcConfig, imagesSrc, cb) {
  var _ref = srcConfig || {},
    imageList = _ref.imageList;
  var imagesSrcs = [];
  if (imageList) {
    try {
      var images = JSON.parse(imageList);
      imagesSrcs = (0, _prepareImagesFromList.prepareImagesFromList)(images, srcConfig);
    } catch (error) {
      console.error("Wrong format in image-list attribute: ".concat(error.message));
    }
  } else {
    imagesSrcs = (0, _prepareImagesFromFolder.prepareImagesFromFolder)(imagesSrc, srcConfig);
  }
  (0, _loadImagesRelativeToContainerSize.loadImagesRelativeToContainerSize)(imagesSrcs, cb);
};
exports.preloadImages = preloadImages;