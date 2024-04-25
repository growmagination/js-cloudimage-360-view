"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResponsiveWidthOfContainer = void 0;
var _getSizeLimit = require("./get-size-limit");
var getResponsiveWidthOfContainer = function getResponsiveWidthOfContainer(width) {
  return (0, _getSizeLimit.getSizeLimit)(width);
};
exports.getResponsiveWidthOfContainer = getResponsiveWidthOfContainer;