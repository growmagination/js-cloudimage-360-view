"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPopupArrow = void 0;
var createPopupArrow = function createPopupArrow() {
  var popupArrow = document.createElement('div');
  popupArrow.setAttribute('data-popper-arrow', '');
  popupArrow.setAttribute('data-cloudimage-360-hotspot', '');
  popupArrow.className = 'cloudimage-360-popup-arrow';
  return popupArrow;
};
exports.createPopupArrow = createPopupArrow;