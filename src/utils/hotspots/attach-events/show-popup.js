"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showPopup = void 0;
var showPopup = function showPopup(popup, popperInstance) {
  popup.setAttribute('data-show', '');
  popup.setAttribute('data-cloudimage-360-show', '');
  popperInstance.update();
};
exports.showPopup = showPopup;