"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preloadOriginalImages = void 0;
var _prepareImagesFromFolder = require("./images-from-folder/prepare-images-from-folder");
var _prepareImagesFromList = require("./images-from-list/prepare-images-from-list");
var _loadOriginalImages = require("./load-original-images");
/* eslint-disable no-console */

var preloadOriginalImages = function preloadOriginalImages(srcConfig, imagesSrc, cb) {
  var _ref = srcConfig || {},
    imageList = _ref.imageList;
  var imagesSrcs = [];
  if (imageList) {
    try {
      var images = JSON.parse(imageList);
      imagesSrcs = (0, _prepareImagesFromList.prepareImagesFromList)(images, srcConfig, true);
    } catch (error) {
      console.error("Wrong format in image-list attribute: ".concat(error.message));
    }
  } else {
    imagesSrcs = (0, _prepareImagesFromFolder.prepareImagesFromFolder)(imagesSrc, srcConfig, true);
  }
  (0, _loadOriginalImages.loadOriginalImages)(imagesSrcs, cb);
};
exports.preloadOriginalImages = preloadOriginalImages;