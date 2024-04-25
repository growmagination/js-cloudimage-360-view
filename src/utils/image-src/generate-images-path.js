"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateImagesPath = void 0;
var _falsyValues = require("../../constants/falsy-values");
var _getResponsiveWidthOfContainer = require("../responsive/get-responsive-width-of-container");
var _getSizeAccordingToPixelRatio = require("../responsive/get-size-according-to-pixel-ratio");
var generateImagesPath = function generateImagesPath(srcConfig, loadOriginalImages) {
  var container = srcConfig.container,
    folder = srcConfig.folder,
    apiVersion = srcConfig.apiVersion,
    _srcConfig$filename = srcConfig.filename,
    filename = _srcConfig$filename === void 0 ? '' : _srcConfig$filename,
    ciParams = srcConfig.ciParams;
  var _ref = ciParams || {},
    ciToken = _ref.ciToken,
    ciFilters = _ref.ciFilters,
    ciTransformation = _ref.ciTransformation;
  var src = "".concat(folder).concat(filename);
  if (ciToken) {
    var imageOffsetWidth = container.offsetWidth;
    var version = !(_falsyValues.FALSY_VALUES.indexOf(apiVersion) !== -1) ? apiVersion : null;
    var finalApiVersion = version ? "".concat(version, "/") : '';
    var ciSizeNext = (0, _getSizeAccordingToPixelRatio.getSizeAccordingToPixelRatio)((0, _getResponsiveWidthOfContainer.getResponsiveWidthOfContainer)(imageOffsetWidth));
    var isCloudImageUrl = new URL(src).origin.indexOf('cloudimg') !== -1;
    var cdn = isCloudImageUrl ? src : "https://".concat(ciToken, ".cloudimg.io/").concat(finalApiVersion).concat(src);
    src = "".concat(cdn, "?").concat(ciTransformation || "".concat(!loadOriginalImages ? "width=".concat(ciSizeNext) : '', " ")).concat(ciFilters ? "&f=".concat(ciFilters) : '');
  }
  return src;
};
exports.generateImagesPath = generateImagesPath;