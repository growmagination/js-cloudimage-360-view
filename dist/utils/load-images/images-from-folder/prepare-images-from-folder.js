"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareImagesFromFolder = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _regex = require("../../../constants/regex");
var _pad = require("../pad");
var prepareImagesFromFolder = function prepareImagesFromFolder(imagesSrc, srcConfig, loadOriginalImages) {
  var _ref = srcConfig || {},
    amount = _ref.amount,
    indexZeroBase = _ref.indexZeroBase;
  return (0, _toConsumableArray2.default)(new Array(amount)).map(function (_item, index) {
    var nextZeroFilledIndex = (0, _pad.pad)(index + 1, indexZeroBase);
    var imageSrc = imagesSrc.replace('{index}', nextZeroFilledIndex);
    if (loadOriginalImages) {
      var imageOriginalSrc = imageSrc.replace(_regex.ORGINAL_SIZE_REGEX, '').replace(_regex.AND_SYMBOL_REGEX, '?');
      return imageOriginalSrc;
    }
    return imageSrc;
  });
};
exports.prepareImagesFromFolder = prepareImagesFromFolder;