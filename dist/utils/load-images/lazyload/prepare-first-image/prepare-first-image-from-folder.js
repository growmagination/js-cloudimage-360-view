"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareFirstImageFromFolder = void 0;
var _pad = require("../../pad");
var prepareFirstImageFromFolder = function prepareFirstImageFromFolder(imagesSrcs, srcConfig) {
  var _ref = srcConfig || {},
    indexZeroBase = _ref.indexZeroBase;
  var nextZeroFilledIndex = (0, _pad.pad)(1, indexZeroBase);
  return imagesSrcs.replace('{index}', nextZeroFilledIndex);
};
exports.prepareFirstImageFromFolder = prepareFirstImageFromFolder;