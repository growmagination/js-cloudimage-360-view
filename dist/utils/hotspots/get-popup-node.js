"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPopupNode = void 0;
var getPopupNode = function getPopupNode(popupId) {
  var popupSelector = 'data-cloudimage-360-hotspots';
  var popupNode = document.querySelector("[".concat(popupSelector, "=").concat(popupId, "]"));
  return popupNode;
};
exports.getPopupNode = getPopupNode;