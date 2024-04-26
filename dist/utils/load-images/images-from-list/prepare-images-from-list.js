"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareImagesFromList = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _generateImagesPath = require("../../image-src/generate-images-path");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var prepareImagesFromList = function prepareImagesFromList(images, srcConfig, loadOriginalImages) {
  var folder = srcConfig.folder;
  return images.map(function (src) {
    var nextSrcConfig = _objectSpread({}, srcConfig);
    nextSrcConfig.folder = /(http(s?)):\/\//gi.test(src) ? '' : folder;
    nextSrcConfig.filename = src;
    return (0, _generateImagesPath.generateImagesPath)(nextSrcConfig, loadOriginalImages);
  });
};
exports.prepareImagesFromList = prepareImagesFromList;